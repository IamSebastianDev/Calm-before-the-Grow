/** @format */

import { Vector2 } from 'three';
import { create } from 'zustand';
import { AssetType } from '../../providers/asset.provider';
import { sortTilesByZIndex } from './grid.utils';

export type TileType = AssetType;

export class Tile {
    public id = crypto.randomUUID();

    constructor(
        protected _position: Vector2,
        public type: TileType,
    ) {}

    get position() {
        return this._position;
    }

    static isAnimatedTile(tile: Tile): tile is AnimatedTile {
        return 'isAnimated' in tile && tile.isAnimated === true;
    }
}

export type AnimatedTile = Tile & {
    isAnimated: boolean;
    columns: number;
    rows: number;
    frames: number;
};

export class SelectorTile extends Tile implements AnimatedTile {
    isAnimated = true;
    columns = 5;
    rows = 1;
    frames = 0.5;

    constructor(position: Vector2) {
        super(position, 'selector');
    }
}

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
    return { ...grid, tiles: [...grid.tiles.values()].sort(sortTilesByZIndex) };
};
