import { createContext, ReactElement, useCallback, useState } from "react";
import React from "react";

export interface DrawerContextInterface {
    toggleDrawer: () => void,
    showDrawer: boolean,
}

export const DrawerContext = createContext<DrawerContextInterface>({
    toggleDrawer: () => { },
    showDrawer: false
});

/**
 * A theme to
 * @param children
 * @returns
 */
export function DrawerContextProvider({
    children,
}: {
    children: ReactElement;
}): ReactElement {
    const [showDrawer, _setShowDrawer] = useState<boolean>(false);

    const toggleDrawer = useCallback(
        () => _setShowDrawer(!showDrawer),
        [showDrawer]
    );

    return (
        <DrawerContext.Provider value={{ toggleDrawer, showDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
}