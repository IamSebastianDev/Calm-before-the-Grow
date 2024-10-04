/** @format */

import { useEffect, useState } from 'react';

export const useIsFullscreen = () => {
    const [isFullscreen, requestFullscreen] = useState(false);

    useEffect(() => {
        if (isFullscreen) {
            document.documentElement.requestFullscreen();
        }

        if (!isFullscreen && document.fullscreenElement) {
            document.exitFullscreen();
        }

        return () => {
            if (!isFullscreen && document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, [isFullscreen]);

    return { isFullscreen, requestFullscreen };
};
