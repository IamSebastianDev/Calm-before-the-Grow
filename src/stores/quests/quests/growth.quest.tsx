/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { addTilesToStack } from '../../stack/stack.actions';
import { Quest, QuestProgress } from '../quest';
import { RiverQuest } from './river.quest';

export class GrowthQuest extends Quest {
    fulfilled: boolean = false;
    title = '4. Everything should grow';
    text = 'Grow your garden by combining tiles to gain new tiles.';

    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: `Place 100 tiles (0/100)`,
        },
    ];
    tip = `Try combining different tiles to see their effects.`;

    next = () => new RiverQuest();

    reward = () => {
        addToScore(250);
        addTilesToStack('shallow_water', 'shallow_water', 'shallow_water', 'shallow_water');
    };

    calculateProgress(grid: GridStore): QuestProgress[] {
        const size = grid.tiles.size;
        this.goals[0].progress = `Place 100 tiles (${size}/100)`;

        if (size >= 100) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
