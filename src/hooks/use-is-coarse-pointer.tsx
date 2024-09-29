/** @format */

import { useEffect, useState } from 'react';

export const useIsCoarsePointer = () => {
    // State to track if the user is on a mobile device
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Media query that checks if the user has a coarse pointer (typical for mobile devices)
        const mediaQuery = window.matchMedia('(pointer: coarse)');

        // Set initial state
        setIsMobile(mediaQuery.matches);

        // Listener for changes in the media query
        const handleMediaChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Attach the listener
        mediaQuery.addEventListener('change', handleMediaChange);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

    return isMobile;
};
