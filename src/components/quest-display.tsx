/** @format */

import { useState } from 'react';
import { useControllerAction } from '../core/controller';
import { useController } from '../providers/controller.provider';
import { Quest } from '../stores/quests/quest';
import { useQuestStore } from '../stores/quests/quests.store';

type QuestEntryProps = {
    quest: Quest;
};

const QuestEntry = ({ quest }: QuestEntryProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const controller = useController();
    useControllerAction(controller, 'JOURNAL', () => setIsOpen((c) => !c));

    return (
        <div className={`quest-entry ${quest.fulfilled ? 'fulfilled' : ''}`} key={quest.id}>
            <button className="quest-title" onClick={() => setIsOpen((c) => !c)}>
                {quest.title} <div className="show-quest-content-btn">{!isOpen ? '◎' : '◉'}</div>
            </button>
            {isOpen && (
                <div className="quest-content">
                    <div className="quest-text">{quest.text}</div>
                    {quest.goals.length > 0 && (
                        <ul className="quest-list">
                            {...quest.goals.map((goal, idx) => (
                                <li className="quest-goal" key={idx}>
                                    <div>{goal.progress}</div>
                                    <div>{goal.fulfilled ? '◆' : '◇'}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {quest.tip && <div className="quest-tip">Tip: {quest.tip}</div>}
                </div>
            )}
        </div>
    );
};

export const QuestDisplay = () => {
    const quest = useQuestStore();

    return (
        <div className="quest-overlay">
            {/* Current quest */}
            <QuestEntry quest={quest.current} />
        </div>
    );
};
