/** @format */

import { Vector2 } from 'three';
import { random } from '../../functions/random';
import { addToScore } from '../game-state/game-state.actions';
import { addProp, getRandomFlower, getRandomLog, getRandomRock } from '../props/props.actions';
import { PropType, usePropsStore } from '../props/props.store';
import { addTilesToStack } from '../stack/stack.actions';
import { GridStore } from './grid.store';
import { AbstractTile, SelectorTile, Tile } from './grid.tiles';

// Tile Upgrade Actions. By default, we simply replace the tile, but some
// tiles have special effects when upgrading (switching types, do something else)
// Effects are done as standalone functions, enabling us to set
// store and state as we want.

export type UpgradeActionStateMachineEntry = {
    from: Array<AbstractTile>;
    to: Array<AbstractTile>;
    action: (state: GridStore, tile: Tile, target: AbstractTile) => GridStore;
    hint?: string;
    score?: number;
};

type RowPattern = [AbstractTile, AbstractTile, AbstractTile];
type CirclePattern = [AbstractTile, AbstractTile, AbstractTile, AbstractTile, AbstractTile];
type PatchPattern = [
    AbstractTile,
    AbstractTile,
    AbstractTile,
    AbstractTile,
    AbstractTile,
    AbstractTile,
    AbstractTile,
    AbstractTile,
    AbstractTile,
];

export type EffectActionStateMachineEntry = {
    name?: string;
    pattern: RowPattern | CirclePattern | PatchPattern;
    action: (
        state: GridStore,
        tile: Tile,
        target: AbstractTile,
        neighbors: ReturnType<typeof getNeighbors>,
    ) => GridStore;
};

export const getNeighbors = (tile: Tile, tiles: Map<string, Tile>) => {
    return {
        vertical: [
            tiles.get(`${tile.position.x + 1}:${tile.position.y + 0.5}`),
            tiles.get(tile.serialId),
            tiles.get(`${tile.position.x - 1}:${tile.position.y - 0.5}`),
        ],
        horizontal: [
            tiles.get(`${tile.position.x - 1}:${tile.position.y + 0.5}`),
            tiles.get(tile.serialId),
            tiles.get(`${tile.position.x + 1}:${tile.position.y - 0.5}`),
        ],
        circle: [
            tiles.get(`${tile.position.x + 1}:${tile.position.y + 0.5}`),
            tiles.get(`${tile.position.x - 1}:${tile.position.y + 0.5}`),
            tiles.get(tile.serialId),
            tiles.get(`${tile.position.x + 1}:${tile.position.y - 0.5}`),
            tiles.get(`${tile.position.x - 1}:${tile.position.y - 0.5}`),
        ],
        patch: [
            // top
            tiles.get(`${tile.position.x}:${tile.position.y + 1}`),
            tiles.get(`${tile.position.x + 1}:${tile.position.y + 0.5}`),
            tiles.get(`${tile.position.x + 2}:${tile.position.y}`),
            // middle
            tiles.get(`${tile.position.x - 1}:${tile.position.y + 0.5}`),
            tiles.get(tile.serialId),
            tiles.get(`${tile.position.x + 1}:${tile.position.y - 0.5}`),
            // bottom
            tiles.get(`${tile.position.x - 2}:${tile.position.y}`),
            tiles.get(`${tile.position.x - 1}:${tile.position.y - 0.5}`),
            tiles.get(`${tile.position.x}:${tile.position.y - 1}`),
        ],
    };
};

class UpgradeActions {
    // The primary state machine accessor, returns all matching actions
    // defined in the state machine
    getTileUpgradeAction(current: AbstractTile, next?: AbstractTile): UpgradeActionStateMachineEntry[] {
        if (!next) {
            return [];
        }

        const stateMachineEntries = this.actions.filter(({ from, to }) => {
            return from.includes(current) && to.includes(next);
        });

        // If there are no state machine entries to be found, simply
        // replace the current tile with the new one, swapping them
        if (stateMachineEntries.length === 0) {
            return [
                {
                    from: [],
                    to: [],
                    action: (state: GridStore, tile: Tile, target: AbstractTile) => {
                        this.destroyPropsOnTile(tile);
                        return this.swapTiles(state, tile, target);
                    },
                },
            ];
        }

        return stateMachineEntries;
    }

    private actions: Array<UpgradeActionStateMachineEntry> = [
        {
            from: ['selector'],
            to: ['dirt', 'grass', 'soil', 'rocks'],
            action: (state, tile, target) => {
                this.increaseScore(2);
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['selector'],
            to: ['shallow_water'],
            action: (state, tile, target) => {
                this.destroyPropsOnTile(tile);
                this.increaseScore(5);
                this.grantNewTiles('shallow_water', 'dirt');
                return this.swapTiles(state, tile, target);
            },
            score: 7,
            hint: '+5, +2 ◇',
        },
        // Grass
        {
            from: ['grass'],
            to: ['soil'],
            action: (state, tile, target) => {
                this.grantNewTiles('dirt', 'dirt');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
            score: 2,
            hint: '+0, +2 ◇',
        },
        {
            from: ['grass'],
            to: ['rocks'],
            action: (state, tile, target) => {
                this.increaseScore(2);
                this.grantNewTiles('soil', 'soil');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
            score: 4,
            hint: '+2, +2 ◇',
        },
        {
            from: ['grass'],
            to: ['shallow_water'],
            action: (state, tile) => {
                this.increaseScore(4);
                this.grantNewTiles('dirt');
                this.addPropToTile(getRandomFlower(), tile);
                console.log({ state, tile, props: usePropsStore.getState() });
                return state;
            },
            score: 5,
            hint: '+4, +1 ◇',
        },
        {
            from: ['grass'],
            to: ['grass'],
            action: (state, tile) => {
                this.increaseScore(4);
                this.addPropToTile(getRandomFlower(), tile);
                return state;
            },
            score: 4,
            hint: '+4',
        },
        // Soil
        {
            from: ['soil'],
            to: ['grass'],
            action: (state, tile, target) => {
                this.increaseScore(4);
                this.grantNewTiles('grass');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
            score: 5,
            hint: '+4, +1 ◇',
        },

        {
            from: ['soil'],
            to: ['dirt'],
            action: (state, tile, target) => {
                this.increaseScore(-2);
                this.grantNewTiles('shallow_water');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
            score: -1,
            hint: '-2, +1 ◇',
        },
        {
            from: ['soil'],
            to: ['shallow_water'],
            action: (state, tile) => {
                this.increaseScore(5);
                this.grantNewTiles('grass');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, 'grass');
            },
            score: 6,
            hint: '+5, +1 ◇',
        },
        // Dirt
        {
            from: ['dirt'],
            to: ['soil'],
            action: (state, tile, target) => {
                this.increaseScore(-2);
                this.grantNewTiles('shallow_water');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
            score: 1,
            hint: '-2, +1 ◇',
        },
        {
            from: ['dirt'],
            to: ['grass'],
            action: (state, tile, target) => {
                this.increaseScore(4);
                this.grantNewTiles('soil', 'soil', 'dirt', 'dirt');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, target);
            },
            score: 8,
            hint: '+4, +4 ◇',
        },
        {
            from: ['dirt'],
            to: ['shallow_water'],
            action: (state, tile) => {
                this.increaseScore(4);
                this.grantNewTiles('dirt');
                this.destroyPropsOnTile(tile);
                return this.swapTiles(state, tile, 'soil');
            },
            score: 5,
            hint: '+4, +1 ◇',
        },
        // Rocks
        {
            from: ['rocks'],
            to: ['rocks'],
            action: (state, tile) => {
                this.increaseScore(2);
                this.grantNewTiles('dirt');
                this.addPropToTile(getRandomRock(), tile);

                return state;
            },
            score: 3,
            hint: '+2, +1 ◇',
        },
        {
            from: ['rocks'],
            to: ['shallow_water'],
            action: (state, tile, target) => {
                this.increaseScore(1);
                this.grantNewTiles('rocks', 'rocks');

                return this.swapTiles(state, tile, target);
            },
            score: 3,
            hint: '+1, +1 ◇',
        },
        // Deep water
        {
            from: ['deep_water'],
            to: ['rocks'],
            action: (state, tile) => {
                return this.swapTiles(state, tile, 'rocky_water');
            },
        },

        // This action is executed whenever a selector tile is upgraded, and new
        // selector tiles should be generated
        {
            from: ['selector'],
            to: ['dirt', 'grass', 'shallow_water', 'soil', 'rocks', 'deep_water'],
            action: (state, tile) => {
                this.destroyPropsOnTile(tile);
                return this.addNewSelectorTiles(state, tile);
            },
        },
    ];

    private destroyPropsOnTile(tile: Tile) {
        usePropsStore.setState((state) => {
            if (!state.props.has(tile.serialId)) {
                return state;
            }

            state.props.delete(tile.serialId);
            return { props: new Map(state.props) };
        });
    }

    private addPropToTile(type: PropType, tile: Tile) {
        addProp(type, tile);
    }

    private matchPattern(
        pattern: EffectActionStateMachineEntry['pattern'],
        neighbors: ReturnType<typeof getNeighbors>,
    ) {
        // Depending on the length of the pattern, we can choose how to look up the different tiles
        switch (pattern.length) {
            // Row Pattern
            // This pattern checks the horizontal and vertical nearest neighbors for matches
            case 3:
                return (
                    pattern.every((value, idx) => value === neighbors.vertical[idx]?.type) ||
                    pattern.every((value, idx) => value === neighbors.horizontal[idx]?.type)
                );

            // Circle Pattern
            case 5:
                return pattern.every((value, idx) => value === neighbors.circle[idx]?.type);
            // Patch Pattern
            case 9:
                return pattern.every((value, idx) => value === neighbors.patch[idx]?.type);
        }
    }

    getTileEffectActions(neighbors: ReturnType<typeof getNeighbors>): EffectActionStateMachineEntry['action'][] {
        const effects = this.effects.filter((effect) => this.matchPattern(effect.pattern, neighbors));
        return effects.map(({ action }) => action);
    }

    private effects: Array<EffectActionStateMachineEntry> = [
        {
            name: 'Lawn',
            pattern: ['grass', 'grass', 'grass'],
            action: (state) => {
                this.increaseScore(15);
                this.grantNewTiles('soil', 'soil', 'soil');
                return state;
            },
        },
        {
            name: 'Bountiful Soil',
            pattern: ['soil', 'soil', 'soil', 'soil', 'soil'],
            action: (state, tile) => {
                this.increaseScore(25);
                this.grantNewTiles('grass', 'grass', 'grass');
                this.swapTiles(state, tile, 'grass');
                return state;
            },
        },
        {
            name: 'Fairy Ring',
            pattern: ['soil', 'grass', 'soil', 'grass', 'shallow_water', 'grass', 'soil', 'grass', 'soil'],
            action: (state, tile, _, neighbors) => {
                this.increaseScore(40);
                neighbors.patch.filter((val) => !!val).forEach((tile) => this.addPropToTile(getRandomFlower(), tile));
                this.destroyPropsOnTile(tile);
                return state;
            },
        },
        {
            name: 'Dolmen',
            pattern: ['grass', 'grass', 'grass', 'grass', 'rocks', 'grass', 'grass', 'grass', 'grass'],
            action: (state, tile, _, neighbors) => {
                this.increaseScore(40);
                neighbors.patch.filter((val) => !!val).forEach((tile) => this.addPropToTile(getRandomFlower(), tile));
                this.addPropToTile(getRandomRock(), tile);
                return state;
            },
        },
        {
            name: 'Deep runs the river',
            pattern: ['shallow_water', 'shallow_water', 'shallow_water', 'shallow_water', 'shallow_water'],
            action: (state, tile) => {
                this.increaseScore(25);
                this.swapTiles(state, tile, 'deep_water');
                return state;
            },
        },
        {
            name: 'Perch',
            pattern: ['deep_water', 'deep_water', 'shallow_water', 'deep_water', 'deep_water'],
            action: (state, tile) => {
                this.increaseScore(50);
                this.swapTiles(state, tile, 'rocky_water');
                return state;
            },
        },
        {
            name: 'Swamp East',
            pattern: [
                'soil',
                'shallow_water',
                'soil',
                'soil',
                'shallow_water',
                'soil',
                'soil',
                'shallow_water',
                'soil',
            ],
            action: (state, __, _, neighbors) => {
                this.increaseScore(50);

                const getPlacement = () =>
                    random([
                        neighbors.patch[0],
                        neighbors.patch[2],
                        neighbors.patch[3],
                        neighbors.patch[5],
                        neighbors.patch[6],
                        neighbors.patch[8],
                    ]);

                // Add some props
                Array(3)
                    .fill(null)
                    .map(() => getPlacement())
                    .forEach(
                        (maybeTile) =>
                            maybeTile && this.addPropToTile(random([getRandomLog, getRandomFlower])(), maybeTile),
                    );

                return state;
            },
        },
        {
            name: 'Swamp North',
            pattern: [
                'soil',
                'soil',
                'soil',
                'shallow_water',
                'shallow_water',
                'shallow_water',
                'soil',
                'soil',
                'soil',
            ],
            action: (state, __, _, neighbors) => {
                this.increaseScore(50);

                const getPlacement = () =>
                    random([
                        neighbors.patch[0],
                        neighbors.patch[1],
                        neighbors.patch[2],
                        neighbors.patch[6],
                        neighbors.patch[7],
                        neighbors.patch[8],
                    ]);

                // Add some props
                Array(3)
                    .fill(null)
                    .map(() => getPlacement())
                    .forEach(
                        (maybeTile) =>
                            maybeTile && this.addPropToTile(random([getRandomLog, getRandomFlower])(), maybeTile),
                    );

                return state;
            },
        },
    ];

    private swapTiles = (state: GridStore, tile: Tile, next: AbstractTile) => {
        const tiles = new Map(state.tiles.set(tile.serialId, new Tile(tile.position, next)));
        return { ...state, tiles };
    };

    private grantNewTiles(...tiles: AbstractTile[]) {
        addTilesToStack(...tiles);
    }

    private increaseScore(amount = 1) {
        addToScore(amount);
    }

    private lookup(state: GridStore, tile: Tile) {
        return state.tiles.has(tile.serialId);
    }

    private addNewSelectorTiles(state: GridStore, tile: Tile): GridStore {
        const { x, y } = tile.position;

        // We also need to set all new surrounding tiles,
        // that are not yet occupied, and should show a
        // new selector tile, so that the player can add a
        // new tile to the grid.
        // We can start by calculating all 4 cardinal directions,
        // that the tile can have.

        const [up, down, left, right]: Tile[] = [
            // Up -> add 1 to x, 0.5 to y
            new SelectorTile(new Vector2(x + 1, y + 0.5)),
            // Down -> subtract 1 from x, 0.5 from y
            new SelectorTile(new Vector2(x - 1, y - 0.5)),
            // Left -> Subtract 1 From x, ad 0.5 from y
            new SelectorTile(new Vector2(x - 1, y + 0.5)),
            // Right -> Add 1 to x, subtract 0.5 from y
            new SelectorTile(new Vector2(x + 1, y - 0.5)),
        ];
        // We're only adding the calculated tiles if the ids are not already
        // set. As we're using the serialized position as key, this enables
        // us to quickly look up the tile

        !this.lookup(state, up) && state.tiles.set(up.serialId, up);
        !this.lookup(state, down) && state.tiles.set(down.serialId, down);
        !this.lookup(state, left) && state.tiles.set(left.serialId, left);
        !this.lookup(state, right) && state.tiles.set(right.serialId, right);

        // Return the updated state
        return { ...state, tiles: new Map(state.tiles) };
    }
}

export const upgradeActions = new UpgradeActions();
