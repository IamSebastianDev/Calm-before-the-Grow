/** @format */

import { useEffect, useState } from 'react';

const useIsLandscape = (): boolean => {
    // State to track if the device aspect ratio is greater than 1 (landscape)
    const [isLandscape, setIsLandscape] = useState<boolean>(false);

    useEffect(() => {
        // Media query that checks if the aspect ratio is greater than 1/1
        const mediaQuery = window.matchMedia('(min-aspect-ratio: 1/1)');

        // Set initial state
        setIsLandscape(mediaQuery.matches);

        // Listener for changes in the media query
        const handleMediaChange = (event: MediaQueryListEvent) => {
            setIsLandscape(event.matches);
        };

        // Attach the listener
        mediaQuery.addEventListener('change', handleMediaChange);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

    return isLandscape;
};

export default useIsLandscape;
