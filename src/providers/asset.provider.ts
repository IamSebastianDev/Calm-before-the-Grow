/** @format */
// Dirt
import tile_001 from '../assets/sprites/tile_001.png';
import tile_002 from '../assets/sprites/tile_002.png';
// Soil
import tile_017 from '../assets/sprites/tile_017.png';
// Grass
import tile_022 from '../assets/sprites/tile_022.png';
import tile_023 from '../assets/sprites/tile_023.png';
import tile_024 from '../assets/sprites/tile_024.png';
// Rocks
import tile_061 from '../assets/sprites/tile_061.png';
import tile_063 from '../assets/sprites/tile_063.png';
// Prop Rocks
import tile_064 from '../assets/sprites/tile_064.png';
// Water
import tile_104 from '../assets/sprites/tile_104.png';
// Deep water
import tile_094 from '../assets/sprites/tile_094.png';
// Flowers
import tile_041 from '../assets/sprites/tile_041.png';
import tile_042 from '../assets/sprites/tile_042.png';
import tile_044 from '../assets/sprites/tile_044.png';
// UI
import chevron from '../assets/sprites/ui/chevron.png';
import menu from '../assets/sprites/ui/menu.png';
import outline from '../assets/sprites/ui/outline.png';
import question from '../assets/sprites/ui/question.png';
import rotate from '../assets/sprites/ui/rotate.png';
import selector from '../assets/sprites/ui/selector.png';
import { createAssetProvider } from '../core/asset-loader';
import { AbstractTile, TileType } from '../stores/grid/grid.tiles';

export const tiles = {
    selector,
    dirt_1: tile_001,
    dirt_2: tile_002,
    soil_1: tile_017,
    grass_1: tile_022,
    grass_2: tile_023,
    grass_3: tile_024,
    shallow_water_1: tile_104,
    deep_water_1: tile_094,
    rocks_1: tile_061,
    rocks_2: tile_063,
};

export const props = {
    flower_01: tile_041,
    flower_02: tile_042,
    flower_03: tile_044,
    small_rock_01: tile_064,
};

export const textureMatcher: Record<AbstractTile, TileType[]> = {
    dirt: ['dirt_1', 'dirt_2'],
    grass: ['grass_1', 'grass_2', 'grass_3'],
    soil: ['soil_1'],
    selector: ['selector'],
    shallow_water: ['shallow_water_1'],
    deep_water: ['deep_water_1'],
    rocks: ['rocks_1', 'rocks_2'],
};

export const assets = {
    menu,
    outline,
    chevron,
    rotate,
    question,
};

export type AssetType = keyof typeof tiles;
export const { useAssets, AssetProvider } = createAssetProvider({ ...assets, ...tiles, ...props }, [
    '/fonts/monogram.ttf',
]);
