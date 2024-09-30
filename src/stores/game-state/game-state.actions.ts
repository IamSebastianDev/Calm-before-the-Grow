/** @format */

import { Vector2 } from 'three';
import { useGridStore } from '../grid/grid.store';
import { SelectorTile } from '../grid/grid.tiles';
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
};

export const addToScore = (amount = 0) => {
    console.log({ Scored: amount });
    useGameState.setState((state) => ({ score: state.score + amount }));
};
