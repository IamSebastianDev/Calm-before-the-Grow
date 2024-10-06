/** @format */
// Dirt
import tile_000 from '../assets/sprites/tile_000.png';
import tile_001 from '../assets/sprites/tile_001.png';
import tile_002 from '../assets/sprites/tile_002.png';
import tile_003 from '../assets/sprites/tile_003.png';
import tile_004 from '../assets/sprites/tile_004.png';
import tile_005 from '../assets/sprites/tile_005.png';
import tile_006 from '../assets/sprites/tile_006.png';
import tile_007 from '../assets/sprites/tile_007.png';
import tile_008 from '../assets/sprites/tile_008.png';
import tile_009 from '../assets/sprites/tile_009.png';
import tile_010 from '../assets/sprites/tile_010.png';
// Soil
import tile_017 from '../assets/sprites/tile_017.png';
import tile_018 from '../assets/sprites/tile_018.png';
import tile_019 from '../assets/sprites/tile_019.png';
import tile_020 from '../assets/sprites/tile_020.png';
import tile_021 from '../assets/sprites/tile_021.png';
// Grass
import tile_022 from '../assets/sprites/tile_022.png';
import tile_023 from '../assets/sprites/tile_023.png';
import tile_024 from '../assets/sprites/tile_024.png';
import tile_027 from '../assets/sprites/tile_027.png';
import tile_028 from '../assets/sprites/tile_028.png';
import tile_029 from '../assets/sprites/tile_029.png';
import tile_030 from '../assets/sprites/tile_030.png';
import tile_031 from '../assets/sprites/tile_031.png';
import tile_032 from '../assets/sprites/tile_032.png';
import tile_033 from '../assets/sprites/tile_033.png';
import tile_034 from '../assets/sprites/tile_034.png';
import tile_035 from '../assets/sprites/tile_035.png';
import tile_036 from '../assets/sprites/tile_036.png';
// Rocks
import tile_061 from '../assets/sprites/tile_061.png';
import tile_063 from '../assets/sprites/tile_063.png';
// Prop Rocks
import tile_062 from '../assets/sprites/tile_062.png';
import tile_064 from '../assets/sprites/tile_064.png';
import tile_067 from '../assets/sprites/tile_067.png';
import tile_068 from '../assets/sprites/tile_068.png';
// Water
import tile_104 from '../assets/sprites/tile_104.png';
import tile_105 from '../assets/sprites/tile_105.png';
import tile_106 from '../assets/sprites/tile_106.png';
import tile_107 from '../assets/sprites/tile_107.png';
import tile_108 from '../assets/sprites/tile_108.png';
import tile_109 from '../assets/sprites/tile_109.png';
import tile_110 from '../assets/sprites/tile_110.png';
import tile_111 from '../assets/sprites/tile_111.png';
import tile_112 from '../assets/sprites/tile_112.png';
import tile_113 from '../assets/sprites/tile_113.png';
// Deep water
import tile_094 from '../assets/sprites/tile_094.png';
// Rocky Water
import tile_071 from '../assets/sprites/tile_071.png';
import tile_072 from '../assets/sprites/tile_072.png';
import tile_073 from '../assets/sprites/tile_073.png';
// Flowers
import tile_041 from '../assets/sprites/tile_041.png';
import tile_042 from '../assets/sprites/tile_042.png';
import tile_043 from '../assets/sprites/tile_043.png';
import tile_044 from '../assets/sprites/tile_044.png';
import tile_045 from '../assets/sprites/tile_045.png';
import tile_046 from '../assets/sprites/tile_046.png';
import tile_047 from '../assets/sprites/tile_047.png';
// Logs
import tile_048 from '../assets/sprites/tile_048.png';
import tile_049 from '../assets/sprites/tile_049.png';
import tile_050 from '../assets/sprites/tile_050.png';
import tile_051 from '../assets/sprites/tile_051.png';
import tile_052 from '../assets/sprites/tile_052.png';
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
    dirt_0: tile_000,
    dirt_1: tile_001,
    dirt_2: tile_002,
    dirt_3: tile_003,
    dirt_4: tile_004,
    dirt_5: tile_005,
    dirt_6: tile_006,
    dirt_7: tile_007,
    dirt_8: tile_008,
    dirt_9: tile_009,
    dirt_10: tile_010,
    soil_1: tile_017,
    soil_2: tile_018,
    soil_3: tile_019,
    soil_4: tile_020,
    soil_5: tile_021,
    grass_1: tile_022,
    grass_2: tile_023,
    grass_3: tile_024,
    grass_4: tile_027,
    grass_5: tile_028,
    grass_6: tile_029,
    grass_7: tile_030,
    grass_8: tile_031,
    grass_9: tile_032,
    grass_10: tile_033,
    grass_11: tile_034,
    grass_12: tile_035,
    grass_13: tile_036,
    shallow_water_1: tile_104,
    shallow_water_2: tile_105,
    shallow_water_3: tile_106,
    shallow_water_4: tile_107,
    shallow_water_5: tile_108,
    shallow_water_6: tile_109,
    shallow_water_7: tile_110,
    shallow_water_8: tile_111,
    shallow_water_9: tile_112,
    shallow_water_10: tile_113,
    deep_water_1: tile_094,
    rocky_water_1: tile_071,
    rocky_water_2: tile_072,
    rocky_water_3: tile_073,
    rocks_1: tile_061,
    rocks_2: tile_063,
};

export const props = {
    flower_01: tile_041,
    flower_02: tile_042,
    flower_03: tile_043,
    flower_04: tile_044,
    flower_05: tile_045,
    flower_06: tile_046,
    flower_07: tile_047,
    small_rock_01: tile_064,
    small_rock_02: tile_062,
    small_rock_03: tile_067,
    small_rock_04: tile_068,
    log_01: tile_048,
    log_02: tile_049,
    log_03: tile_050,
    log_04: tile_051,
    log_05: tile_052,
};

export const textureMatcher: Record<AbstractTile, TileType[]> = {
    dirt: [
        'dirt_0',
        'dirt_1',
        'dirt_2',
        'dirt_3',
        'dirt_4',
        'dirt_5',
        'dirt_6',
        'dirt_7',
        'dirt_8',
        'dirt_9',
        'dirt_10',
    ],
    grass: [
        'grass_1',
        'grass_2',
        'grass_3',
        'grass_4',
        'grass_5',
        'grass_6',
        'grass_7',
        'grass_8',
        'grass_9',
        'grass_10',
        'grass_11',
        'grass_12',
        'grass_13',
    ],
    soil: ['soil_1', 'soil_2', 'soil_3', 'soil_4', 'soil_5'],
    selector: ['selector'],
    shallow_water: [
        'shallow_water_1',
        'shallow_water_2',
        'shallow_water_3',
        'shallow_water_4',
        'shallow_water_5',
        'shallow_water_6',
        'shallow_water_7',
        'shallow_water_8',
        'shallow_water_9',
        'shallow_water_10',
    ],
    deep_water: ['deep_water_1'],
    rocks: ['rocks_1', 'rocks_2'],
    rocky_water: ['rocky_water_1', 'rocky_water_2', 'rocky_water_3'],
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
