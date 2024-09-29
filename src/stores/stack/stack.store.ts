/** @format */

import { create } from 'zustand';
import { AbstractTile } from '../grid/grid.tiles';

export type Stack = {
    tiles: AbstractTile[];
};

export const useStackStore = create<Stack>()(() => ({ tiles: [] }));
