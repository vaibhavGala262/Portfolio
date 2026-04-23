"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";

export default function GlitchPortal({ 
    isActive, 
    onComplete 
}: { 
    isActive: boolean; 
    onComplete?: () => void 
}) {
    const { playSound } = useSound();

    useEffect(() => {
        if (isActive) {
            playSound("portal");
            const timer = setTimeout(() => {
                onComplete?.();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center pointer-events-none"
                >
                    {/* The "Hardware Override" Insane Glitch Layer */}
                    <div className="absolute inset-0 animate-glitch-insane bg-zinc-900/20" />
                    
                    {/* Moving Noise Overlay */}
                    <div className="absolute inset-0 noise-overlay" />

                    {/* Scrolling Scanlines */}
                    <div className="absolute inset-0">
                        <div className="scanline-overlay" style={{ animationDelay: "0s" }} />
                        <div className="scanline-overlay" style={{ animationDelay: "0.4s" }} />
                    </div>

                    {/* Matrix Digital Grid */}
                    <div className="absolute inset-0 matrix-grid opacity-30" />

                    {/* Central High-Intensity Flash */}
                    <motion.div 
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 5, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "circIn" }}
                        className="w-60 h-60 bg-terminal-green rounded-full blur-[100px]"
                    />

                    {/* Rhythmic Status Text */}
                    <div className="relative flex flex-col items-center gap-2">
                        <div className="font-mono text-terminal-green text-3xl font-black tracking-[0.2em] animate-pulse">
                            REWRITING_REALITY
                        </div>
                        <div className="font-mono text-terminal-green/50 text-xs tracking-widest uppercase">
                            Bypassing_GUI_Kernel... [OK]
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
