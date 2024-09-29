/** @format */

import { useIsCoarsePointer } from './use-is-coarse-pointer';

export const useDevice = () => {
    return {
        isMobile: useIsCoarsePointer(),
    };
};
