/** @format */

import { useEffect, useRef, useState } from 'react';

export const useClock = (interval: number) => {
    const [clock, setClock] = useState(0);

    const tick = () => setClock((c) => c + 1);
    const ref = useRef<number | Timer | null>();

    useEffect(() => {
        ref.current = setInterval(() => tick(), 1000 * interval);
        return () => {
            if (ref.current) clearInterval(ref.current);
        };
    }, []);

    return clock;
};
