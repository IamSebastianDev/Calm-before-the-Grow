/** @format */

import { Html } from '@react-three/drei';
import menu from '../assets/sprites/ui/menu.png';
import { useScene } from '../core/scene-manager';
import { useGameState } from '../stores/game-state/game-state.store';

export const Overlay = () => {
    const score = useGameState((state) => state.score);
    const sceneManager = useScene();

    return (
        <Html center={true}>
            <div className="container overlay fades-in">
                <div className="overlay-button-container">
                    <span>{score.toString().padStart(6, '0')}</span>
                    <button className="overlay-button" onClick={() => sceneManager.next('menu')}>
                        <img src={menu} />
                    </button>
                </div>
            </div>
        </Html>
    );
};
