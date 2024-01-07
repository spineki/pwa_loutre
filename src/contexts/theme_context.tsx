import { createContext, ReactElement, useCallback, useState } from "react";
import React from "react";

export interface ThemeContextInterface {
    theming: { isDarkMode: boolean };
    setDarkMode: (darkMode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setDarkMode: () => { },
    theming: {
        isDarkMode: false,
    },
});

/**
 * A theme to
 * @param children
 * @returns
 */
export function ThemeContextProvider({
    children,
}: {
    children: ReactElement;
}): ReactElement {
    const [theming, setTheming] = useState({ isDarkMode: false });

    const setDarkMode = useCallback(
        (darkMode: boolean) => {
            setTheming({ ...theming, isDarkMode: darkMode });
        },
        [theming]
    );

    return (
        <ThemeContext.Provider value={{ setDarkMode, theming }}>
            {children}
        </ThemeContext.Provider>
    );
}