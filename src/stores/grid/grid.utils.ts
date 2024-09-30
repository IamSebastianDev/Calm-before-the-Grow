/** @format */

import { Vector2 } from 'three';
import { useGameState } from '../game-state/game-state.store';
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

    private swapTiles = (state: GridStore, tile: Tile, next: AbstractTile) => {
        const tiles = new Map(state.tiles.set(this.getTileId(tile), new Tile(tile.position, next)));
        return { ...state, tiles };
    };

    private grantNewTiles(...tiles: AbstractTile[]) {
        addTilesToStack(...tiles);
    }

    private increaseScore(amount = 1) {
        useGameState.setState((state) => ({ score: state.score + amount }));
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
