/** @format */

import { useState } from 'react';
import { useIsCoarsePointer } from './use-is-coarse-pointer';
import { useIsFullscreen } from './use-is-fullscreen';
import useIsLandscape from './use-is-landscape';

export const useDevice = () => {
    const { isFullscreen, requestFullscreen } = useIsFullscreen();
    const [isMuted, setIsMuted] = useState(false);

    return {
        isMobile: useIsCoarsePointer(),
        isLandscape: useIsLandscape(),
        isFullscreen,
        isMuted,
        requestFullscreen,
        requestMute: (state: boolean) => setIsMuted(state),
    };
};
