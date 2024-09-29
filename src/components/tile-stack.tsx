/** @format */

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { useAssets } from '../providers/asset.provider';
import { useStackStore } from '../stores/stack/stack.store';

export const TileStack = () => {
    const tiles = useStackStore((state) => state.tiles);
    const assets = useAssets();

    const ref = useRef<any>();
    const { camera, size } = useThree();

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

    return (
        <group ref={ref}>
            {tiles.map((tile, idx) => (
                <mesh key={idx} position={new Vector3(0, idx * 0.5, idx)}>
                    <planeGeometry />
                    <meshStandardMaterial transparent map={assets[tile]} />
                </mesh>
            ))}
        </group>
    );
};
