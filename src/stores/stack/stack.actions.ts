/** @format */

import { useStackStore } from './stack.store';

export const takeTileFromStack = () => {
    useStackStore.setState((state) => {
        return { tiles: [...state.tiles.slice(0, -1)] };
    });
};
