/** @format */

import { GridStore } from '../grid/grid.store';

export type Quest = {
    text: string;
    condition: (state: GridStore) => { fulfilled: boolean; progress: string };
    reward: (state: GridStore) => GridStore;
    fulfilled: boolean;
};
