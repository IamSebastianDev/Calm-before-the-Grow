/** @format */

import { Stats } from '@react-three/drei';
import { Canvas, CanvasProps } from '@react-three/fiber';
import React, { PropsWithChildren } from 'react';
import { Camera } from '../components/camera';

export type DisplayProps = CanvasProps & {
    enableFPS?: boolean;
};
export const Display: React.FC<PropsWithChildren<DisplayProps>> = ({ children, enableFPS, ...props }) => {
    return (
        <Canvas {...props} shadows style={{ background: 'black' }}>
            <Camera>
                {enableFPS && <Stats />}
                {children}
            </Camera>
        </Canvas>
    );
};
