/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { PropsStore } from '../../props/props.store';
import { addTilesToStack } from '../../stack/stack.actions';
import { Quest, QuestProgress } from '../quest';
import { GrowthQuest } from './growth.quest';

export class FlowerQuest extends Quest {
    key = 3;
    fulfilled: boolean = false;
    title = '3. Colorful Combinations';
    text = (
        <>
            Your meadow looks empty. Grow some flowers by placing <mark>water</mark> or <mark>grass</mark> on{' '}
            <mark>grass</mark>.
        </>
    );
    tip = `You can create water by adding soil to earth.`;
    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Grow 3 flowers',
        },
    ];

    next = () => new GrowthQuest();

    reward = () => {
        addToScore(120);
        addTilesToStack('rocks', 'rocks');
    };

    calculateProgress(_: GridStore, props: PropsStore): QuestProgress[] {
        const flowers = [...props.props.values()].filter((prop) => prop.type.startsWith('flower'));

        if (flowers.length >= 3) {
            this.goals[0].fulfilled = true;
        }

        return this.goals;
    }
}
