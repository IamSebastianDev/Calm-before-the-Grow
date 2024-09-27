/** @format */

import { Loading } from './components/loading';
import { AssetLoader, createAssetProvider } from './core/asset-loader';
import { createControllerProvider } from './core/controller';
import { Display } from './core/display';
import { SceneManager } from './core/scene-manager';
import { Main } from './scenes/main.scene';
import { GameStateProvider } from './stores/state';

export const { useAssets, AssetProvider } = createAssetProvider({});
export const { useController, ControllerProvider } = createControllerProvider(
    ['ACTION', 'MOVE_LEFT', 'MOVE_RIGHT'] as const,
    {
        ACTION: ['E', 'e'],
        MOVE_LEFT: ['ArrowLeft', 'a', 'A'],
        MOVE_RIGHT: ['ArrowRight', 'd', 'D'],
    },
);

export const App = () => {
    return (
        <ControllerProvider>
            <Display enableFPS={import.meta.env.DEV}>
                <AssetLoader loader={Loading}>
                    <AssetProvider>
                        <GameStateProvider>
                            <SceneManager>
                                <Main id="main" />
                            </SceneManager>
                        </GameStateProvider>
                    </AssetProvider>
                </AssetLoader>
            </Display>
        </ControllerProvider>
    );
};
