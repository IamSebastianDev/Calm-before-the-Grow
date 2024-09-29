/** @format */

import { AbstractTile } from '../grid/grid.tiles';
import { useStackStore } from './stack.store';

export const takeTileFromStack = () => {
    useStackStore.setState((state) => {
        return { tiles: [...state.tiles.slice(0, -1)] };
    });
};

export const addTilesToStack = (...tiles: AbstractTile[]) => {
    useStackStore.setState((state) => {
        return { tiles: [...tiles, ...state.tiles] };
    });
};
