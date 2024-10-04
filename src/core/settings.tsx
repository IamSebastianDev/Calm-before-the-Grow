/** @format */

import { createContext, PropsWithChildren, useContext } from 'react';
import { useDevice } from '../hooks/use-device';

type SettingsProvider = {
    isMuted: boolean;
    setMuted: (state: boolean) => void;
    isFullscreen: boolean;
    requestFullscreen: (state: boolean) => void;
};

const SettingsCtx = createContext<SettingsProvider | null>(null);
export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const { isFullscreen, isMuted, requestFullscreen, requestMute } = useDevice();

    return (
        <SettingsCtx.Provider value={{ isFullscreen, isMuted, requestFullscreen, setMuted: requestMute }}>
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
