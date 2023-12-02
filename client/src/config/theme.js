import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";

// Color token exports
export const tokens = (mode) => ({ // Tokens for colors
    ...(mode === "dark"
    ? {
        
    } : {

    }),
});

// Mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode); // Use tokens with mode prop to pick colors
    return {

    }
};

// Context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(() => (
        {
            toggleColorMode: () => 
            setMode((prev) => (prev === "light" ? "dark" : "light")),
        }), []);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};