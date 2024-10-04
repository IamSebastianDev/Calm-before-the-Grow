/** @format */

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useDevice } from '../hooks/use-device';

export class AudioController<T extends Record<string, HTMLAudioElement>> {
    constructor(public files: T) {}
    private currentSource: keyof T | null = null;
    private muted: boolean = false;

    loaded() {
        return new Promise<void>(async (resolve) => {
            const entries = Object.values(this.files).map((audio) => {
                return new Promise<void>((resolve, reject) => {
                    audio.addEventListener('canplaythrough', () => resolve());
                    audio.addEventListener('error', () => reject());
                });
            });

            await Promise.all(entries);
            resolve();
        });
    }

    getAudioByKey() {}

    play(key: keyof T, loop: boolean = false, restart: boolean = false) {
        if (this.currentSource) {
            this.stop(this.currentSource);
        }

        this.currentSource = key;
        const audio = this.files[this.currentSource];
        audio.currentTime = restart ? 0 : audio.currentTime;
        audio.loop = loop;
        audio.muted = this.muted;
        audio.play();
    }
    stop(key?: keyof T) {
        if (this.currentSource !== key || !this.currentSource) {
            return;
        }

        const audio = this.files[key ?? this.currentSource];
        audio.pause();
        audio.currentTime = 0;
        this.currentSource = null;
    }

    swap(key: keyof T) {
        if (this.currentSource) {
            this.stop();
        }

        this.play(key);
    }

    setMute(state: boolean) {
        this.muted = state;
        if (!this.currentSource) {
            return;
        }

        const audio = this.files[this.currentSource];
        audio.muted = this.muted;
    }
}

export const createAudioProvider = <T extends Record<string, HTMLAudioElement>>(files: T) => {
    const controller = new AudioController(files);

    const Ctx = createContext<AudioController<T>>(controller);

    const AudioProvider: React.FC<PropsWithChildren> = ({ children }) => {
        const [loaded, setLoaded] = useState(false);
        const device = useDevice();

        useEffect(() => {
            controller.setMute(device.isMuted);
        }, [device.isMuted]);

        useEffect(() => {
            controller.loaded().then(() => setLoaded(true));
        }, []);

        if (!loaded) {
            throw controller.loaded();
        }

        return <Ctx.Provider value={controller}>{children}</Ctx.Provider>;
    };

    const useAudio = () => {
        const ctx = useContext(Ctx);

        if (!ctx) {
            throw new ReferenceError(`[useAudio] can only be used inside a Audio Provider`);
        }

        return ctx;
    };

    return { AudioProvider, useAudio };
};
