import { createContext, ReactElement, useCallback, useState } from "react";
import { RouteRootName, RoutesType } from "../routes/routes";

export interface DrawerContextInterface {
    showDrawer: boolean,
    toggleDrawer: () => void,
    currentRoute: RoutesType,
    setCurrentRoute: (currentRoute: RoutesType) => void
}

export const DrawerContext = createContext<DrawerContextInterface>({} as DrawerContextInterface);

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
    const [currentRoute, setCurrentRoute] = useState<RoutesType>(RouteRootName)

    const toggleDrawer = useCallback(
        () => _setShowDrawer(!showDrawer),
        [showDrawer]
    );

    return (
        <DrawerContext.Provider value={{ showDrawer, toggleDrawer, currentRoute, setCurrentRoute }}>
            {children}
        </DrawerContext.Provider>
    );
}