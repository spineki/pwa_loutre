import { createTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createContext, ReactElement, useCallback, useState } from "react";
import React from "react";

export type PaletteMode = "light" | "dark";

export interface ColorModeContextInterface {
    theme: Theme,
    colorMode: PaletteMode
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextInterface>({
    //@ts-ignore This theme will be filled in any case by the initialisation
    theme: {},
    toggleColorMode: () => { },
    colorMode: "dark"
});

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                // custom light parameters
            }
            : {
                // custom dark parameters
            }),
    },
});


/**
 * A theme to apply color mode (dark, light)
 * @param children
 * @returns
 */
export function ColorModeProvider({
    children,
}: {
    children: ReactElement;
}): ReactElement {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [colorMode, _setColorMode] = useState<PaletteMode>(prefersDarkMode ? "dark" : "light");

    const toggleColorMode = useCallback(() => {
        _setColorMode(colorMode === "light" ? "dark" : "light");
    }, [colorMode]);

    const theme = React.useMemo(
        () => {
            return createTheme(getDesignTokens(colorMode));
        }, [colorMode]);

    return (
        <ColorModeContext.Provider value={{ toggleColorMode, colorMode, theme }}>
            {children}
        </ColorModeContext.Provider>
    );
}