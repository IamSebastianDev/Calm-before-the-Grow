/** @format */

import { animated, useSpring } from '@react-spring/three';
import { MeshProps } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useMatchAbstractToTexture } from '../hooks/use-match-abstract-to-texture';
import { Tile } from '../stores/grid/grid.tiles';

export type StaticSpriteProps = MeshProps & {
    tile: Tile;
    position: Vector3;
};

export const StaticSprite = ({ tile, position: finalPosition, ...props }: StaticSpriteProps) => {
    // Get the texture of the the Tile
    const texture = useMatchAbstractToTexture(tile.type);

    // Deconstruct the final position
    const { x, y, z } = finalPosition!;

    // Define the spring animation
    const { position } = useSpring({
        from: { position: [x, y - 0.25, z] }, // Start position slightly below the final Y position
        to: { position: [x, y, z] }, // Final position from props
        config: { tension: 200, friction: 15 }, // Adjust animation config
    });

    return (
        <animated.mesh {...props} position={position as unknown as [x: number, y: number, z: number]} scale={1.85}>
            <planeGeometry />
            <meshStandardMaterial transparent map={texture} />
        </animated.mesh>
    );
};
