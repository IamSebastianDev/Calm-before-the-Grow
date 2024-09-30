/** @format */

import { Tile } from '../stores/grid/grid.tiles';
import { upgradeActions } from '../stores/grid/grid.utils';
import { useNextTile } from '../stores/stack/stack.store';
import { useShowHighlight } from './use-show-highlight';

export const useHighlightHint = (tile: Tile) => {
    const nextTile = useNextTile();
    const showHighlight = useShowHighlight() && nextTile;
    const nextAction = nextTile ? upgradeActions.getTileUpgradeAction(tile.type, nextTile) : null;
    const hint = nextAction ? nextAction[0].hint : null;

    return { showHighlight, hint };
};
