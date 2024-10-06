/** @format */

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useSettings } from './settings';

export class AudioController<T extends Record<string, HTMLAudioElement>> {
    constructor(public files: T) {}
    private currentSource: keyof T | null = null;
    private muted: boolean = false;

    loaded() {
        return new Promise<void>((resolve) => {
            const entries = Object.values(this.files).map((audio) => {
                return new Promise<void>((resolve, reject) => {
                    audio.addEventListener('canplaythrough', () => resolve());
                    audio.addEventListener('error', () => reject());
                });
            });

            Promise.all(entries).then(() => resolve());
        });
    }

    getAudioByKey() {}

    async play(key: keyof T, loop: boolean = false, restart: boolean = false) {
        if (this.currentSource) {
            this.stop(this.currentSource);
        }

        return new Promise<void>((resolve) => {
            this.currentSource = key;
            const audio = this.files[this.currentSource];
            audio.currentTime = restart ? 0 : audio.currentTime;
            audio.loop = loop;
            audio.muted = this.muted;
            audio.play();
            audio.addEventListener('ended', () => resolve());
        });
    }
    async stop(key?: keyof T, duration: number = 500) {
        if (!this.currentSource) {
            return;
        }

        const audio = this.files[key ?? this.currentSource];
        await this.fadeOut(audio, duration);

        audio.pause();
        audio.volume = 1; // Reset volume back to 1 for future plays
        audio.currentTime = 0;

        this.currentSource = null;
    }

    private fadeOut(audio: HTMLAudioElement, duration = 500) {
        const fadeOutStep = 50; // 50ms per step for smoother fadeout
        const fadeOutInterval = duration / fadeOutStep; // Number of steps needed
        const volumeDecrement = audio.volume / fadeOutInterval; // How much volume to decrease per step
        return new Promise<void>((resolve) => {
            const fadeInterval = setInterval(() => {
                if (audio.volume > 0) {
                    audio.volume = Math.max(0, audio.volume - volumeDecrement);
                } else {
                    clearInterval(fadeInterval);
                    resolve();
                }
            }, fadeOutStep);
        });
    }

    async swap(key: keyof T) {
        if (this.currentSource) {
            await this.stop();
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

    async trigger(key: keyof T) {
        if (this.muted) {
            return;
        }

        return new Promise<void>((resolve) => {
            const audio = this.files[key];
            audio.currentTime = 0;
            audio.muted = this.muted;
            audio.play();
            audio.addEventListener('ended', () => resolve());
        });
    }

    createPlaylist(keys: readonly (keyof T)[]) {
        let currentIndex = 0;

        const play = async (key: keyof T) => {
            return await this.play(key);
        };

        const stop = async () => {
            return await this.stop();
        };

        const next = async () => {
            const key = keys[currentIndex % keys.length];
            await play(key);
            // once the song has ended, advance to the next song
            currentIndex += 1;
            next();
        };

        const start = () => next();

        return { start, stop, next };
    }
}

export const createAudioProvider = <T extends Record<string, HTMLAudioElement>>(files: T) => {
    const controller = new AudioController(files);

    const Ctx = createContext<AudioController<T> | null>(null);

    const AudioProvider: React.FC<PropsWithChildren> = ({ children }) => {
        const [loading, setLoading] = useState(true);
        const settings = useSettings();

        useEffect(() => {
            controller.setMute(settings.isMuted);
        }, [settings.isMuted]);

        if (!loading) {
            throw controller.loaded().then(() => setLoading(false));
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
