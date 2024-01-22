import React, { createContext, ReactElement, useCallback, useEffect, useState } from "react";

import { PaletteMode } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getUserPreferedColorMode, saveUserPreferedColorMode } from "../database/controllers/preferencesController";

export interface ColorModeContextInterface {
    theme: Theme,
    colorMode: PaletteMode
    toggleColorMode: () => Promise<void>;
}

export const ColorModeContext = createContext<ColorModeContextInterface>({} as ColorModeContextInterface);

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

    useEffect(() => {
        async function getInitialColorMode() {

            const preferedColorMode = await getUserPreferedColorMode();

            // if no preferences saved, using system ones and saving this as default configuration
            if (preferedColorMode === undefined) {
                const systemColorMode = prefersDarkMode ? "dark" : "light";
                await saveUserPreferedColorMode(systemColorMode);
                _setColorMode(systemColorMode);

            } else {
                // else, using user configuration
                _setColorMode(preferedColorMode);
            }

        }
        getInitialColorMode();
    }, [prefersDarkMode]);



    const toggleColorMode = useCallback(async () => {
        const newColorMode = colorMode === "light" ? "dark" : "light";
        _setColorMode(newColorMode);
        // saving toggled color to database
        await saveUserPreferedColorMode(newColorMode);
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