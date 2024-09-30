/** @format */

import { animated, config, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useHighlightHint } from '../hooks/use-highlight-hint';
import { useMatchAbstractToTexture } from '../hooks/use-match-abstract-to-texture';
import { useAssets } from '../providers/asset.provider';
import { Tile } from '../stores/grid/grid.tiles';

// Animation component
type HighlightProps = {
    hint: string;
    position: Vector3;
};

export const Highlight = ({ hint, position: targetPosition }: HighlightProps) => {
    const assets = useAssets();

    const { position, scale } = useSpring<{ position: Vector3; scale: number }>({
        config: config.wobbly,
        from: {
            position: [targetPosition.x, targetPosition.y, targetPosition.z + 1],
            scale: 0.7,
        },
        to: {
            position: [targetPosition.x, targetPosition.y + 0.5, targetPosition.z + 1],
            scale: 1,
        },
    });

    return (
        <animated.group position={position} scale={scale}>
            <mesh scale={0.7} rotation={[0, 0, 0.78]} castShadow>
                <planeGeometry />
                <meshBasicMaterial transparent color={'black'} opacity={0.8} />
            </mesh>
            <mesh>
                <planeGeometry />
                <meshStandardMaterial transparent map={assets.outline} />
            </mesh>
            <Text
                fontSize={0.28}
                font={'/fonts/monogram.ttf'}
                color="white"
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {hint}
            </Text>
        </animated.group>
    );
};

export type StaticSpriteProps = MeshProps & {
    tile: Tile;
    position: Vector3;
};

export const StaticSprite = ({ tile, position: targetPosition, ...props }: StaticSpriteProps) => {
    // Get the texture of the the Tile
    const texture = useMatchAbstractToTexture(tile.type);

    // Deconstruct the final position
    const { x, y, z } = targetPosition!;

    // Define the spring animation
    const { position, opacity } = useSpring<{ position: Position; opacity: number }>({
        from: { position: [x, y - 0.55, z], opacity: 0 }, // Start position slightly below the final Y position
        to: { position: [x, y, z], opacity: 1 }, // Final position from props
        config: { tension: 120, friction: 15 }, // Adjust animation config
    });

    const { showHighlight, hint } = useHighlightHint(tile);

    return (
        <group>
            <animated.mesh
                {...props}
                position={position as unknown as [x: number, y: number, z: number]}
                scale={1.85}
                receiveShadow
            >
                <planeGeometry />
                <animated.meshStandardMaterial transparent map={texture} opacity={opacity} />
            </animated.mesh>
            {showHighlight && hint && <Highlight hint={hint} position={targetPosition} />}
        </group>
    );
};
