/** @format */

import { Vector2 } from 'three';
import { Tile, TileType, useGridStore } from './grid.store';
import { upgradeActions } from './grid.utils';

export const upgradeTile = (tile: Tile, type: TileType) => {
    useGridStore.setState((state) => {
        // To upgrade a tile, we first get the tile upgrade actions,
        // then execute the actions, and letting each action modify
        // the state before merging the completed state back into the
        // store. Each action receives the state as well as the triggering
        // tile
        const actions = upgradeActions.getTileUpgradeAction(tile.type, type);
        return actions.reduce((cur, acc) => acc(cur, tile, type), state);
    });
};

// Actions that move the grid somewhere
export const moveGridOffset = (x: number, y: number) => {
    useGridStore.setState((state) => {
        return { offset: new Vector2(state.offset.x + x, state.offset.y + y) };
    });
};

export const moveGridOffsetLeft = (amount: number = 0.25) => moveGridOffset(-amount, 0);
export const moveGridOffsetRight = (amount: number = 0.25) => moveGridOffset(amount, 0);
export const moveGridOffsetUp = (amount: number = 0.25) => moveGridOffset(0, amount);
export const moveGridOffsetDown = (amount: number = 0.25) => moveGridOffset(0, -amount);
