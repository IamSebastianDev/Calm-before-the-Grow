/** @format */

import { useGridStore } from '../grid/grid.store';
import { usePropsStore } from '../props/props.store';
import { Quest } from './quest';
import { useQuestStore } from './quests.store';

export const checkForQuestProgress = () => {
    const grid = useGridStore.getState();
    const props = usePropsStore.getState();
    useQuestStore.getState().current.checkProgress(grid, props);
};

export const completeQuest = (quest: Quest) => {
    useQuestStore.setState((state) => {
        if (quest.next()) {
            return { current: quest.next(), fulfilled: [...state.fulfilled, quest] };
        }
        return state;
    });
};
