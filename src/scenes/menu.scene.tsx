/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { Scene, useScene } from '../core/scene-manager';
import { useAssets } from '../providers/asset.provider';
import { startGame } from '../stores/game-state/game-state.actions';
import { useGameState } from '../stores/game-state/game-state.store';
import { useOrderedGrid } from '../stores/grid/grid.store';

export const Menu: Scene = () => {
    const sceneManager = useScene();
    const assets = useAssets();
    const grid = useOrderedGrid();
    const game = useGameState();

    console.log({ game, sceneManager, assets, grid });

    const handleStartGameClick = () => {
        startGame();
        sceneManager.next('main');
    };

    return (
        <>
            <Lights />
            <Html center={true}>
                <div className="container main-menu">
                    <div className="ui-heading">Calm before the Bloom</div>
                    <div className="main-menu-buttons">
                        <button className="ui-button" onPointerDown={() => handleStartGameClick()}>
                            Start new Game
                        </button>
                        <button className="ui-button">Options</button>
                    </div>
                </div>
            </Html>
        </>
    );
};
