/** @format */

import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
    resetGridOffset,
} from '../stores/grid/grid.actions';
import { useGridStore } from '../stores/grid/grid.store';

export const TouchControls = () => {
    const grid = useGridStore();
    const isOffset = Math.max(grid.offset.x, grid.offset.y) > 5 || Math.min(grid.offset.x, grid.offset.y) < -5;

    return (
        <>
            <button className={`reset-to-center ${!isOffset ? 'hidden' : ''}`} onPointerDown={() => resetGridOffset()}>
                Return to ORIGIN
            </button>
            <div className="mobile-controller">
                <button className="up" onClick={() => moveGridOffsetUp(0.5)}>
                    △
                </button>
                <button className="down" onClick={() => moveGridOffsetDown(0.5)}>
                    △
                </button>
                <button className="left" onClick={() => moveGridOffsetLeft(0.5)}>
                    △
                </button>
                <button className="right" onClick={() => moveGridOffsetRight(0.5)}>
                    △
                </button>
            </div>
        </>
    );
};
