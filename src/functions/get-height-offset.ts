/** @format */

import { Vector2 } from 'three';
import { AbstractTile } from '../stores/grid/grid.tiles';

// Array of predefined height values
const heightValues: number[] = [0.1, 0.2, 0.3, 0.4, 0.5];

// A simple hash function to hash x, y coordinates
const simpleHash = ({ x, y }: Vector2): number => {
    // Combine x and y uniquely into a string
    const str = `${x},${y}`;
    // Create a simple hash from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};

// Function to get a height offset for a given position
export const getHeightOffset = (position: Vector2, type?: AbstractTile): number => {
    if (type && (type.endsWith('water') || type === 'selector')) {
        return 0.1;
    }

    // Get a hash based on the position coordinates
    const hash = simpleHash(position);
    // Convert the hash to a non-negative index within the heightValues array
    const index = Math.abs(hash) % heightValues.length;
    // Return the height value corresponding to the calculated index
    return heightValues[index];
};
