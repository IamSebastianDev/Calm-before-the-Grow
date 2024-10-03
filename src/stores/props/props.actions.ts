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

export const getRandomFlower = (): PropType => {
    return random(['flower_01', 'flower_02', 'flower_03']);
};
