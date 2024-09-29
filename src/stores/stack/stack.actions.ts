/** @format */

import { TileType } from '../grid/grid.tiles';
import { useStackStore } from './stack.store';

export const takeTileFromStack = () => {
    useStackStore.setState((state) => {
        return { tiles: [...state.tiles.slice(0, -1)] };
    });
};

export const addTilesToStack = (...tiles: TileType[]) => {
    useStackStore.setState((state) => {
        return { tiles: [...tiles, ...state.tiles] };
    });
};
