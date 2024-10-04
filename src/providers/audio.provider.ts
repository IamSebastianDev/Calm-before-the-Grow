/** @format */

import { createAudioProvider } from '../core/audio';

const sfx = {};
export type Sfx = keyof typeof sfx;

export const { AudioProvider, useAudio } = createAudioProvider({});
