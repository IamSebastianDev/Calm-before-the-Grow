/** @format */

import { animated, config, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useMatchAbstractToTexture } from '../hooks/use-match-abstract-to-texture';
import { useAssets } from '../providers/asset.provider';
import { useGameState } from '../stores/game-state/game-state.store';
import { AbstractTile, getRandomAbstractTile } from '../stores/grid/grid.tiles';
import { addTilesToStack } from '../stores/stack/stack.actions';
import { useStackStore } from '../stores/stack/stack.store';

// Child component for rendering the tile number
type TileCountProps = { position: Vector3; count: number };
const TileCount = ({ position, count }: TileCountProps) => {
    const assets = useAssets();
    const { scale } = useSpring<{ scale: number }>({
        config: config.wobbly,
        from: { scale: 0.55 },
        to: { scale: 0.75 },
    });

    const ref = useRef<number>();
    useEffect(() => {
        if (ref.current !== count) {
            ref.current = count;
            scale.reset();
        }
    }, [count]);

    return (
        <animated.group position={position} scale={scale}>
            <Text
                fontSize={0.4}
                font={'/fonts/monogram.ttf'}
                color="white"
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {count}
            </Text>
            <sprite scale={0.75} position={new Vector3(-0.01, -0.01, 0)}>
                <spriteMaterial map={assets.outline} />
            </sprite>
        </animated.group>
    );
};

// Child component for rendering each tile with its animation
type AnimatedTileProps = { idx: number; type: AbstractTile; top: boolean };
const AnimatedTile = ({ idx, type, top }: AnimatedTileProps) => {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const texture = useMatchAbstractToTexture(type);

    // Use spring to animate the position of each tile
    const { position } = useSpring({
        position: isHighlighted
            ? [top && idx > 3 ? 0.35 : 0.15, idx * 0.5, idx]
            : [top && idx > 3 ? 0.25 : 0, idx * 0.5, idx + 1],
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.mesh
            position={position as unknown as [x: number, y: number, z: number]}
            onPointerEnter={(event) => {
                event.stopPropagation();
                setIsHighlighted(true);
            }}
            onPointerLeave={(event) => {
                event.stopPropagation();
                setIsHighlighted(false);
            }}
        >
            <planeGeometry />
            <meshStandardMaterial transparent map={texture} />
        </animated.mesh>
    );
};

export const TileStack = () => {
    const tiles = useStackStore((state) => state.tiles);
    const assets = useAssets();

    const ref = useRef<any>();
    const { camera, size } = useThree();

    const timer = useGameState((state) => state.clock);
    const remaining = 30 - (timer % 30);

    useEffect(() => {
        if (remaining === 30) {
            if (tiles.length < 32) {
                addTilesToStack(getRandomAbstractTile());
            }
        }
    }, [remaining]);

    useFrame(() => {
        if ('isOrthographicCamera' in camera && camera.isOrthographicCamera) {
            // Get the aspect ratio
            const aspect = size.width / size.height;

            // Calculate the frustum width and height, considering the camera zoom
            const frustumHeight = (camera.top - camera.bottom) / camera.zoom;
            const frustumWidth = frustumHeight * aspect;

            // Calculate the exact position at the bottom-left corner
            const left = -frustumWidth / 2;
            const bottom = -frustumHeight / 2;

            // Use the smaller dimension (height or width) to set a uniform offset
            const uniformOffset = Math.min(frustumWidth, frustumHeight) / 10;

            // Apply the uniform offset to both x and y positions
            ref.current.position.set(left + uniformOffset, bottom + uniformOffset, 0);

            // Adjust the group scale to compensate for zoom (to keep the sprite size constant)
            const inverseZoom = 1 / camera.zoom;
            ref.current.scale.set(inverseZoom * 1.25, inverseZoom * 1.25, 1);
        }
    });

    const currentTiles = tiles.slice(-9);

    return (
        <group ref={ref}>
            {/* Tiles */}
            {currentTiles.map((tile, idx) => (
                <AnimatedTile key={idx} type={tile} idx={idx} top={idx === currentTiles.length - 1} />
            ))}

            {/* Seconds til next tile */}
            <group position={new Vector3(1, 0, 1)} scale={0.75}>
                <Text
                    fontSize={0.4}
                    font={'/fonts/monogram.ttf'}
                    color="white"
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {Math.ceil(remaining / 2)}s
                </Text>
                <sprite scale={0.75} position={new Vector3(-0.01, -0.01, 0)}>
                    <spriteMaterial map={assets.outline} />
                </sprite>
            </group>
            {/* Number of available tiles */}
            <TileCount position={new Vector3(1, 0.7, 1)} count={tiles.length} />
            {/* Next indicator */}
            {currentTiles.length > 3 && (
                <group position={new Vector3(1.25, Math.max(currentTiles.length * 0.5 - 0.5, 1.4), 5)} scale={0.75}>
                    <Text
                        fontSize={0.28}
                        font={'/fonts/monogram.ttf'}
                        color="white"
                        textAlign="center"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Next
                    </Text>
                    <sprite scale={0.75} position={new Vector3(-0.01, -0.01, 0)}>
                        <spriteMaterial map={assets.outline} />
                    </sprite>
                </group>
            )}
        </group>
    );
};
