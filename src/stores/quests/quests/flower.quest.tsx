/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { PropsStore } from '../../props/props.store';
import { addTilesToStack } from '../../stack/stack.actions';
import { Quest, QuestProgress } from '../quest';
import { FinalQuest } from './final.quest';

export class FlowerQuest extends Quest {
    fulfilled: boolean = false;
    title = '3. Flowers';
    text = (
        <>
            Your meadow looks empty. Grow some flowers by combining <mark>water</mark> or <mark>grass</mark> with{' '}
            <mark>grass</mark>.
        </>
    );
    tip = `You can create water by adding soil to earth.`;
    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Grow 2 flowers',
        },
    ];

    next = () => new FinalQuest();

    reward = () => {
        addToScore(120);
        addTilesToStack('rocks', 'rocks');
    };

    calculateProgress(state: GridStore, props: PropsStore): QuestProgress[] {
        const flowers = [...props.props.values()].filter((prop) => prop.type.startsWith('flower'));

        if (flowers.length >= 2) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
