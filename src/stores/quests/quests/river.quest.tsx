/** @format */
/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { Quest, QuestProgress } from '../quest';
import { FinalQuest } from './final.quest';

export class RiverQuest extends Quest {
    fulfilled: boolean = false;
    title = '5. River';
    text = 'A small pond or river is a great addition to any garden';

    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: `Place 20 water tiles`,
        },
    ];
    tip = `Placing water tiles on the edges of your garden will grant you new water tiles.`;

    next = () => new FinalQuest();

    reward = () => {
        addToScore(500);
    };

    calculateProgress(grid: GridStore): QuestProgress[] {
        const size = [...grid.tiles.values()].filter((entry) => entry.type === 'shallow_water').length;
        this.goals[0].progress = `Place 20 water tiles (${size}/20)`;

        if (size >= 20) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
