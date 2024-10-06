/** @format */

import { GridStore } from '../../grid/grid.store';
import { upgradeActions } from '../../grid/grid.utils';
import { Quest, QuestProgress } from '../quest';

export class FinalQuest extends Quest {
    fulfilled: boolean = false;
    title = '8. The eternal growth';
    text =
        'There are many more patterns and combinations to be found. Keep placing and growing your garden, to bring a wonderful world to life.';
    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Grow your garden indefinitely.',
        },
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Patterns found: ',
        },
    ];
    tip?: string | undefined;

    next = () => ({}) as unknown as Quest;

    reward = () => {};

    calculateProgress(state: GridStore): QuestProgress[] {
        const tiles = state.tiles.size;
        const patterns = upgradeActions.matchedPatterns.size;
        this.goals[0].progress = `Grow your garden indefinitely. (${tiles}/∞)`;
        this.goals[1].progress = `Find more patterns. (${patterns}/8)`;

        return this.goals;
    }
}
