/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { Scene, useScene } from '../core/scene-manager';
import { startGame } from '../stores/game-state/game-state.actions';
import { useGameState } from '../stores/game-state/game-state.store';

export const Menu: Scene = () => {
    const sceneManager = useScene();
    const started = useGameState((state) => state.started);

    const handleStartGameClick = () => {
        startGame();
        sceneManager.next('main');
    };

    const handleResumeGameClick = () => {
        if (!started) return;
        sceneManager.next('main');
    };

    const handleSettingsClick = () => {
        sceneManager.next('settings');
    };

    const handleHowtoClick = () => {
        sceneManager.next('howto');
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
                        <button disabled={!started} className="ui-button" onPointerDown={() => handleResumeGameClick()}>
                            Resume Game
                        </button>
                        <button className="ui-button" onPointerDown={() => handleHowtoClick()}>
                            How to Play
                        </button>
                        <button className="ui-button" onPointerDown={() => handleSettingsClick()}>
                            Settings
                        </button>
                    </div>
                </div>
            </Html>
        </>
    );
};
