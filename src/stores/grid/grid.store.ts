/** @format */

import { Vector2 } from 'three';
import { create } from 'zustand';

export type Tile = {
    position: Vector2;
};

export type GridStore = {
    tiles: Map<string, Tile>;
    offset: Vector2;
};

export const useGridStore = create<GridStore>()(() => ({
    tiles: new Map([['0:0', { position: new Vector2(0, 0) }]]),
    offset: new Vector2(0, 0),
}));
