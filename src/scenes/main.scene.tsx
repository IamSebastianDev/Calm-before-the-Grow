/** @format */

import { Vector2, Vector3 } from 'three';
import { Lights } from '../components/lights';

import { TileRenderer } from '../components/tile-renderer';

import { ThreeEvent } from '@react-three/fiber';
import { useEffect } from 'react';
import { Overlay } from '../components/overlay';
import { PropRenderer } from '../components/prop-renderer';
import { TileStack } from '../components/tile-stack';
import { Scene } from '../core/scene-manager';
import { sortTilesByProximity } from '../functions/sort-by-proximity';
import { useDevice } from '../hooks/use-device';
import { useAudio } from '../providers/audio.provider';
import { upgradeTile } from '../stores/grid/grid.actions';
import { useOrderedGrid } from '../stores/grid/grid.store';
import { usePropList } from '../stores/props/props.store';
import { takeTileFromStack } from '../stores/stack/stack.actions';
import { useStackStore } from '../stores/stack/stack.store';

export const Main: Scene = () => {
    const grid = useOrderedGrid();
    const props = usePropList();
    const stack = useStackStore();
    const device = useDevice();
    const audio = useAudio();

    useEffect(() => {
        const { start, stop } = audio.createPlaylist(['gardenRhythm', 'pixelDreams']);

        start();

        return () => {
            stop();
        };
    }, []);

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
            {device.isLandscape && <TileStack />}
            {/* Grid tiles */}
            <group position={new Vector3(0, 0, 0)} onPointerDown={(ev) => handleTileClicked(ev)}>
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
            {/* Props rendered after on top */}
            <group position={new Vector3(0, 0, 1)}>
                {...props.map((prop, idx) => (
                    <PropRenderer
                        prop={prop}
                        key={prop.id}
                        position={
                            new Vector3(
                                prop.position.x + grid.offset.x,
                                prop.position.y + grid.offset.y + 0.45,
                                idx * 0.000001,
                            )
                        }
                    />
                ))}
            </group>
        </>
    );
};
