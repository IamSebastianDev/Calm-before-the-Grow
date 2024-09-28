/** @format */
import selector from '../assets/sprites/selector.png';
import tile_001 from '../assets/sprites/tile_001.png';
import { createAssetProvider } from '../core/asset-loader';

export const assets = {
    selector,
    dirt_1: tile_001,
};

export type AssetType = keyof typeof assets;
export const { useAssets, AssetProvider } = createAssetProvider(assets);
