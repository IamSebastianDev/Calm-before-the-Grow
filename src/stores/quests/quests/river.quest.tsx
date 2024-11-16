/** @format */
/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { Quest, QuestProgress } from '../quest';
import { DolmenQuest } from './dolmen.quest';

export class RiverQuest extends Quest {
    key = 5;
    fulfilled: boolean = false;
    title = '5. A place to cool down';
    text = 'A small pond or river is a great place to cool your feet or have a sip of water to drink.';

    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: `Place 20 or more shallow water tiles`,
        },
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: `Have 3 or more deep water tiles`,
        },
    ];
    tip = `Placing water tiles on the edges of your garden will grant you new water tiles. A bigger body of water will be deeper.`;

    next = () => new DolmenQuest();

    reward = () => {
        addToScore(500);
    };

    calculateProgress(grid: GridStore): QuestProgress[] {
        const shallow = [...grid.tiles.values()].filter((entry) => entry.type === 'shallow_water').length;
        const deep = [...grid.tiles.values()].filter((entry) => entry.type === 'deep_water').length;
        this.goals[0].progress = `Place 20 water tiles (${shallow}/20)`;
        this.goals[1].progress = `Have 3 or more deep water tiles (${deep}/3)`;

        if (shallow >= 20) {
            this.goals[0].fulfilled = true;
        }

        if (deep >= 3) {
            this.goals[1].fulfilled = true;
        }

        return this.goals;
    }
}
