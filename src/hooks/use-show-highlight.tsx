/** @format */

import { useEffect, useState } from 'react';
import { useControllerAction } from '../core/controller';
import { useController } from '../providers/controller.provider';

export const useShowHighlight = () => {
    const [showHighlight, setShowHighlight] = useState(false);
    const controller = useController();
    useControllerAction(
        controller,
        'HIGHLIGHT',
        () => setShowHighlight(true),
        () => setShowHighlight(false),
    );

    useEffect(() => {
        const handler = () => setShowHighlight(false);
        window.addEventListener('blur', handler);
        return () => window.removeEventListener('blur', handler);
    }, []);

    return showHighlight;
};
