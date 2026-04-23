"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CosmosBackground from "@/components/CosmosBackground";
import CursorAura from "@/components/CursorAura";
import GlitchPortal from "@/components/GlitchPortal";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

function ClientLayout({ children }: { children: React.ReactNode }) {
    const { mode } = useTheme();
    const [isGlitching, setIsGlitching] = useState(false);
    const [displayMode, setDisplayMode] = useState(mode);

    // Trigger glitch on mode change
    useEffect(() => {
        if (mode !== displayMode) {
            setIsGlitching(true);
        }
    }, [mode]);

    const handleGlitchComplete = () => {
        setDisplayMode(mode);
        setIsGlitching(false);
    };
    
    return (
        <>
            <GlitchPortal isActive={isGlitching} onComplete={handleGlitchComplete} />
            <CursorAura />
            {displayMode === "gui" && <AuroraBackground />}
            {displayMode === "3d" && <CosmosBackground />}
            <Navbar />
            <main className="pt-16 min-h-screen flex flex-col relative z-0">
                {children}
            </main>
            <Footer />
        </>
    );
}

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <SoundProvider>
                <ClientLayout>{children}</ClientLayout>
            </SoundProvider>
        </ThemeProvider>
    );
}