/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { ChangeEvent } from 'react';
import { Scene, useScene } from '../core/scene-manager';
import { useDevice } from '../hooks/use-device';

export const Settings: Scene = () => {
    const sceneManager = useScene();
    const device = useDevice();

    const handleRequestFullscreen = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        device.requestFullscreen(target.checked);
    };

    const handleRequestMute = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        device.requestMute(target.checked);
    };

    return (
        <>
            <Lights />
            <Html center={true}>
                <div className="container settings-menu">
                    <div className="settings-title">
                        <button onPointerDown={() => sceneManager.next('menu')}>▹</button>
                        <div className="ui-heading">Settings</div>
                    </div>
                    <div className="settings-list">
                        {/* Fullscreen */}
                        <div>Fullscreen</div>
                        <label htmlFor="fullscreen" className="ui-checkbox">
                            <input
                                id="fullscreen"
                                className="ui-checkbox-input"
                                type="checkbox"
                                checked={device.isFullscreen}
                                onChange={(event) => handleRequestFullscreen(event)}
                            />
                        </label>
                        {/* Music Mute */}
                        <div>Mute Sound</div>
                        <label htmlFor="sound" className="ui-checkbox">
                            <input
                                id="sound"
                                className="ui-checkbox-input"
                                type="checkbox"
                                checked={device.isMuted}
                                onChange={(event) => handleRequestMute(event)}
                            />
                        </label>
                    </div>
                </div>
            </Html>
        </>
    );
};
