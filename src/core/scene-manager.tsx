/** @format */

import { PropsWithChildren, ReactElement, createContext, useContext, useRef, useState } from 'react';

export type SceneProps = { id: string };
export type Scene = (props: SceneProps) => ReactElement<PropsWithChildren<SceneProps>>;

export type SceneController = {
    current: string;
    next: (key: string) => void;
    back: () => void;
};

export type SceneManagerProps = {
    children: ReactElement<SceneProps>[] | ReactElement<SceneProps>;
};

const SceneContext = createContext<SceneController | null>(null);

export const SceneManager = ({ children }: SceneManagerProps) => {
    const nodes = [children].flat();
    const last = useRef<string>(nodes[0].props.id);
    const [current, setCurrent] = useState<string>(nodes[0].props.id);

    const next = (key: string) => {
        last.current = current;
        setCurrent(key);
    };

    const back = () => next(last.current);

    const controller = { current, next, back };

    const currentScene = [children].flat().find(({ props }) => props.id === current);

    if (!currentScene) {
        throw new Error(`No scene with key ${current} available`);
    }

    return <SceneContext.Provider value={controller}>{currentScene}</SceneContext.Provider>;
};

export const useScene = () => {
    const controller = useContext(SceneContext);
    if (!controller) {
        throw new ReferenceError(`[useScene] can only be used inside a SceneController`);
    }

    return controller;
};
