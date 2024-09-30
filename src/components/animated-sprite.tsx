/** @format */

import { animated, useSpring } from '@react-spring/three';
import { MeshProps } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useMatchAbstractToTexture } from '../hooks/use-match-abstract-to-texture';
import { useGameState } from '../stores/game-state/game-state.store';
import { AnimatedTile } from '../stores/grid/grid.tiles';

export type AnimatedSpriteProps = MeshProps & {
    tile: AnimatedTile;
    position: Vector3;
};
export const AnimatedSprite = ({ tile, position: targetPosition, ...props }: AnimatedSpriteProps) => {
    const texture = useMatchAbstractToTexture(tile.type);
    const clock = useGameState((state) => state.clock);

    if (!texture) {
        throw new Error();
    }

    texture.repeat.set(1 / tile.columns, 1 / tile.rows);
    texture.offset.x = (clock % tile.columns) / tile.columns;

    // Deconstruct the target position
    const { x, y, z } = targetPosition!;

    // Define the spring animation
    const { position } = useSpring<{ position: Position }>({
        from: { position: [x, y - 0.55, z] },
        to: { position: [x, y, z] },
        config: { tension: 120, friction: 15 },
    });

    const { opacity } = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    return (
        <animated.mesh {...props} scale={1.75} position={position as unknown as [x: number, y: number, z: number]}>
            <planeGeometry />
            <animated.meshStandardMaterial transparent map={texture} opacity={opacity} />
        </animated.mesh>
    );
};
