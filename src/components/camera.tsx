/** @format */

import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { PropsWithChildren, useEffect, useRef } from 'react';

export const Camera = ({ children }: PropsWithChildren) => {
    const cameraRef = useRef<any>();
    const { size } = useThree();

    useEffect(() => {
        const aspect = size.width / size.height;

        // Update the camera's frustum based on the aspect ratio
        if (cameraRef.current) {
            cameraRef.current.left = -5 * aspect;
            cameraRef.current.right = 5 * aspect;
            cameraRef.current.top = 5;
            cameraRef.current.bottom = -5;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [size]);

    return (
        <>
            <OrthographicCamera
                ref={cameraRef}
                makeDefault
                zoom={0.75} // Starting zoom level
                position={[0, 0, 10]}
                near={0.1}
                far={1000}
                top={5}
                bottom={-5}
            />
            <OrbitControls
                enableZoom={true}
                zoomSpeed={0.25}
                maxZoom={0.7}
                minZoom={0.25}
                enableDamping={true}
                dampingFactor={100}
                enableRotate={false}
                enablePan={false}
            />
            {children}
        </>
    );
};
