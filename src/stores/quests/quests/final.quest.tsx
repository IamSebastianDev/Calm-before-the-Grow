/** @format */

import { Quest, QuestProgress } from '../quest';

export class FinalQuest extends Quest {
    fulfilled: boolean = false;
    title = 'Finally. The Grow';
    text = 'Keep growing your Island as much as you like.';
    goals = [];
    tip?: string | undefined;

    next = () => ({}) as unknown as Quest;

    reward = () => {};

    calculateProgress(): QuestProgress[] {
        return this.goals;
    }
}
