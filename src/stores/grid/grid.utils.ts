/** @format */

import { Vector2 } from 'three';
import { GridStore } from './grid.store';
import { SelectorTile, Tile, TileType } from './grid.tiles';

export const calculateOffsetAmount = (keys: string[]) => (keys.includes('Shift') ? 0.6 : 0.25);

export const sortTilesByZIndex = (a: Tile, b: Tile) => (a.position.y < b.position.y ? 1 : -1);

// Tile Upgrade Actions. By default, we simply replace the tile, but some
// tiles have special effects when upgrading (switching types, do something else)
// Effects are done as standalone functions, enabling us to set
// store and state as we want.

export type UpgradeActionStateMachineEntry = {
    from: Array<TileType>;
    to: Array<TileType>;
    action: (state: GridStore, tile: Tile, target: TileType) => GridStore;
};

class UpgradeActions {
    // The primary state machine accessor, returns all matching actions
    // defined in the state machine
    getTileUpgradeAction(current: TileType, next: TileType) {
        const stateMachineEntries = this.actions.filter(({ from, to }) => {
            return from.includes(current) && to.includes(next);
        });

        return stateMachineEntries.map(({ action }) => action);
    }

    private actions: Array<UpgradeActionStateMachineEntry> = [
        {
            from: ['selector'],
            to: ['dirt_1'],
            action: (state, tile, target) => {
                state.tiles.set(this.getTileId(tile), new Tile(new Vector2(tile.position.x, tile.position.y), target));
                const newState = this.addNewSelectorTiles(state, tile);
                return { ...newState };
            },
        },
    ];

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
