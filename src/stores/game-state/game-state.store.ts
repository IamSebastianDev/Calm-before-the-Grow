/** @format */

import { create } from 'zustand';

export type GameState = {
    score: number;
    clock: number;
    started: boolean;
};

export const useGameState = create<GameState>()(() => ({
    score: 0,
    clock: 0,
    started: false,
}));
