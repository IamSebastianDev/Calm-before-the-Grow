/** @format */

import { Environment } from '@react-three/drei';

export const Lights = () => {
    return (
        <>
            <Environment preset="forest" background />
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={10} />
        </>
    );
};
