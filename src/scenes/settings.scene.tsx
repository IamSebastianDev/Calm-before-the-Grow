/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { ChangeEvent } from 'react';
import { Scene, useScene } from '../core/scene-manager';
import { useSettings } from '../core/settings';

export const Settings: Scene = () => {
    const sceneManager = useScene();
    const settings = useSettings();

    const handleRequestFullscreen = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        settings.requestFullscreen(target.checked);
    };

    const handleRequestMute = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        settings.setMuted(target.checked);
    };

    return (
        <>
            <Lights />
            <Html center={true}>
                <div className="container settings-menu">
                    <div className="settings-title">
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
                                checked={settings.isFullscreen}
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
                                checked={settings.isMuted}
                                onChange={(event) => handleRequestMute(event)}
                            />
                        </label>
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
