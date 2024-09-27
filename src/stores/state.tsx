/** @format */

import { createContext, PropsWithChildren, useContext } from 'react';

export type State = {};

const initialState: State = {};

export const GameContext = createContext<State>(initialState);

export const GameStateProvider = ({ children }: PropsWithChildren) => {
    const state: State = {};

    return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

export const useGameState = () => {
    const ctx = useContext(GameContext);
    if (!ctx) {
        throw new ReferenceError(`[useGameState] is only available inside the GameStateProvider `);
    }

    return ctx;
};
