/** @format */

import { useMemo } from 'react';
import { useAssets } from '../providers/asset.provider';
import { AbstractTile, TileType } from '../stores/grid/grid.tiles';

const textureMatcher: Record<AbstractTile, TileType[]> = {
    dirt: ['dirt_1'],
    grass: ['grass_1'],
    selector: ['selector'],
};

const getRandomTextureTypeFromMatcher = (abstract: AbstractTile) => {
    const textureKeys = textureMatcher[abstract];

    return textureKeys[Math.floor(Math.random() * textureKeys.length) * 1];
};

export const useMatchAbstractToTexture = (abstract: AbstractTile) => {
    const assets = useAssets();
    const texture = useMemo(() => {
        const key = getRandomTextureTypeFromMatcher(abstract);
        return assets[key];
    }, [abstract, assets]);

    return texture;
};
