/** @format */

import { Vector2 } from 'three';
import { AssetType } from '../../providers/asset.provider';

export type TileType = AssetType;

export type AnimatedTile = Tile & {
    isAnimated: boolean;
    columns: number;
    rows: number;
    frames: number;
};

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

export class SelectorTile extends Tile implements AnimatedTile {
    isAnimated = true;
    columns = 5;
    rows = 1;
    frames = 0.5;

    constructor(position: Vector2) {
        super(position, 'selector');
    }
}
