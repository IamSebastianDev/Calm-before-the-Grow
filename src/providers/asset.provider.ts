/** @format */
import tile_001 from '../assets/sprites/tile_001.png';
import menu from '../assets/sprites/ui/menu.png';
import selector from '../assets/sprites/ui/selector.png';
import { createAssetProvider } from '../core/asset-loader';

export const assets = {
    selector,
    menu,
    dirt_1: tile_001,
};

export type AssetType = keyof typeof assets;
export const { useAssets, AssetProvider } = createAssetProvider(assets);
