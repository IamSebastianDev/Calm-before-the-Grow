/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { Scene, useScene } from '../core/scene-manager';
import { startGame } from '../stores/game-state/game-state.actions';

export const Menu: Scene = () => {
    const sceneManager = useScene();

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
                        <button disabled className="ui-button" onPointerDown={() => handleStartGameClick()}>
                            Continue Game
                        </button>
                        <button className="ui-button">Options</button>
                    </div>
                </div>
            </Html>
        </>
    );
};
