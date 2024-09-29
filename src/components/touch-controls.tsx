/** @format */

import { useAssets } from '../providers/asset.provider';
import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
} from '../stores/grid/grid.actions';

export type TouchControlsProps = {
    assets: ReturnType<typeof useAssets>;
};
export const TouchControls = ({ assets }: TouchControlsProps) => {
    return (
        <div className="mobile-controller">
            <button className="up" onClick={() => moveGridOffsetUp(0.5)}>
                <img src={assets.chevron.image.src} />
            </button>
            <button className="down" onClick={() => moveGridOffsetDown(0.5)}>
                <img src={assets.chevron.image.src} />
            </button>
            <button className="left" onClick={() => moveGridOffsetLeft(0.5)}>
                <img src={assets.chevron.image.src} />
            </button>
            <button className="right" onClick={() => moveGridOffsetRight(0.5)}>
                <img src={assets.chevron.image.src} />
            </button>
        </div>
    );
};
