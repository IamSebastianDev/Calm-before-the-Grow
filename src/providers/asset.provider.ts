/** @format */
import tile_001 from '../assets/sprites/tile_001.png';
import tile_002 from '../assets/sprites/tile_002.png';
import tile_017 from '../assets/sprites/tile_017.png';
import tile_022 from '../assets/sprites/tile_022.png';
import tile_061 from '../assets/sprites/tile_061.png';
import tile_104 from '../assets/sprites/tile_104.png';
import menu from '../assets/sprites/ui/menu.png';
import outline from '../assets/sprites/ui/outline.png';
import selector from '../assets/sprites/ui/selector.png';
import { createAssetProvider } from '../core/asset-loader';

export const tiles = {
    selector,
    dirt_1: tile_001,
    dirt_2: tile_002,
    soil_1: tile_017,
    grass_1: tile_022,
    shallow_water_1: tile_104,
    rocks_1: tile_061,
};

export const assets = {
    menu,
    outline,
};

export type AssetType = keyof typeof tiles;
export const { useAssets, AssetProvider } = createAssetProvider({ ...assets, ...tiles });
