/** @format */

import { MeshProps } from '@react-three/fiber';
import { Texture } from 'three';

export type SpriteProps = MeshProps & {
    texture: Texture;
};

export const Sprite = ({ texture, ...props }: SpriteProps) => {
    return (
        <mesh receiveShadow {...props}>
            <planeGeometry />
            <meshStandardMaterial map={texture} transparent />
        </mesh>
    );
};
