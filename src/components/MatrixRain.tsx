"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain({ onExit }: { onExit?: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener("resize", setSize);

        // Matrix setup
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charArray = chars.split("");
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Array of drops - one per column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0"; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Sending the drop back to the top randomly after it has crossed the screen
                // adding a randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Incrementing Y coordinate
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", setSize);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[100] bg-black cursor-pointer"
            onClick={onExit}
        >
            <canvas ref={canvasRef} className="block" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-terminal-green/50 text-xs font-mono animate-pulse">
                Click anywhere to exit the Matrix
            </div>
        </div>
    );
}
