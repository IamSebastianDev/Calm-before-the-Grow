/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { upgradeActions } from '../../grid/grid.utils';
import { Quest, QuestProgress } from '../quest';
import { SwampQuest } from './swamp.quest';

export class DolmenQuest extends Quest {
    key = 6;
    fulfilled: boolean = false;
    title = '6. A Place to rest';
    text = (
        <>
            Build a place of eternal rest by placing <mark>Grass</mark> in a 3 x 3 area and then place <mark>Rock</mark>{' '}
            in the center
        </>
    );

    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: `Build a Dolmen`,
        },
    ];
    tip = undefined;

    next = () => new SwampQuest();

    reward = () => {
        addToScore(500);
    };

    calculateProgress(): QuestProgress[] {
        if (upgradeActions.matchedPatterns.has('Dolmen')) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
