/** @format */

import { useRef } from 'react';
import * as THREE from 'three';
import { useAssets, useController } from '../App';
import { Lights } from '../components/lights';
import { useControllerAction } from '../core/controller';
import { Scene, useScene } from '../core/scene-manager';
import { useGameState } from '../stores/state';

export const Main: Scene = () => {
    const state = useGameState();
    const sceneManager = useScene();
    const assets = useAssets();
    const controller = useController();

    // Ref to access the mesh (cube)
    const cubeRef = useRef<THREE.Mesh>(null);

    useControllerAction(controller, 'ACTION', (...args) => console.log('Action Clicked', { ...args }));
    useControllerAction(controller, 'MOVE_LEFT', (_, keys) => {
        const factor = keys.includes('Shift') ? 10 : 1;
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.1 * factor; // Rotate on the x-axis
            cubeRef.current.rotation.y += 0.1 * factor; // Rotate on the y-axis
        }
    });
    useControllerAction(controller, 'MOVE_RIGHT', (_, keys) => {
        const factor = keys.includes('Shift') ? 10 : 1;
        if (cubeRef.current) {
            cubeRef.current.rotation.x -= 0.1 * factor; // Rotate on the x-axis
            cubeRef.current.rotation.y -= 0.1 * factor; // Rotate on the y-axis
        }
    });

    console.log({ state, sceneManager, assets, controller });

    return (
        <>
            <Lights />
            <mesh ref={cubeRef}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </>
    );
};
