/** @format */

import { MeshProps } from '@react-three/fiber';
import { useClock } from '../hooks/use-clock';
import { useAssets } from '../providers/asset.provider';
import { AnimatedTile } from '../stores/grid/grid.tiles';

export type AnimatedSpriteProps = MeshProps & {
    tile: AnimatedTile;
};
export const AnimatedSprite = ({ tile, ...props }: AnimatedSpriteProps) => {
    const assets = useAssets();
    const texture = assets[tile.type];
    const clock = useClock(tile.frames);

    texture.repeat.set(1 / tile.columns, 1 / tile.rows);
    texture.offset.x = (clock % tile.columns) / tile.columns;

    return (
        <mesh {...props} scale={1.75}>
            <planeGeometry />
            <meshStandardMaterial transparent map={texture} />
        </mesh>
    );
};
