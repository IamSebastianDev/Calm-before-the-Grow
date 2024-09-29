/** @format */

import { Html } from '@react-three/drei';
import { useScene } from '../core/scene-manager';
import { useDevice } from '../hooks/use-device';
import { useAssets } from '../providers/asset.provider';
import { useGameState } from '../stores/game-state/game-state.store';
import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
} from '../stores/grid/grid.actions';

export const Overlay = () => {
    const score = useGameState((state) => state.score);
    const sceneManager = useScene();
    const device = useDevice();
    const assets = useAssets();

    return (
        <Html center={true}>
            <div className="container overlay">
                <div className="overlay-fade-in fades-in"></div>
                {/* Menu Buttons */}
                <div className="overlay-button-container">
                    <span>{score.toString().padStart(6, '0')}</span>
                    <button className="overlay-button" onClick={() => sceneManager.next('menu')}>
                        <img src={assets.menu.image.src} />
                    </button>
                </div>
                {/* Mobile Controller */}
                {device.isMobile && (
                    <div className="mobile-controller">
                        <button className="up" onClick={() => moveGridOffsetUp(0.5)}>
                            <img src={assets.chevron.image.src} />
                        </button>
                        <button className="down" onClick={() => moveGridOffsetDown(0.5)}>
                            <img src={assets.chevron.image.src} />
                        </button>
                        <button className="left" onClick={() => moveGridOffsetLeft(0.5)}>
                            <img src={assets.chevron.image.src} />
                        </button>
                        <button className="right" onClick={() => moveGridOffsetRight(0.5)}>
                            <img src={assets.chevron.image.src} />
                        </button>
                    </div>
                )}
                {/* Turn device hint */}
                {device.isMobile && (
                    <div className={`landscape-hint ${device.isLandscape ? 'hidden' : ''}`}>
                        <img src={assets.rotate.image.src} />
                    </div>
                )}
            </div>
        </Html>
    );
};
