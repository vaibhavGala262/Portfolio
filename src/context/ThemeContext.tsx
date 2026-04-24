"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemeMode = "terminal" | "gui" | "3d";

interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>("terminal");

    const toggleMode = () => {
        setMode((prev) => {
            if (prev === "terminal") return "gui";
            if (prev === "gui") return "3d";
            return "terminal";
        });
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
            <div
                data-mode={mode}
                style={{
                    "--primary": "#00ff00",
                    "--secondary": "#00d8ff",
                } as React.CSSProperties}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};