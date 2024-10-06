/** @format */

import { Vector2 } from 'three';
import { random } from '../../functions/random';
import { AssetType } from '../../providers/asset.provider';

export const abstractTileTypes = [
    'selector',
    'dirt',
    'soil',
    'grass',
    'shallow_water',
    'deep_water',
    'rocks',
    'rocky_water',
] as const;
export type AbstractTile = (typeof abstractTileTypes)[number];

export type TileType = AssetType;

export type AnimatedTile = Tile & {
    isAnimated: boolean;
    columns: number;
    rows: number;
    frames: number;
};

export const getRandomAbstractTile = () => {
    // We filter the selector tile, as we do not wan't any animated tiles
    const tiles = [...abstractTileTypes].filter(
        (tile) => tile !== 'selector' && tile !== 'deep_water' && tile !== 'rocky_water',
    );
    return random<Exclude<AbstractTile, 'selector' | 'deep_water' | 'rocky_water'>>(tiles);
};

export class Tile {
    public id = crypto.randomUUID();

    get serialId() {
        return `${this.position.x}:${this.position.y}`;
    }

    constructor(
        public position: Vector2,
        public type: AbstractTile,
    ) {}

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
