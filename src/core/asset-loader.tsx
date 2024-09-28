/** @format */

import { useLoader } from '@react-three/fiber';
import React, { createContext, PropsWithChildren, Suspense, useContext, useMemo } from 'react';
import { NearestFilter, Texture, TextureLoader } from 'three';

export type Assets = Record<PropertyKey, string>;
export type TextureMap<T extends Assets> = {
    [Key in keyof T]: Texture;
};
export const createAssetProvider = <T extends Assets>(assets: T) => {
    const Ctx = createContext<TextureMap<T> | null>(null);

    const AssetProvider: React.FC<PropsWithChildren> = ({ children }) => {
        const textures = useLoader(TextureLoader, Object.values(assets));
        const textureMap = useMemo(() => {
            return Object.keys(assets).reduce<TextureMap<T>>((acc, cur: keyof T, idx) => {
                acc[cur] = textures[idx];
                acc[cur].minFilter = NearestFilter;
                acc[cur].magFilter = NearestFilter;
                return acc;
            }, {} as TextureMap<T>);
        }, [textures]);

        return <Ctx.Provider value={textureMap}>{children}</Ctx.Provider>;
    };

    const useAssets = () => {
        const ctx = useContext(Ctx);
        if (!ctx) {
            throw new ReferenceError(`[useAssets] can only be used inside a Asset Provider`);
        }
        return ctx;
    };

    return { AssetProvider, useAssets };
};

export type AssetLoaderProps = {
    children: React.ReactNode;
    loader: () => JSX.Element;
};

export const AssetLoader = ({ children, loader }: AssetLoaderProps) => {
    return <Suspense fallback={loader()}>{children}</Suspense>;
};
