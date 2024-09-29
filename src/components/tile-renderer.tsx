/** @format */

import { MeshProps } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Tile } from '../stores/grid/grid.tiles';
import { AnimatedSprite } from './animated-sprite';
import { StaticSprite } from './static-sprite';

export type TileRendererProps = MeshProps & {
    tile: Tile;
    position: Vector3;
};
export const TileRenderer = ({ tile, ...props }: TileRendererProps) => {
    return Tile.isAnimatedTile(tile) ? (
        <AnimatedSprite tile={tile} {...props} />
    ) : (
        <StaticSprite tile={tile} {...props} />
    );
};
