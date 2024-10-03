/** @format */

import { ThreeEvent } from '@react-three/fiber';
import { Vector2 } from 'three';
import { Tile } from '../stores/grid/grid.tiles';

export const sortTilesByProximity =
    ({ point }: ThreeEvent<PointerEvent>, offset: Vector2) =>
    (a: Tile, b: Tile) => {
        const point2d = new Vector2(point.x, point.y);
        const aOffset2d = new Vector2(a.position.x + offset.x, a.position.y + offset.y);
        const bOffset2d = new Vector2(b.position.x + offset.x, b.position.y + offset.y);
        return aOffset2d.distanceTo(point2d) > bOffset2d.distanceTo(point2d) ? 1 : -1;
    };
