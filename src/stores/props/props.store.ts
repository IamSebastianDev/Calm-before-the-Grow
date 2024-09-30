/** @format */

import { Vector2 } from 'three';
import { create } from 'zustand';
import { sortByYIndex } from '../../functions/sort-by-y-index';
import { props } from '../../providers/asset.provider';

export type PropType = keyof typeof props;
export class Prop {
    public id = crypto.randomUUID();

    get serialId() {
        return `${this.position.x}:${this.position.y}`;
    }
    constructor(
        public position: Vector2,
        public type: PropType,
    ) {}
}
export type PropsStore = { props: Map<string, Prop> };
export const usePropsStore = create<PropsStore>()(() => ({
    props: new Map<string, Prop>(),
}));

export const usePropList = () => {
    const props = usePropsStore();
    return [...props.props.values()].sort(sortByYIndex);
};

usePropsStore.subscribe((state) => console.log({ props: state }));
