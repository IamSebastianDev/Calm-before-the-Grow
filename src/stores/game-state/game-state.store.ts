/** @format */

import { create } from 'zustand';

export type GameState = {
    score: number;
};

export const useGameState = create<GameState>()(() => ({
    score: 0,
}));
