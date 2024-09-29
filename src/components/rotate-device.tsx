/** @format */

import { useAssets } from '../providers/asset.provider';

export type RotateDeviceProps = { assets: ReturnType<typeof useAssets>; isLandscape: boolean };
export const RotateDevice = ({ assets, isLandscape }: RotateDeviceProps) => {
    return (
        <div className={`landscape-hint ${isLandscape ? 'hidden' : ''}`}>
            <img src={assets.rotate.image.src} />
        </div>
    );
};
