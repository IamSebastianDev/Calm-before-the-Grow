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
                <div className="container settings-menu">
                    <div className="settings-title">
                        <button onPointerDown={() => sceneManager.next('menu')}>▹</button>
                        <div className="ui-heading">Settings</div>
                    </div>
                </div>
            </Html>
        </>
    );
};
