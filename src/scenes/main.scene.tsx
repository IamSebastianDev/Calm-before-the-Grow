/** @format */

import { Vector2, Vector3 } from 'three';
import { Lights } from '../components/lights';

import { TileRenderer } from '../components/tile-renderer';
import { useControllerAction } from '../core/controller';

import { ThreeEvent } from '@react-three/fiber';
import { MobileController } from '../components/mobile-controller';
import { Overlay } from '../components/overlay';
import { TileStack } from '../components/tile-stack';
import { Scene, useScene } from '../core/scene-manager';
import { useDevice } from '../hooks/use-device';
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
import { Tile } from '../stores/grid/grid.tiles';
import { calculateOffsetAmount } from '../stores/grid/grid.utils';
import { takeTileFromStack } from '../stores/stack/stack.actions';
import { useStackStore } from '../stores/stack/stack.store';

const sortTilesByProximity =
    ({ point }: ThreeEvent<PointerEvent>, offset: Vector2) =>
    (a: Tile, b: Tile) => {
        const point2d = new Vector2(point.x, point.y);
        const aOffset2d = new Vector2(a.position.x + offset.x, a.position.y + offset.y);
        const bOffset2d = new Vector2(b.position.x + offset.x, b.position.y + offset.y);
        return aOffset2d.distanceTo(point2d) > bOffset2d.distanceTo(point2d) ? 1 : -1;
    };

export const Main: Scene = () => {
    const sceneManager = useScene();
    const assets = useAssets();
    const grid = useOrderedGrid();
    const game = useGameState();
    const stack = useStackStore();
    const device = useDevice();

    // Set up basic controls for panning around
    const controller = useController();
    useControllerAction(controller, 'PAN_LEFT', (_, keys) => moveGridOffsetLeft(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_RIGHT', (_, keys) => moveGridOffsetRight(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_DOWN', (_, keys) => moveGridOffsetDown(calculateOffsetAmount(keys)));
    useControllerAction(controller, 'PAN_UP', (_, keys) => moveGridOffsetUp(calculateOffsetAmount(keys)));

    console.log({ game, sceneManager, assets, controller, grid, device });

    const handleTileClicked = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const next = stack.tiles.at(-1);

        // On each click, we get the tile closest to the event
        const [tile] = grid.tiles.sort(sortTilesByProximity(event, grid.offset));
        // if the distance between closest and event.point is larger then 1, we return early
        if (tile.position.distanceTo(new Vector2(event.point.x, event.point.y)) > 10 || !next) {
            return;
        }

        upgradeTile(tile, next);
        takeTileFromStack();
    };

    return (
        <>
            <Overlay />
            <Lights />
            {device.isMobile && <MobileController />}
            <TileStack />
            <group onPointerDown={(ev) => handleTileClicked(ev)}>
                {grid.tiles.map((tile, idx) => (
                    <TileRenderer
                        tile={tile}
                        key={tile.id}
                        position={
                            new Vector3(
                                tile.position.x + grid.offset.x,
                                tile.position.y + grid.offset.y,
                                idx * 0.000001,
                            )
                        }
                    />
                ))}
            </group>
        </>
    );
};
