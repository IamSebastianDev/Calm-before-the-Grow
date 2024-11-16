/** @format */

import { addToScore } from '../../game-state/game-state.actions';
import { GridStore } from '../../grid/grid.store';
import { addTilesToStack } from '../../stack/stack.actions';
import { Quest, QuestProgress } from '../quest';
import { FlowerQuest } from './flower.quest';

export class MeadowQuest extends Quest {
    key = 2;
    fulfilled: boolean = false;
    title = '2. A Meadow';
    text = (
        <>
            Cultivate a meadow by placing <mark>grass</mark> and <mark>soil</mark> tiles to grow your island.
        </>
    );
    tip = 'Try combining tiles to receive new tiles. Soil is the darker brownish earth.';
    goals = [
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Have 5 Grass tiles',
        },
        {
            id: crypto.randomUUID(),
            fulfilled: false,
            progress: 'Have 5 Soil tiles',
        },
    ];

    next = () => new FlowerQuest();

    reward = () => {
        addToScore(60);
        addTilesToStack('shallow_water');
    };

    calculateProgress(state: GridStore): QuestProgress[] {
        const soilTiles = new Set();
        const grassTiles = new Set();

        state.tiles.forEach((tile) => {
            if (tile.type === 'grass') {
                grassTiles.add(tile);
            }

            if (tile.type === 'soil') {
                soilTiles.add(tile);
            }
        });

        if (grassTiles.size >= 5) {
            this.goals[0].fulfilled = true;
        }

        if (soilTiles.size >= 5) {
            this.goals[1].fulfilled = true;
        }

        return this.goals;
    }
}
