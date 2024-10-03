/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { Scene, useScene } from '../core/scene-manager';

export const Settings: Scene = () => {
    const sceneManager = useScene();

    return (
        <>
            <Lights />
            <Html center={true}>
                <div className="container main-menu">
                    <div className="ui-heading">Settings</div>
                </div>
            </Html>
        </>
    );
};
