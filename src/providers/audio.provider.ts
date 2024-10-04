/** @format */

import gardenDreams from '../assets/sfx/music/garden-rhythm.mp3';
import pixelDreams from '../assets/sfx/music/pixel-dreams.mp3';
import { createAudioProvider } from '../core/audio';

const sfx = {
    gardenRhythm: new Audio(gardenDreams),
    pixelDreams: new Audio(pixelDreams),
};
export type Sfx = keyof typeof sfx;

export const { AudioProvider, useAudio } = createAudioProvider(sfx);
