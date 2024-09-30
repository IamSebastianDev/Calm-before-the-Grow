/** @format */

import { Vector2 } from 'three';
import { useGridStore } from './grid.store';
import { AbstractTile, Tile } from './grid.tiles';
import { getNeighbors, upgradeActions } from './grid.utils';

export const upgradeTile = (tile: Tile, type: AbstractTile) => {
    useGridStore.setState((state) => {
        // To upgrade a tile, we first get the tile upgrade actions,
        // then execute the actions, and letting each action modify
        // the state before merging the completed state back into the
        // store. Each action receives the state as well as the triggering
        // tile
        const actions = upgradeActions.getTileUpgradeAction(tile.type, type);
        const updated = actions.reduce((cur, acc) => acc(cur, tile, type), state);

        // Apply the effect actions
        const neighbors = getNeighbors(tile, state.tiles);
        const effects = upgradeActions.getTileEffectActions(neighbors);
        const effected = effects.reduce((cur, acc) => acc(cur, tile, type, neighbors), updated);

        // Return the processed state
        return effected;
    });
};

// Actions that move the grid somewhere
export const moveGridOffset = (x: number, y: number) => {
    useGridStore.setState((state) => {
        return { offset: new Vector2(state.offset.x + x, state.offset.y + y) };
    });
};

export const moveGridOffsetLeft = (amount: number = 0.25) => moveGridOffset(amount, 0);
export const moveGridOffsetRight = (amount: number = 0.25) => moveGridOffset(-amount, 0);
export const moveGridOffsetUp = (amount: number = 0.25) => moveGridOffset(0, -amount);
export const moveGridOffsetDown = (amount: number = 0.25) => moveGridOffset(0, amount);

export const resetGridOffset = () => {
    useGridStore.setState(() => ({ offset: new Vector2(0, 0) }));
};
