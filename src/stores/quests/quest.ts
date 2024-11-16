/** @format */

import { GridStore } from '../grid/grid.store';
import { PropsStore } from '../props/props.store';
import { completeQuest } from './quests.action';

export type QuestProgress = {
    id: string;
    fulfilled: boolean;
    progress: string;
};

export abstract class Quest {
    abstract key: number;
    readonly id = crypto.randomUUID();
    abstract fulfilled: boolean;
    abstract goals: QuestProgress[];
    abstract title: string;
    abstract text: string | JSX.Element;
    abstract tip?: string;

    abstract next: () => Quest;

    protected abstract calculateProgress(state: GridStore, props: PropsStore): QuestProgress[];
    abstract reward: () => void;

    checkProgress(state: GridStore, props: PropsStore) {
        if (this.fulfilled) return;

        // Check progress of the quest
        const result = this.calculateProgress(state, props);

        if (result.length > 0 && result.every((entry) => entry.fulfilled)) {
            this.reward();
            this.fulfilled = true;
            return completeQuest(this);
        }

        // Update quest progress
        // this.progress = result.progress;
        return false;
    }
}
