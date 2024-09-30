/** @format */

import { Tile } from '../stores/grid/grid.tiles';
import { Prop } from '../stores/props/props.store';

export const sortByYIndex = <T extends Tile | Prop>(a: T, b: T) => (a.position.y < b.position.y ? 1 : -1);
