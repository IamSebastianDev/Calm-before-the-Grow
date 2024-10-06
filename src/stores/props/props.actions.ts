/** @format */

import { random } from '../../functions/random';
import { Tile } from '../grid/grid.tiles';
import { checkForQuestProgress } from '../quests/quests.action';
import { Prop, PropType, usePropsStore } from './props.store';

export const addProp = (type: PropType, tile: Tile) => {
    usePropsStore.setState((state) => {
        const prop = new Prop(tile.position, type);
        return { props: new Map(state.props).set(prop.serialId, prop) };
    });

    checkForQuestProgress();
};

export const getRandomRock = (): PropType => {
    return random(['small_rock_01', 'small_rock_02', 'small_rock_03', 'small_rock_04']);
};

export const getRandomFlower = (): PropType => {
    return random(['flower_01', 'flower_02', 'flower_03', 'flower_04', 'flower_05', 'flower_06', 'flower_07']);
};

export const getRandomLog = (): PropType => {
    return random(['log_01', 'log_02', 'log_03', 'log_04', 'log_05']);
};
