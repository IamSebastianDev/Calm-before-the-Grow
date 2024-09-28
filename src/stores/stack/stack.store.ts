/** @format */

import { create } from 'zustand';
import { TileType } from '../grid/grid.tiles';

export type Stack = {
    tiles: TileType[];
};

export const useStackStore = create<Stack>()(() => ({ tiles: ['dirt_1'] }));
