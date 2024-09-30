/** @format */

import { animated, useSpring } from '@react-spring/three';
import { MeshProps } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useAssets } from '../providers/asset.provider';
import { Prop } from '../stores/props/props.store';

export type PropRendererProps = MeshProps & {
    prop: Prop;
    position: Vector3;
};

export const PropRenderer = ({ prop, position: targetPosition, ...props }: PropRendererProps) => {
    const assets = useAssets();
    const texture = assets[prop.type];

    const { x, y, z } = targetPosition;

    // Define the spring animation
    const { scale, opacity } = useSpring<{
        scale: [number, number, number];
        opacity: number;
    }>({
        config: { tension: 400, friction: 15 },
        from: {
            scale: [0.5, 0.5, 0],
            opacity: 0,
            position: [x, y - 0.05, z],
        },
        to: {
            scale: [1.5, 1.5, 1.5],
            opacity: 1,
            position: [x, y, z],
        },
    });

    const { position } = useSpring<{ position: Position }>({
        config: { tension: 120, friction: 15 },
        from: {
            position: [x, y - 0.05, z],
        },
        to: {
            position: [x, y, z],
        },
    });

    return (
        <animated.mesh position={position} {...props} scale={scale}>
            <planeGeometry />
            <animated.meshStandardMaterial transparent map={texture} opacity={opacity} />
        </animated.mesh>
    );
};
