/** @format */

import { createControllerProvider } from '../core/controller';

export const { useController, ControllerProvider } = createControllerProvider(
    ['PAN_LEFT', 'PAN_RIGHT', 'PAN_UP', 'PAN_DOWN', 'HIGHLIGHT'] as const,
    {
        PAN_LEFT: ['a', 'A', 'ArrowLeft'],
        PAN_RIGHT: ['d', 'D', 'ArrowRight'],
        PAN_UP: ['w', 'W', 'ArrowUp'],
        PAN_DOWN: ['s', 'S', 'ArrowDown'],
        HIGHLIGHT: ['T', 't'],
    },
);
