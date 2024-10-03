/** @format */

import { useGridStore } from '../grid/grid.store';
import { usePropsStore } from '../props/props.store';
import { Quest } from './quest';
import { useQuestStore } from './quests.store';

// class FlowerbedQuest extends Quest {
//     fulfilled: boolean = false;
//     text = 'Create a Flowerbed by placing 4 flowers in a 2 x 2 square';
//     progress = 'Place 5 of 5 flowers';

//     reward = () => {
//         addToScore(25);
//         addTilesToStack('grass', 'grass', 'soil', 'soil');
//     };

//     calculateProgress(state: GridStore, props: PropsStore): QuestProgress {
//         console.log({ state, props });
//         return {
//             fulfilled: false,
//             progress: 'Place 5 of 5 flowers',
//         };
//     }
// }

export const checkForQuestProgress = () => {
    const grid = useGridStore.getState();
    const props = usePropsStore.getState();
    useQuestStore.getState().current.checkProgress(grid, props);
};

export const completeQuest = (quest: Quest) => {
    useQuestStore.setState((state) => {
        return { current: quest.next(), fulfilled: [...state.fulfilled, quest] };
    });
};
