/** @format */
/** @format */

import { Html } from '@react-three/drei';
import { Lights } from '../components/lights';

import { Scene, useScene } from '../core/scene-manager';

export const HowTo: Scene = () => {
    const sceneManager = useScene();

    return (
        <>
            <Lights />
            <Html center={true}>
                <div className="container howto-menu">
                    <div className="settings-title">
                        <div className="ui-heading">How to play</div>
                    </div>
                    {/* Instructions */}
                    <div className="howto-body">
                        <div className="scroll-container">
                            <h1>Calm before the Grow</h1>
                            <p className="ui-text">
                                <b>Calm before the Grow</b> is supposed to be a zen experience. Don't stress, there is
                                no winning or losing. Enjoy the process of creating your own small island of
                                tranquility.
                            </p>
                            <h1>How to play</h1>
                            <p className="ui-text">
                                At the beginning of each island, there is <mark>singular origin tile</mark>. Clicking
                                this tile will place the topmost tile from the <mark>stack</mark> on the left side of
                                the screen. You will then be able to place more tiles around the tile you just placed.
                            </p>
                            <p className="ui-text">
                                You will automatically receive a new tile every <mark>15 seconds</mark>. You will also
                                receive new tiles by <mark>placing</mark> tiles, by <mark>replacing</mark> tiles with
                                other ones, or when placing certain <mark>patterns</mark>. Which ones those are, is for
                                you to find out.
                            </p>
                            <p className="ui-text">
                                In the upper right corner, a <mark>Quest</mark> will be displayed, hinting and guiding
                                you to what to do next. You don't have to fulfill these quest, however doing so will
                                guide you through the game as well as award additional points.
                            </p>
                            <h1>Assets</h1>
                            <p className="ui-text">
                                The following assets and technologies were used during the creation of{' '}
                                <mark>Calm before the grow</mark>.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://scrabling.itch.io/pixel-isometric-tiles">
                                        32 x 32 Pixel Isometric Tiles
                                    </a>
                                </li>
                                <li>
                                    <a href="https://suno.com">Suno.com for the Music</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Back button */}
                    <button className="settings-button" onPointerDown={() => sceneManager.next('menu')}>
                        Back to menu
                    </button>
                </div>
            </Html>
        </>
    );
};
