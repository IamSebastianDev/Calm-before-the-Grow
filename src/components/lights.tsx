/** @format */

import { Environment } from '@react-three/drei';

export const Lights = () => {
    return (
        <>
            <Environment preset="dawn" environmentIntensity={0.25} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={1} castShadow />
        </>
    );
};
