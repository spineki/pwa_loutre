import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme_context";



export function ThemedApp() {
    const {
        theming: { isDarkMode }
    } = useContext(ThemeContext);


    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p style={{ "fontFamily": "AtomicAge-Regular" }}>
                    Atomic age font
                </p>
                <p style={{ "fontFamily": "Cookie-Regular" }}>
                    Cookie font
                </p>
            </header>
        </div>
    );

}
