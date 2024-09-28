/** @format */

import { SpriteProps } from '@react-three/fiber';
import { useAssets } from '../providers/asset.provider';
import { Tile } from '../stores/grid/grid.tiles';

export type StaticSpriteProps = SpriteProps & {
    tile: Tile;
};

export const StaticSprite = ({ tile, ...props }: StaticSpriteProps) => {
    // Get the texture of the the Tile
    const assets = useAssets();
    const texture = assets[tile.type];

    return (
        <sprite {...props} scale={1.75}>
            <spriteMaterial transparent map={texture} />
        </sprite>
    );
};
