/** @format */

import { Vector2 } from 'three';
import { Tile, useGridStore } from './grid.store';

/** @format */
export const addTileToGrid = (tile: Tile) => {
    useGridStore.setState((state) => {
        const { x, y } = tile.position;
        // Add the new tile to the state, before reassigning
        // the map to the state
        state.tiles.set(`${x}:${y}`, tile);
        // We also need to set all new surrounding tiles,
        // that are not yet occupied, and should show a
        // new selector tile, to add a new tile to

        // Return the updated state
        return { tiles: new Map(state.tiles) };
    });
};

export const moveGridOffset = (x: number, y: number) => {
    useGridStore.setState((state) => {
        return { offset: new Vector2(state.offset.x + x, state.offset.y + y) };
    });
};

export const moveGridOffsetLeft = (amount: number = 0.25) => moveGridOffset(-amount, 0);
export const moveGridOffsetRight = (amount: number = 0.25) => moveGridOffset(amount, 0);
export const moveGridOffsetUp = (amount: number = 0.25) => moveGridOffset(0, amount);
export const moveGridOffsetDown = (amount: number = 0.25) => moveGridOffset(0, -amount);
