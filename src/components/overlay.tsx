/** @format */

import { Html } from '@react-three/drei';
import { useControllerAction } from '../core/controller';
import { useScene } from '../core/scene-manager';
import { calculateOffsetAmount } from '../functions/calculate-offset-amount';
import { useDevice } from '../hooks/use-device';
import { useAssets } from '../providers/asset.provider';
import { useController } from '../providers/controller.provider';
import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
} from '../stores/grid/grid.actions';
import { gameStorage } from '../stores/storage';
import { QuestDisplay } from './quest-display';
import { RotateDevice } from './rotate-device';
import { ScoreRow } from './score-row';
import { TouchControls } from './touch-controls';

export const Overlay = () => {
    const device = useDevice();
    const assets = useAssets();
    const scene = useScene();

    // Set up basic controls for panning around
    const controller = useController();
    useControllerAction(controller, 'PAN_LEFT', (_, keys) => moveGridOffsetLeft(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_RIGHT', (_, keys) => moveGridOffsetRight(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_DOWN', (_, keys) => moveGridOffsetDown(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_UP', (_, keys) => moveGridOffsetUp(calculateOffsetAmount(keys)));

    return (
        <Html center={true}>
            <div className="container overlay">
                <div className="overlay-fade-in fades-in"></div>
                {/* Menu Buttons */}
                <ScoreRow
                    assets={assets}
                    onMenuClick={() => {
                        gameStorage.storeGameState();
                        scene.next('menu');
                    }}
                    onHelpClick={() => scene.next('howto')}
                />
                {/* Quest */}
                <QuestDisplay />
                {/* Mobile Controller */}
                {device.isMobile && device.isLandscape && <TouchControls />}
                {/* Turn device hint */}
                {device.isMobile && <RotateDevice assets={assets} isLandscape={device.isLandscape} />}
            </div>
        </Html>
    );
};
