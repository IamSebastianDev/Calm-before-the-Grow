/** @format */

import { Html } from '@react-three/drei';
import { useScene } from '../core/scene-manager';
import { useDevice } from '../hooks/use-device';
import { useAssets } from '../providers/asset.provider';
import { RotateDevice } from './rotate-device';
import { ScoreRow } from './score-row';
import { TouchControls } from './touch-controls';

export const Overlay = () => {
    const device = useDevice();
    const assets = useAssets();
    const scene = useScene();

    return (
        <Html center={true}>
            <div className="container overlay">
                <div className="overlay-fade-in fades-in"></div>
                {/* Menu Buttons */}
                <ScoreRow assets={assets} onMenuClick={() => scene.next('menu')} />
                {/* Mobile Controller */}
                {device.isMobile && device.isLandscape && <TouchControls assets={assets} />}
                {/* Turn device hint */}
                {device.isMobile && <RotateDevice assets={assets} isLandscape={device.isLandscape} />}
            </div>
        </Html>
    );
};
