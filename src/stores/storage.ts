/** @format */

import { Vector2 } from 'three';
import { useGameState } from './game-state/game-state.store';
import { useGridStore } from './grid/grid.store';
import { SelectorTile, Tile } from './grid/grid.tiles';
import { Prop, usePropsStore } from './props/props.store';
import { useQuestStore } from './quests/quests.store';
import { DolmenQuest } from './quests/quests/dolmen.quest';
import { FinalQuest } from './quests/quests/final.quest';
import { FlowerQuest } from './quests/quests/flower.quest';
import { GrowthQuest } from './quests/quests/growth.quest';
import { InitialQuest } from './quests/quests/initial.quest';
import { MeadowQuest } from './quests/quests/meadow.quest';
import { RiverQuest } from './quests/quests/river.quest';
import { SwampQuest } from './quests/quests/swamp.quest';
import { useStackStore } from './stack/stack.store';

export const getQuestByKey = (key: number) => {
    const quests = [
        new InitialQuest(),
        new MeadowQuest(),
        new FlowerQuest(),
        new GrowthQuest(),
        new RiverQuest(),
        new DolmenQuest(),
        new SwampQuest(),
        new FinalQuest(),
    ];

    return {
        current: quests[key],
        fulfilled: quests.slice(0, key - 1),
    };
};
class GameStorage {
    private readonly namespace = 'cbtb';

    storeGameState() {
        const toStore = {
            score: useGameState.getState().score,
            clock: useGameState.getState().clock,
            started: useGameState.getState().started,
            offset: {
                x: useGridStore.getState().offset.x,
                y: useGridStore.getState().offset.y,
            },
            // Serialize tiles by putting them into an object
            tiles: {
                ...Object.fromEntries(
                    [...useGridStore.getState().tiles.entries()].map(([key, value]) => [
                        key,
                        {
                            position: { x: value.position.x, y: value.position.y },
                            type: value.type,
                        },
                    ]),
                ),
            },
            props: {
                ...Object.fromEntries(
                    [...usePropsStore.getState().props.entries()].map(([key, value]) => [
                        key,
                        {
                            position: { x: value.position.x, y: value.position.y },
                            type: value.type,
                            id: value.id,
                            serialId: value.serialId,
                        },
                    ]),
                ),
            },
            questIndex: useQuestStore.getState().current.key,
            stack: useStackStore.getState().tiles,
        };

        localStorage.setItem(this.namespace, JSON.stringify(toStore));
    }
    loadGameState() {
        const stored = localStorage.getItem(this.namespace);

        if (!stored) {
            return null;
        }

        const parsed = JSON.parse(stored);
        useGameState.setState({
            score: parsed.score,
            clock: parsed.clock,
            started: parsed.started,
        });

        useGridStore.setState({
            offset: new Vector2(parsed.offset.x, parsed.offset.y),
            tiles: new Map(
                Object.entries(parsed.tiles).map(([key, value]: [string, any]) => {
                    if (value.type === 'selector') {
                        return [key, new SelectorTile(new Vector2(value.position.x, value.position.y))];
                    }

                    return [key, new Tile(new Vector2(value.position.x, value.position.y), value.type)];
                }),
            ),
        });

        usePropsStore.setState({
            props: new Map(
                Object.entries(parsed.props).map(([key, value]) => {
                    ///@ts-ignore
                    return [key, new Prop(new Vector2(value.position.x, value.position.y), value.type)];
                }),
            ),
        });

        const { current, fulfilled } = getQuestByKey(parsed.questIndex);
        useQuestStore.setState({
            current,
            fulfilled,
        });

        useStackStore.setState({
            tiles: parsed.stack,
        });

        return true;
    }

    get hasStoredState() {
        return localStorage.getItem(this.namespace) !== null;
    }
}

export const gameStorage = new GameStorage();
