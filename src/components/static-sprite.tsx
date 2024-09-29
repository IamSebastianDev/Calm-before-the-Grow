/** @format */

import { MeshProps } from '@react-three/fiber';
import { useMatchAbstractToTexture } from '../hooks/use-abstract-type';
import { Tile } from '../stores/grid/grid.tiles';

export type StaticSpriteProps = MeshProps & {
    tile: Tile;
};

export const StaticSprite = ({ tile, ...props }: StaticSpriteProps) => {
    // Get the texture of the the Tile
    const texture = useMatchAbstractToTexture(tile.type);

    return (
        <mesh {...props} scale={1.75}>
            <planeGeometry />
            <meshStandardMaterial transparent map={texture} />
        </mesh>
    );
};
