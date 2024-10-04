/** @format */
/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { Scene, useScene } from '../core/scene-manager';

export const HowTo: Scene = () => {
    const sceneManager = useScene();

    return (
        <>
            <Lights />
            <Html center={true}>
                <div className="container howto-menu">
                    <div className="howto-title">
                        <div className="ui-heading">How to play</div>
                    </div>
                    {/* Back button */}
                    <button className="settings-button" onPointerDown={() => sceneManager.next('menu')}>
                        Back to menu
                    </button>
                </div>
            </Html>
        </>
    );
};
