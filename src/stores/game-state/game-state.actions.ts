/** @format */

import { Vector2 } from 'three';
import { useGridStore } from '../grid/grid.store';
import { SelectorTile } from '../grid/grid.tiles';
import { usePropsStore } from '../props/props.store';
import { useQuestStore } from '../quests/quests.store';
import { InitialQuest } from '../quests/quests/initial.quest';
import { useStackStore } from '../stack/stack.store';
import { useGameState } from './game-state.store';

export const startGame = () => {
    useGameState.setState(() => ({ score: 0, started: true }));
    useStackStore.setState(() => ({
        tiles: ['dirt'],
    }));
    useGridStore.setState(() => ({
        tiles: new Map([['0:0', new SelectorTile(new Vector2(0, 0))]]),
        offset: new Vector2(0, 0),
    }));
    usePropsStore.setState(() => ({ props: new Map() }));
    useQuestStore.setState(() => ({ current: new InitialQuest(), fulfilled: [] }));
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
