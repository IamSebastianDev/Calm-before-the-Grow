/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { addTilesToStack } from '../../stack/stack.actions';
import { Quest, QuestProgress } from '../quest';
import { MeadowQuest } from './meadow.quest';

export class InitialQuest extends Quest {
    fulfilled: boolean = false;
    title = '1. The calm.';
    text = 'Place your first tile by clicking the tile in the center of the screen.';
    tip?: string | undefined;
    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Place your first tile.',
        },
    ];

    next = () => new MeadowQuest();

    reward = () => {
        addToScore(25);
        addTilesToStack('grass', 'grass', 'soil', 'soil');
    };

    calculateProgress(state: GridStore): QuestProgress[] {
        // To check progress here, all we have to do is check if
        // there are more then one tile.
        if (state.tiles.size > 1) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
