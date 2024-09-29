/** @format */

import { useIsCoarsePointer } from './use-is-coarse-pointer';
import useIsLandscape from './use-is-landscape';

export const useDevice = () => {
    return {
        isMobile: useIsCoarsePointer(),
        isLandscape: useIsLandscape(),
    };
};
