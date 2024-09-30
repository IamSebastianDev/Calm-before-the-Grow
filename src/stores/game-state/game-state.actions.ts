/** @format */

import { Vector2 } from 'three';
import { useGridStore } from '../grid/grid.store';
import { SelectorTile } from '../grid/grid.tiles';
import { usePropsStore } from '../props/props.store';
import { useStackStore } from '../stack/stack.store';
import { useGameState } from './game-state.store';

export const startGame = () => {
    useGameState.setState(() => ({ score: 0 }));
    useStackStore.setState(() => ({
        tiles: ['grass', 'dirt', 'grass', 'soil', 'soil', 'shallow_water'],
    }));
    useGridStore.setState(() => ({
        tiles: new Map([['0:0', new SelectorTile(new Vector2(0, 0))]]),
        offset: new Vector2(0, 0),
    }));
    usePropsStore.setState(() => ({ props: new Map() }));
};

export const addToScore = (amount = 0) => {
    useGameState.setState((state) => ({ score: state.score + amount }));
};

let timerId: Timer | number | null = null;
export const startClock = () => {
    if (timerId !== null) {
        clearInterval(timerId);
    }

    timerId = setInterval(() => {
        useGameState.setState((state) => ({ clock: state.clock + 1 }));
    }, 500);
};

export const stopClock = () => {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
};
