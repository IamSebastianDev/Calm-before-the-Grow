/** @format */

import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useIsFullscreen } from '../hooks/use-is-fullscreen';

type SettingsProvider = {
    isMuted: boolean;
    setMuted: (state: boolean) => void;
    isFullscreen: boolean;
    requestFullscreen: (state: boolean) => void;
};

const SettingsCtx = createContext<SettingsProvider | null>(null);
export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const { isFullscreen, requestFullscreen } = useIsFullscreen();
    const [isMuted, setMuted] = useState(false);

    return (
        <SettingsCtx.Provider value={{ isFullscreen, isMuted, requestFullscreen, setMuted }}>
            {children}
        </SettingsCtx.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsCtx);

    if (!ctx) {
        throw new ReferenceError(`[useSettings] can only be used inside a SettingsProvider`);
    }

    return ctx;
};
