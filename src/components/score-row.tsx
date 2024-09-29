/** @format */

import { useAssets } from '../providers/asset.provider';
import { useGameState } from '../stores/game-state/game-state.store';

export type ScoreRowProps = {
    assets: ReturnType<typeof useAssets>;
    onMenuClick: () => void;
};
export const ScoreRow = ({ assets, onMenuClick }: ScoreRowProps) => {
    const score = useGameState((state) => state.score);

    return (
        <div className="overlay-button-container">
            <span>{score.toString().padStart(6, '0')}</span>
            <button className="overlay-button" onClick={() => onMenuClick()}>
                <img src={assets.menu.image.src} />
            </button>
        </div>
    );
};
