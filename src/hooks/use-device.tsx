/** @format */

import { useIsCoarsePointer } from './use-is-coarse-pointer';
import { useIsFullscreen } from './use-is-fullscreen';
import useIsLandscape from './use-is-landscape';

export const useDevice = () => {
    const { isFullscreen, requestFullscreen } = useIsFullscreen();

    return {
        isMobile: useIsCoarsePointer(),
        isLandscape: useIsLandscape(),
        isFullscreen,
        requestFullscreen,
    };
};
