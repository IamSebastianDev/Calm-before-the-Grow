/** @format */

import { UpgradeActionStateMachineEntry } from '../stores/grid/grid.utils';

export const sortByScore = <T extends UpgradeActionStateMachineEntry>(a: T, b: T) =>
    (a.score ?? 0) > (b.score ?? 0) ? 1 : -1;
