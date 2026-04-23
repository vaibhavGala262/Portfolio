"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CosmosBackground from "@/components/CosmosBackground";
import CursorAura from "@/components/CursorAura";
import { useTheme } from "@/context/ThemeContext";

function ClientLayout({ children }: { children: React.ReactNode }) {
    const { mode } = useTheme();
    
    return (
        <>
            <CursorAura />
            {mode === "gui" && <AuroraBackground />}
            {mode === "3d" && <CosmosBackground />}
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