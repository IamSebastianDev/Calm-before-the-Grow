/** @format */

import { useAssets } from '../providers/asset.provider';
import { useGameState } from '../stores/game-state/game-state.store';

export type ScoreRowProps = {
    assets: ReturnType<typeof useAssets>;
    onMenuClick: () => void;
    onHelpClick: () => void;
};
export const ScoreRow = ({ assets, onMenuClick, onHelpClick }: ScoreRowProps) => {
    const score = useGameState((state) => state.score);

    return (
        <div className="overlay-button-container">
            <span>{score.toString().padStart(6, '0')}</span>
            <button className="overlay-button" onClick={() => onMenuClick()}>
                <img src={assets.menu.image.src} />
            </button>
            <button className="overlay-button" onClick={() => onHelpClick()}>
                <img src={assets.question.image.src} />
            </button>
        </div>
    );
};
