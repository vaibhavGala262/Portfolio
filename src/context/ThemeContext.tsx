"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemeMode = "terminal" | "gui" | "3d";
export type ColorTheme = "green" | "red" | "purple" | "gold" | "blue";

const THEMES: Record<ColorTheme, { primary: string; secondary: string }> = {
    green: { primary: "#00ff00", secondary: "#00d8ff" },
    red: { primary: "#ef4444", secondary: "#f87171" },
    purple: { primary: "#d946ef", secondary: "#a855f7" },
    gold: { primary: "#eab308", secondary: "#facc15" },
    blue: { primary: "#06b6d4", secondary: "#3b82f6" },
};

interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
    colorTheme: ColorTheme;
    setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>("terminal");
    const [colorTheme, setColorTheme] = useState<ColorTheme>("green");

    const toggleMode = () => {
        setMode((prev) => {
            if (prev === "terminal") return "gui";
            if (prev === "gui") return "3d";
            return "terminal";
        });
    };

    const currentColors = THEMES[colorTheme];

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, setMode, colorTheme, setColorTheme }}>
            <div
                data-mode={mode}
                data-theme={colorTheme}
                style={{
                    "--primary": currentColors.primary,
                    "--secondary": currentColors.secondary,
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