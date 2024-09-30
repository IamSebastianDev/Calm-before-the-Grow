/** @format */

import { Tile } from '../grid/grid.tiles';
import { Prop, PropType, usePropsStore } from './props.store';

export const addProp = (type: PropType, tile: Tile) => {
    usePropsStore.setState((state) => {
        const prop = new Prop(tile.position, type);
        return { props: new Map(state.props).set(prop.serialId, prop) };
    });
};
