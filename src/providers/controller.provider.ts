/** @format */

import { createControllerProvider } from '../core/controller';

export const { useController, ControllerProvider } = createControllerProvider(
    ['PAN_LEFT', 'PAN_RIGHT', 'PAN_UP', 'PAN_DOWN'] as const,
    {
        PAN_LEFT: ['a', 'A', 'LeftArrow'],
        PAN_RIGHT: ['d', 'D', 'RightArrow'],
        PAN_UP: ['w', 'W', 'UpArrow'],
        PAN_DOWN: ['s', 'S', 'DownArrow'],
    },
);
