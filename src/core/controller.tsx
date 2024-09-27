/** @format */

import { createContext, PropsWithChildren, useContext, useEffect } from 'react';

export type KeyAction = (event: KeyboardEvent, keys: string[]) => void;
export type KeyBindings<T extends string> = Record<T, string[]>;
export class Controller<T extends string> {
    id = crypto.randomUUID();
    private bindings: KeyBindings<T> | null = null;

    // Keys
    private activeKeys = new Set<string>();
    get keys() {
        return this.activeKeys;
    }

    // Interaction events
    private addKey = (event: KeyboardEvent) => {
        const { key } = event;
        this.activeKeys.add(key);

        // Match the action
        const matchedActionTypes = this.matchAction(key);
        const actions = matchedActionTypes.flatMap((type) => [...(this.actionMap.get(type as T) ?? [])]);
        for (const action of actions) {
            action(event, [...this.activeKeys]);
        }
    };
    private removeKey = (event: KeyboardEvent) => {
        this.activeKeys.delete(event.key);
    };

    // Matcher
    matchAction(key: string) {
        return Object.entries(this.bindings ?? {})
            .map(([action, keys]) => {
                if (!Array.isArray(keys) || !keys.includes(key)) {
                    return null;
                }

                return action;
            })
            .filter((value) => value !== null);
    }

    // Listeners
    onDestroy() {
        window.removeEventListener('keydown', this.addKey);
        window.removeEventListener('keyup', this.removeKey);
    }

    onInit() {
        window.addEventListener('keydown', this.addKey);
        window.addEventListener('keyup', this.removeKey);
    }

    constructor(public readonly actions: T[]) {}

    updateKeyBindings(bindings: KeyBindings<T>) {
        this.bindings = bindings;
    }

    actionMap = new Map<T, Set<KeyAction>>();
    on(actionType: T, action: KeyAction) {
        // Get or create the action set
        const actions = this.actionMap.get(actionType) ?? new Set<KeyAction>();

        // Update the mapping and set the updated set as new map value
        actions.add(action);
        this.actionMap.set(actionType, actions);

        // Return the clean up function
        return () => {
            this.actionMap.get(actionType)?.delete(action);
        };
    }
}

export const createControllerProvider = <T extends string>(actions: T[], initialControlSchema?: KeyBindings<T>) => {
    // Create a controller instance to be passed throughout the application
    const controller = new Controller(actions);
    if (initialControlSchema) {
        controller.updateKeyBindings(initialControlSchema);
    }

    // Create the Context, Provider and Hook
    const Ctx = createContext<Controller<T>>(controller);

    const ControllerProvider = ({ children }: PropsWithChildren) => {
        useEffect(() => {
            // We initialize the controller to setup the listeners
            // and provide a clean up for when the component is unmounted
            controller.onInit();

            return () => {
                controller.onDestroy();
            };
        }, []);

        return <Ctx.Provider value={controller}>{children}</Ctx.Provider>;
    };

    const useController = () => {
        const ctx = useContext(Ctx);
        if (!ctx) {
            throw new ReferenceError(`[useController] can only be used inside a ControllerProvider`);
        }

        return ctx;
    };

    return { ControllerProvider, useController };
};

// Custom hook to ease sub and unsubscribe handling
// @todo -> Check if sync external store might work here?
export const useControllerAction = <T extends string>(controller: Controller<T>, type: T, action: KeyAction) => {
    useEffect(() => {
        const unsubscribe = controller.on(type, action);
        return () => unsubscribe();
    }, []);
};
