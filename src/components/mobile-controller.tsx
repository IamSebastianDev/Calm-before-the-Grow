/** @format */

import { Html } from '@react-three/drei';
import chevron from '../assets/sprites/ui/chevron.png';
import {
    moveGridOffsetDown,
    moveGridOffsetLeft,
    moveGridOffsetRight,
    moveGridOffsetUp,
} from '../stores/grid/grid.actions';

export const MobileController = () => {
    return (
        <Html center>
            <div className="container">
                <div className="mobile-controller">
                    <button className="up" onClick={() => moveGridOffsetUp(0.5)}>
                        <img src={chevron} />
                    </button>
                    <button className="down" onClick={() => moveGridOffsetDown(0.5)}>
                        <img src={chevron} />
                    </button>
                    <button className="left" onClick={() => moveGridOffsetLeft(0.5)}>
                        <img src={chevron} />
                    </button>
                    <button className="right" onClick={() => moveGridOffsetRight(0.5)}>
                        <img src={chevron} />
                    </button>
                </div>
            </div>
        </Html>
    );
};
