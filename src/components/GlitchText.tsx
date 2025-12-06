"use client";

import React from "react";

interface GlitchTextProps {
    text: string;
    className?: string; // Additional classes for font size/weight
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>

            {/* Glitch Layer 1 (Red/Cyan Offset) */}
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-400 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Glitch Layer 2 (Blue/Magenta Offset) */}
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2"
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
}
