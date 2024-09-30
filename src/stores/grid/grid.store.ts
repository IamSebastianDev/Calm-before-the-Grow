/** @format */

import { Vector2 } from 'three';
import { create } from 'zustand';
import { sortByYIndex } from '../../functions/sort-by-y-index';
import { SelectorTile, Tile } from './grid.tiles';

export type GridStore = {
    tiles: Map<string, Tile>;
    offset: Vector2;
};

export const useGridStore = create<GridStore>()(() => ({
    tiles: new Map([[`0:0`, new SelectorTile(new Vector2(0, 0))]]),
    offset: new Vector2(0, 0),
}));

export const useOrderedGrid = () => {
    const grid = useGridStore();
    return { ...grid, tiles: [...grid.tiles.values()].sort(sortByYIndex) };
};
