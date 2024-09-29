/** @format */

import { animated, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Texture, Vector3 } from 'three';
import { useAssets } from '../providers/asset.provider';
import { useStackStore } from '../stores/stack/stack.store';

// Child component for rendering each tile with its animation
type AnimatedTileProps = { idx: number; texture: Texture };
const AnimatedTile = ({ idx, texture }: AnimatedTileProps) => {
    const [isHighlighted, setIsHighlighted] = useState(false);

    // Use spring to animate the position of each tile
    const { position } = useSpring({
        position: isHighlighted ? [0.15, idx * 0.5, idx] : [0, idx * 0.5, idx],
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

    const [highlightedIdx, setHighlightedIdx] = useState(-1);

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

    console.log({ tiles, ref });

    const handlePointerLeave = (event: ThreeEvent<PointerEvent>) => {
        setHighlightedIdx(-1);
        event.stopPropagation();
    };

    const handlePointerEnter = (event: ThreeEvent<PointerEvent>, idx: number) => {
        setHighlightedIdx(idx);
        event.stopPropagation();
    };

    return (
        <group ref={ref}>
            {tiles.map((tile, idx) => (
                <AnimatedTile key={idx} texture={assets[tile]} idx={idx}></AnimatedTile>
            ))}
            <group position={new Vector3(0, tiles.length * 0.5 + 0.25, 1)} scale={0.75}>
                <Text
                    fontSize={0.4}
                    font={'/fonts/monogram.ttf'}
                    color="white"
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {tiles.length}
                </Text>
                <sprite scale={0.75} position={new Vector3(-0.01, -0.01, 0)}>
                    <spriteMaterial map={assets.outline} />
                </sprite>
            </group>
        </group>
    );
};