/** @format */

import gardenDreams from '../assets/music/garden-rhythm.mp3';
import pixelDreams from '../assets/music/pixel-dreams.mp3';
import plop from '../assets/sfx/plop.mp3';
import { createAudioProvider } from '../core/audio';

const sfx = {
    gardenRhythm: new Audio(gardenDreams),
    pixelDreams: new Audio(pixelDreams),
    plop: new Audio(plop),
};
export type Sfx = keyof typeof sfx;

export const { AudioProvider, useAudio } = createAudioProvider(sfx);
