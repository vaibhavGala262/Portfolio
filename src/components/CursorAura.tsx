"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function CursorAura() {
    const { mode } = useTheme();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    if (mode === "terminal") {
        // Scanner style for Terminal - High Visibility, No Dot
        return (
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Main Glow - Brighter (50% opacity) */}
                <div className="w-[200px] h-[200px] bg-terminal-green/20 rounded-full blur-3xl opacity-50 transition-colors duration-300" />

                {/* Scanner Ring - Targeting structure without a solid dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] border border-terminal-green/30 rounded-full transition-colors duration-300" />
            </motion.div>
        );
    }

    // GUI Mode: Nebula Glow
    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-40 mix-blend-screen"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <div className="w-[600px] h-[600px] bg-gradient-to-r from-terminal-green/30 to-terminal-cyan/30 rounded-full blur-[100px] opacity-40 animate-pulse transition-colors duration-300" />
        </motion.div>
    );
}
