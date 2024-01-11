import React, { useContext } from "react";
import { NavigatorApp } from "./NavigatorApp";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from "./contexts/ColormodeContext";


export function ThemedApp() {
    const { theme } = useContext(ColorModeContext);
    // Update the theme only if the mode changes

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigatorApp />
        </ThemeProvider>
    );
}

