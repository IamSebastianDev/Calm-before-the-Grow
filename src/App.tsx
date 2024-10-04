/** @format */

import { useEffect } from 'react';
import { Loading } from './components/loading';
import { AssetLoader } from './core/asset-loader';
import { Display } from './core/display';
import { SceneManager } from './core/scene-manager';
import { SettingsProvider } from './core/settings';
import { AssetProvider } from './providers/asset.provider';
import { AudioProvider } from './providers/audio.provider';
import { ControllerProvider } from './providers/controller.provider';
import { Main } from './scenes/main.scene';
import { Menu } from './scenes/menu.scene';
import { Settings } from './scenes/settings.scene';
import { startClock, stopClock } from './stores/game-state/game-state.actions';

export const App = () => {
    // Start the atomic application clock
    useEffect(() => {
        startClock();
        return () => stopClock();
    });

    return (
        <ControllerProvider>
            <SettingsProvider>
                <Display enableFPS={import.meta.env.DEV}>
                    <AssetLoader loader={Loading}>
                        <AssetProvider>
                            <AudioProvider>
                                <SceneManager>
                                    <Menu id="menu" />
                                    <Main id="main" />
                                    <Settings id="settings" />
                                </SceneManager>
                            </AudioProvider>
                        </AssetProvider>
                    </AssetLoader>
                </Display>
            </SettingsProvider>
        </ControllerProvider>
    );
};
