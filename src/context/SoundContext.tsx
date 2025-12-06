"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface SoundContextType {
    playSound: (type: "hover" | "click" | "type" | "error" | "success") => void;
    soundEnabled: boolean;
    toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType>({} as SoundContextType);

// Short, retro base64 sounds
const SOUNDS = {
    hover: "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...", // Placeholder, will use synthesized logic or real base64
    click: "data:audio/wav;base64,...",
    type: "data:audio/wav;base64,..."
};

// We will use Web Audio API for synthesized beeps to keep it lightweight and dependency-free
export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        try {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API not supported");
        }
    }, []);

    const playSound = (type: "hover" | "click" | "type" | "error" | "success") => {
        if (!soundEnabled || !audioCtxRef.current) return;

        // Resume context if suspended (browser autoplay policy)
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }

        const osc = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);

        const now = audioCtxRef.current.currentTime;

        // Synth Sounds Logic
        switch (type) {
            case "hover":
                osc.type = "sine";
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case "click":
                osc.type = "square";
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case "type":
                osc.type = "triangle";
                osc.frequency.setValueAtTime(800, now);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;

            case "success":
                osc.type = "sine";
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
                break;

            case "error":
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.2);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
        }
    };

    const toggleSound = () => setSoundEnabled(prev => !prev);

    return (
        <SoundContext.Provider value={{ playSound, soundEnabled, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export const useSound = () => useContext(SoundContext);
