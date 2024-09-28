/** @format */

import { Vector3 } from 'three';
import { Lights } from '../components/lights';

import { TileRenderer } from '../components/tile-renderer';
import { useControllerAction } from '../core/controller';

import { Overlay } from '../components/overlay';
import { Scene, useScene } from '../core/scene-manager';
import { useAssets } from '../providers/asset.provider';
import { useController } from '../providers/controller.provider';
import { useGameState } from '../stores/game-state/game-state.store';
import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
    upgradeTile,
} from '../stores/grid/grid.actions';
import { useOrderedGrid } from '../stores/grid/grid.store';
import { calculateOffsetAmount } from '../stores/grid/grid.utils';

export const Main: Scene = () => {
    const sceneManager = useScene();
    const assets = useAssets();
    const grid = useOrderedGrid();
    const game = useGameState();

    // Set up basic controls for panning around
    const controller = useController();
    useControllerAction(controller, 'PAN_LEFT', (_, keys) => moveGridOffsetLeft(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_RIGHT', (_, keys) => moveGridOffsetRight(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_DOWN', (_, keys) => moveGridOffsetDown(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_UP', (_, keys) => moveGridOffsetUp(calculateOffsetAmount(keys)));

    console.log({ game, sceneManager, assets, controller, grid });

    return (
        <>
            <Overlay />
            <Lights />
            {grid.tiles.map((tile, idx) => (
                <TileRenderer
                    onPointerDown={() => upgradeTile(tile, 'dirt_1')}
                    tile={tile}
                    key={tile.id}
                    position={
                        new Vector3(tile.position.x + grid.offset.x, tile.position.y + grid.offset.y, idx * 0.000001)
                    }
                />
            ))}
        </>
    );
};
