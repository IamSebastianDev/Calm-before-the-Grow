/** @format */
import tile_001 from '../assets/sprites/tile_001.png';
import menu from '../assets/sprites/ui/menu.png';
import outline from '../assets/sprites/ui/outline.png';
import selector from '../assets/sprites/ui/selector.png';
import { createAssetProvider } from '../core/asset-loader';

export const tiles = {
    selector,
    dirt_1: tile_001,
};

export const assets = {
    menu,
    outline,
};

export type AssetType = keyof typeof tiles;
export const { useAssets, AssetProvider } = createAssetProvider({ ...assets, ...tiles });
