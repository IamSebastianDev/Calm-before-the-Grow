/** @format */

import { useMemo } from 'react';
import { random } from '../functions/random';
import { textureMatcher, useAssets } from '../providers/asset.provider';
import { AbstractTile } from '../stores/grid/grid.tiles';

export const useMatchAbstractToTexture = (abstract: AbstractTile) => {
    const assets = useAssets();
    return useMemo(() => {
        const key = random(textureMatcher[abstract]);
        return assets[key];
    }, [abstract, assets]);
};
