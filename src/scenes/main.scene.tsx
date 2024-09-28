/** @format */

import { Lights } from '../components/lights';
import { Sprite } from '../components/sprite';
import { useControllerAction } from '../core/controller';

import { Scene, useScene } from '../core/scene-manager';
import { useAssets } from '../providers/asset.provider';
import { useController } from '../providers/controller.provider';
import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
    upgradeTile,
} from '../stores/grid/grid.actions';
import { useOrderedGrid } from '../stores/grid/grid.store';
import { calculateOffsetAmount } from '../stores/grid/grid.utils';
import { useGameState } from '../stores/state';

export const Main: Scene = () => {
    const state = useGameState();
    const sceneManager = useScene();
    const assets = useAssets();
    const grid = useOrderedGrid();

    // Set up basic controls for panning around
    const controller = useController();
    useControllerAction(controller, 'PAN_LEFT', (_, keys) => moveGridOffsetLeft(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_RIGHT', (_, keys) => moveGridOffsetRight(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_DOWN', (_, keys) => moveGridOffsetDown(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_UP', (_, keys) => moveGridOffsetUp(calculateOffsetAmount(keys)));

    console.log({ state, sceneManager, assets, controller, grid });

    return (
        <>
            <Lights />
            {grid.tiles.map((tile, idx) => (
                <Sprite
                    onPointerDown={() => upgradeTile(tile, 'dirt_1')}
                    key={idx}
                    texture={assets[tile.type]}
                    position={[tile.position.x + grid.offset.x, tile.position.y + grid.offset.y, 1]}
                    scale={1.75}
                />
            ))}
        </>
    );
};
