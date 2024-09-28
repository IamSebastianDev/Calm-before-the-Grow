/** @format */

import { SpriteProps } from '@react-three/fiber';
import { Tile } from '../stores/grid/grid.tiles';
import { AnimatedSprite } from './animated-sprite';
import { StaticSprite } from './static-sprite';

export type TileRendererProps = SpriteProps & {
    tile: Tile;
};
export const TileRenderer = ({ tile, ...props }: TileRendererProps) => {
    return Tile.isAnimatedTile(tile) ? (
        <AnimatedSprite tile={tile} {...props} />
    ) : (
        <StaticSprite tile={tile} {...props} />
    );
};
