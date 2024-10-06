/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { upgradeActions } from '../../grid/grid.utils';
import { Quest, QuestProgress } from '../quest';
import { FinalQuest } from './final.quest';

export class SwampQuest extends Quest {
    fulfilled: boolean = false;
    title = '7. When decay leads to new life';
    text = (
        <>
            A swamp is not a desolate place, but a place of life and new growth. To create one, place 3{' '}
            <mark>Shallow Water</mark> in a line with <mark>Soil</mark> to either side. Then place a single water tile
            in the center.
        </>
    );

    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: `Create a Swamp`,
        },
    ];
    tip = undefined;

    next = () => new FinalQuest();

    reward = () => {
        addToScore(500);
    };

    calculateProgress(): QuestProgress[] {
        if (upgradeActions.matchedPatterns.has('Swamp East') || upgradeActions.matchedPatterns.has('Swamp North')) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
