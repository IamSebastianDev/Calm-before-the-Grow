/** @format */

import { create } from 'zustand';
import { Quest } from './quest';
import { InitialQuest } from './quests/initial.quest';

export type QuestStore = {
    current: Quest;
    fulfilled: Quest[];
};

export const useQuestStore = create<QuestStore>()(() => ({
    current: new InitialQuest(),
    fulfilled: [],
}));
