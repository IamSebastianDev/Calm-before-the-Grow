/** @format */

import { Vector2 } from 'three';
import { create } from 'zustand';
import { AssetType } from '../../providers/asset.provider';
import { sortTilesByZIndex } from './grid.utils';

export type TileType = AssetType;
export type Tile = {
    position: Vector2;
    type: TileType;
};

export type GridStore = {
    tiles: Map<string, Tile>;
    offset: Vector2;
};

export const useGridStore = create<GridStore>()(() => ({
    tiles: new Map([[`0:0`, { position: new Vector2(0, 0), type: 'selector' }]]),
    offset: new Vector2(0, 0),
}));

export const useOrderedGrid = () => {
    const grid = useGridStore();
    return { ...grid, tiles: [...grid.tiles.values()].sort(sortTilesByZIndex) };
};
