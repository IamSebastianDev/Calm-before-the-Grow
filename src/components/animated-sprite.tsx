/** @format */

import { animated, useSpring } from '@react-spring/three';
import { MeshProps } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useClock } from '../hooks/use-clock';
import { useMatchAbstractToTexture } from '../hooks/use-match-abstract-to-texture';
import { AnimatedTile } from '../stores/grid/grid.tiles';

export type AnimatedSpriteProps = MeshProps & {
    tile: AnimatedTile;
    position: Vector3;
};
export const AnimatedSprite = ({ tile, position: finalPosition, ...props }: AnimatedSpriteProps) => {
    const texture = useMatchAbstractToTexture(tile.type);
    const clock = useClock(tile.frames);

    if (!texture) {
        throw new Error();
    }

    texture.repeat.set(1 / tile.columns, 1 / tile.rows);
    texture.offset.x = (clock % tile.columns) / tile.columns;

    // Deconstruct the final position
    const { x, y, z } = finalPosition!;

    // Define the spring animation
    const { position } = useSpring({
        from: { position: [x, y - 0.25, z] }, // Start position slightly below the final Y position
        to: { position: [x, y, z] }, // Final position from props
        config: { tension: 200, friction: 15 }, // Adjust animation config
    });

    return (
        <animated.mesh {...props} scale={1.75} position={position as unknown as [x: number, y: number, z: number]}>
            <planeGeometry />
            <meshStandardMaterial transparent map={texture} />
        </animated.mesh>
    );
};
