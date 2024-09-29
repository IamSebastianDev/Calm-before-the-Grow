/** @format */

import { useMemo } from 'react';
import { random } from '../functions/random';
import { useAssets } from '../providers/asset.provider';
import { AbstractTile, TileType } from '../stores/grid/grid.tiles';

const textureMatcher: Record<AbstractTile, TileType[]> = {
    dirt: ['dirt_1'],
    grass: ['grass_1'],
    soil: ['soil_1'],
    selector: ['selector'],
    shallow_water: ['shallow_water_1'],
    rocks: ['rocks_1'],
};

export const useMatchAbstractToTexture = (abstract: AbstractTile) => {
    const assets = useAssets();
    const texture = useMemo(() => {
        const key = random(textureMatcher[abstract]);
        return assets[key];
    }, [abstract, assets]);

    return texture;
};
