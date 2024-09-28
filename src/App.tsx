/** @format */

import { Loading } from './components/loading';
import { AssetLoader } from './core/asset-loader';
import { Display } from './core/display';
import { SceneManager } from './core/scene-manager';
import { AssetProvider } from './providers/asset.provider';
import { ControllerProvider } from './providers/controller.provider';
import { Main } from './scenes/main.scene';
import { Menu } from './scenes/menu.scene';

export const App = () => {
    return (
        <ControllerProvider>
            <Display enableFPS={import.meta.env.DEV}>
                <AssetLoader loader={Loading}>
                    <AssetProvider>
                        <SceneManager>
                            <Menu id="menu" />
                            <Main id="main" />
                        </SceneManager>
                    </AssetProvider>
                </AssetLoader>
            </Display>
        </ControllerProvider>
    );
};
