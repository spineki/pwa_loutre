import React from "react";
import { useContext } from "react";
import { ThemeContext, ThemeContextProvider } from "./contexts/theme_context";
import { NavigatorApp } from "./NavigatorApp";
import CssBaseline from '@mui/material/CssBaseline';

export function ThemedApp() {
    const {
        theming: { isDarkMode }
    } = useContext(ThemeContext);

    return (
        <>
            <CssBaseline />
            <ThemeContextProvider>
                <NavigatorApp />
            </ThemeContextProvider>
        </>
    );
}

