"use client";

import { useTheme } from "@/context/ThemeContext";

export default function GuiBackground() {
    const { mode } = useTheme();

    if (mode !== "gui") return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-green-500/20 blur-[120px] animate-blob mix-blend-screen filter" />
            <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-cyan-500/20 blur-[120px] animate-blob animation-delay-2000 mix-blend-screen filter" />
            <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-emerald-500/20 blur-[120px] animate-blob animation-delay-4000 mix-blend-screen filter" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay"></div>
        </div>
    );
}
