/** @format */

import { Vector2 } from 'three';
import { addToScore } from '../game-state/game-state.actions';
import { addTilesToStack } from '../stack/stack.actions';
import { GridStore } from './grid.store';
import { AbstractTile, SelectorTile, Tile } from './grid.tiles';

export const calculateOffsetAmount = (keys: string[]) => (keys.includes('Shift') ? 0.6 : 0.25);

export const sortTilesByZIndex = (a: Tile, b: Tile) => (a.position.y < b.position.y ? 1 : -1);

// Tile Upgrade Actions. By default, we simply replace the tile, but some
// tiles have special effects when upgrading (switching types, do something else)
// Effects are done as standalone functions, enabling us to set
// store and state as we want.

export type UpgradeActionStateMachineEntry = {
    from: Array<AbstractTile>;
    to: Array<AbstractTile>;
    action: (state: GridStore, tile: Tile, target: AbstractTile) => GridStore;
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
    action: (state: GridStore, tile: Tile, target: AbstractTile) => GridStore;
};

class UpgradeActions {
    // The primary state machine accessor, returns all matching actions
    // defined in the state machine
    getTileUpgradeAction(current: AbstractTile, next: AbstractTile) {
        const stateMachineEntries = this.actions.filter(({ from, to }) => {
            return from.includes(current) && to.includes(next);
        });

        // If there are no state machine entries to be found, simply
        // replace the current tile with the new one, swapping them
        if (stateMachineEntries.length === 0) {
            return [this.swapTiles];
        }

        return stateMachineEntries.map(({ action }) => action);
    }

    private actions: Array<UpgradeActionStateMachineEntry> = [
        {
            from: ['selector'],
            to: ['dirt', 'grass', 'soil', 'rocks'],
            action: (state, tile, target) => {
                this.increaseScore(2);
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['selector'],
            to: ['shallow_water'],
            action: (state, tile, target) => {
                this.increaseScore(5);
                this.grantNewTiles('shallow_water', 'dirt');
                return this.swapTiles(state, tile, target);
            },
        },
        // Grass
        {
            from: ['grass'],
            to: ['soil'],
            action: (state, tile, target) => {
                this.increaseScore(2);
                this.grantNewTiles('dirt', 'dirt');
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['grass'],
            to: ['rocks'],
            action: (state, tile, target) => {
                this.increaseScore(2);
                this.grantNewTiles('soil', 'soil');
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['grass'],
            to: ['shallow_water'],
            action: (state, tile, target) => {
                this.increaseScore(4);
                this.grantNewTiles('rocks');
                return this.swapTiles(state, tile, target);
            },
        },
        // Soil
        {
            from: ['soil'],
            to: ['grass'],
            action: (state, tile, target) => {
                this.increaseScore(4);
                this.grantNewTiles('grass');
                return this.swapTiles(state, tile, target);
            },
        },

        {
            from: ['soil'],
            to: ['dirt'],
            action: (state, tile, target) => {
                this.increaseScore(-2);
                this.grantNewTiles('shallow_water');
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['soil'],
            to: ['shallow_water'],
            action: (state, tile) => {
                this.increaseScore(10);
                this.grantNewTiles('grass');
                return this.swapTiles(state, tile, 'grass');
            },
        },
        // Dirt
        {
            from: ['dirt'],
            to: ['soil'],
            action: (state, tile, target) => {
                this.increaseScore(-2);
                this.grantNewTiles('shallow_water');
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['dirt'],
            to: ['grass'],
            action: (state, tile, target) => {
                this.increaseScore(4);
                this.grantNewTiles('soil', 'soil', 'dirt', 'dirt');
                return this.swapTiles(state, tile, target);
            },
        },
        {
            from: ['dirt'],
            to: ['shallow_water'],
            action: (state, tile) => {
                this.increaseScore(10);
                this.grantNewTiles('dirt');
                return this.swapTiles(state, tile, 'soil');
            },
        },

        // This action is executed whenever a selector tile is upgraded, and new
        // selector tiles should be generated
        {
            from: ['selector'],
            to: ['dirt', 'grass', 'shallow_water', 'soil', 'rocks'],
            action: (state, tile) => {
                return this.addNewSelectorTiles(state, tile);
            },
        },
    ];

    private getNeighbors(tile: Tile, tiles: Map<string, Tile>) {
        return {
            vertical: [
                tiles.get(`${tile.position.x + 1}:${tile.position.y + 0.5}`),
                tiles.get(this.getTileId(tile)),
                tiles.get(`${tile.position.x - 1}:${tile.position.y - 0.5}`),
            ].map((tile) => tile?.type ?? null),
            horizontal: [
                tiles.get(`${tile.position.x - 1}:${tile.position.y + 0.5}`),
                tiles.get(this.getTileId(tile)),
                tiles.get(`${tile.position.x + 1}:${tile.position.y - 0.5}`),
            ].map((tile) => tile?.type ?? null),
            circle: [
                tiles.get(`${tile.position.x + 1}:${tile.position.y + 0.5}`),
                tiles.get(`${tile.position.x - 1}:${tile.position.y + 0.5}`),
                tiles.get(this.getTileId(tile)),
                tiles.get(`${tile.position.x + 1}:${tile.position.y - 0.5}`),
                tiles.get(`${tile.position.x - 1}:${tile.position.y - 0.5}`),
            ].map((tile) => tile?.type ?? null),
            patch: [
                // top
                tiles.get(`${tile.position.x}:${tile.position.y + 1}`),
                tiles.get(`${tile.position.x + 1}:${tile.position.y + 0.5}`),
                tiles.get(`${tile.position.x + 2}:${tile.position.y}`),
                // middle
                tiles.get(`${tile.position.x - 1}:${tile.position.y + 0.5}`),
                tiles.get(this.getTileId(tile)),
                tiles.get(`${tile.position.x + 1}:${tile.position.y - 0.5}`),
                // bottom
                tiles.get(`${tile.position.x - 2}:${tile.position.y}`),
                tiles.get(`${tile.position.x - 1}:${tile.position.y - 0.5}`),
                tiles.get(`${tile.position.x}:${tile.position.y - 1}`),
            ].map((tile) => tile?.type ?? null),
        };
    }

    private matchPattern(
        pattern: EffectActionStateMachineEntry['pattern'],
        neighbors: ReturnType<typeof this.getNeighbors>,
    ) {
        // Depending on the length of the pattern, we can choose how to look up the different tiles
        switch (pattern.length) {
            // Row Pattern
            // This pattern checks the horizontal and vertical nearest neighbors for matches
            case 3:
                return (
                    pattern.every((value, idx) => value === neighbors.vertical[idx]) ||
                    pattern.every((value, idx) => value === neighbors.horizontal[idx])
                );

            // Circle Pattern
            case 5:
                return pattern.every((value, idx) => value === neighbors.circle[idx]);
            // Patch Pattern
            case 9:
                return pattern.every((value, idx) => value === neighbors.patch[idx]);
        }
    }

    getTileEffectActions(tile: Tile, state: GridStore): EffectActionStateMachineEntry['action'][] {
        const tiles = state.tiles;
        const neighbors = this.getNeighbors(tile, tiles);
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
            action: (state, tile) => {
                this.increaseScore(40);
                this.swapTiles(state, tile, 'grass');
                return state;
            },
        },
    ];

    private swapTiles = (state: GridStore, tile: Tile, next: AbstractTile) => {
        const tiles = new Map(state.tiles.set(this.getTileId(tile), new Tile(tile.position, next)));
        return { ...state, tiles };
    };

    private grantNewTiles(...tiles: AbstractTile[]) {
        addTilesToStack(...tiles);
    }

    private increaseScore(amount = 1) {
        addToScore(amount);
    }

    private getTileId(tile: Tile) {
        return `${tile.position.x}:${tile.position.y}`;
    }

    private makeTileId(tile: Tile) {
        return `${tile.position.x}:${tile.position.y}`;
    }

    private lookup(state: GridStore, tile: Tile) {
        return state.tiles.has(this.getTileId(tile));
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

        !this.lookup(state, up) && state.tiles.set(this.makeTileId(up), up);
        !this.lookup(state, down) && state.tiles.set(this.makeTileId(down), down);
        !this.lookup(state, left) && state.tiles.set(this.makeTileId(left), left);
        !this.lookup(state, right) && state.tiles.set(this.makeTileId(right), right);

        // Return the updated state
        return { ...state, tiles: new Map(state.tiles) };
    }
}

export const upgradeActions = new UpgradeActions();
