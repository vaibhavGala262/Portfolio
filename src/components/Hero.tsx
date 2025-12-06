"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import GlitchText from "@/components/GlitchText";

const COMMANDS = {
    help: "Available commands: help, theme, whoami, neofetch, ls, cat, clear, matrix, gui, contact, projects, about, experience",
    whoami: "Vaibhav Gala - System Developer & Architect",
    contact: "Email: vaibhavgala262@gmail.com | LinkedIn: Vaibhav Gala | GitHub: @vaibhavGala262",
    ls: "about.txt  skills/  projects/  experience.log  start.sh",
    gui: "Switching to God Mode...",
    clear: "CLEAR",
    matrix: "Wake up, Neo...",
    neofetch: `
       /\\        OS: PortfolioOS v1.0
      /  \\       Kernel: Linux 6.8.0
     / /\\ \\      Uptime: 24 years
    / /  \\ \\     Shell: zsh 5.9
   / /    \\ \\    Resolution: 1920x1080
  / /      \\ \\   Theme: Cyberpunk Neon
 /_/        \\_\\  Font: Fira Code
`
};

export default function Hero() {
    const { mode, toggleMode, setColorTheme } = useTheme();
    const { playSound } = useSound();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [isMatrix, setIsMatrix] = useState(false);
    const [fileSystem, setFileSystem] = useState<Record<string, string>>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Load File System
    useEffect(() => {
        const saved = localStorage.getItem("portfolio_fs");
        if (saved) {
            try {
                setFileSystem(JSON.parse(saved));
            } catch (e) {
                console.error("FS Load Error", e);
            }
        }
    }, []);

    // Save File System
    useEffect(() => {
        if (Object.keys(fileSystem).length > 0) {
            localStorage.setItem("portfolio_fs", JSON.stringify(fileSystem));
        }
    }, [fileSystem]);

    // Focus input on click
    useEffect(() => {
        if (mode === "terminal") {
            inputRef.current?.focus();
        }
    }, [mode, history]);

    // Scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [history]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = input.trim(); // Keep case for file contents
            const lowerCmd = cmd.toLowerCase();
            const args = cmd.split(" ");
            const command = args[0].toLowerCase();

            playSound("click");

            if (command === "clear") {
                setHistory([]);
            } else if (command === "theme") {
                const newTheme = args[1]?.toLowerCase();
                if (["green", "red", "purple", "gold", "blue"].includes(newTheme)) {
                    setColorTheme(newTheme as any);
                    setHistory(prev => [...prev, `> ${input}`, `Theme changed to ${newTheme}`]);
                    playSound("success");
                } else {
                    setHistory(prev => [...prev, `> ${input}`, "Usage: theme [green|red|purple|gold|blue]"]);
                    playSound("error");
                }
            } else if (command === "ls") {
                const userFiles = Object.keys(fileSystem).map(f => `<span class="text-terminal-cyan">${f}</span>`).join("  ");
                const defaultFiles = COMMANDS.ls;
                setHistory(prev => [...prev, `> ${input}`, defaultFiles + (userFiles ? "  " + userFiles : "")]);
            } else if (command === "touch") {
                const filename = args[1];
                if (filename) {
                    setFileSystem(prev => ({ ...prev, [filename]: "" }));
                    setHistory(prev => [...prev, `> ${input}`, `Created file: ${filename}`]);
                    playSound("success");
                } else {
                    setHistory(prev => [...prev, `> ${input}`, "Usage: touch [filename]"]);
                }
            } else if (command === "rm") {
                const filename = args[1];
                if (fileSystem[filename] !== undefined) {
                    const newFs = { ...fileSystem };
                    delete newFs[filename];
                    setFileSystem(newFs);
                    setHistory(prev => [...prev, `> ${input}`, `Removed file: ${filename}`]);
                    playSound("success");
                } else {
                    setHistory(prev => [...prev, `> ${input}`, `File not found: ${filename}`]);
                    playSound("error");
                }
            } else if (command === "echo") {
                // simple echo "text" > file or just echo "text"
                const redirectIndex = args.indexOf(">");
                if (redirectIndex !== -1 && redirectIndex < args.length - 1) {
                    const content = args.slice(1, redirectIndex).join(" ").replace(/["']/g, "");
                    const filename = args[redirectIndex + 1];
                    setFileSystem(prev => ({ ...prev, [filename]: content }));
                    setHistory(prev => [...prev, `> ${input}`, `Wrote to ${filename}`]);
                    playSound("success");
                } else {
                    setHistory(prev => [...prev, `> ${input}`, args.slice(1).join(" ")]);
                }
            } else if (command === "cat") {
                const filename = args[1];
                if (fileSystem[filename] !== undefined) {
                    setHistory(prev => [...prev, `> ${input}`, fileSystem[filename] || "(empty)"]);
                } else if (filename === "about.txt") { // Mock Static Files
                    setHistory(prev => [...prev, `> ${input}`, COMMANDS.whoami]);
                } else {
                    setHistory(prev => [...prev, `> ${input}`, `File not found: ${filename}`]);
                    playSound("error");
                }
            } else if (command === "gui") {
                setHistory(prev => [...prev, `> ${input}`, "Switching to GUI Mode..."]);
                playSound("success");
                setTimeout(toggleMode, 800);
            } else if (command === "matrix") {
                setHistory(prev => [...prev, `> ${input}`, "Follow the white rabbit..."]);
                setIsMatrix(true);
                setTimeout(() => setIsMatrix(false), 5000);
            } else if (command === "contact") {
                setHistory(prev => [...prev, `> ${input}`, "Navigating to Contact Section..."]);
                scrollToSection("contact");
            } else if (command === "projects") {
                setHistory(prev => [...prev, `> ${input}`, "Loading Projects..."]);
                scrollToSection("projects");
            } else if (command === "about" || command === "whoami") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.whoami]);
                scrollToSection("about");
            } else if (command === "experience") {
                setHistory(prev => [...prev, `> ${input}`, "Loading Experience Log..."]);
                scrollToSection("experience");
            } else if (COMMANDS[command as keyof typeof COMMANDS]) {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS[command as keyof typeof COMMANDS]]);
            } else if (cmd === "") {
                setHistory(prev => [...prev, ">"]);
            } else {
                setHistory(prev => [...prev, `> ${input}`, `Command not found: ${command}. Type 'help' for available commands.`]);
                playSound("error");
            }

            setInput("");
        } else {
            playSound("type"); // Typing sound
        }
    };

    if (mode === "gui") {
        return (
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="mb-4 inline-block px-4 py-1.5 rounded-full border border-terminal-green/20 bg-terminal-green/10 backdrop-blur-md text-sm text-terminal-green font-mono font-medium">
                        System Developer & Architect
                    </div>
                    <GlitchText
                        text="VAIBHAV GALA"
                        className="text-6xl md:text-9xl font-extrabold mb-6 tracking-tighter mix-blend-overlay text-white opacity-90 block"
                    />
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Crafting scalable systems with <span className="text-terminal-green font-bold">Linux</span>, <span className="text-terminal-cyan font-bold">C</span>, and <span className="text-terminal-green font-bold">Modern Web Tech</span>.
                    </p>
                </motion.div>
            </section>
        );
    }

    // Interactive Terminal Mode
    return (
        <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-20 max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
            {isMatrix && (
                <div className="fixed inset-0 z-50 bg-black text-green-500 font-mono overflow-hidden pointer-events-none opacity-50">
                    <div className="animate-pulse text-xs leading-3 break-all">
                        {Array(5000).fill(0).map(() => String.fromCharCode(33 + Math.random() * 93)).join("")}
                    </div>
                </div>
            )}

            <div className="font-mono text-lg space-y-2">
                {history.length === 0 && (
                    <div className="mb-8 text-terminal-muted">
                        <pre className="text-xs md:text-sm text-terminal-green leading-none mb-4">
                            {`
 __      __   _____ 
 \\ \\    / /  / ____|
  \\ \\  / /  | |  __ 
   \\ \\/ /   | | |_ |
    \\  /    | |__| |
     \\/      \\_____|
`}
                        </pre>
                        <p>Welcome to Vaibhav's Portfolio</p>
                        <p className="text-sm text-gray-400">Sound OS Loaded... [OK]</p>
                        <p>Type <span className="text-terminal-cyan">'help'</span> to see available commands.</p>
                    </div>
                )}

                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words text-terminal-muted">
                        {line.startsWith(">") ? (
                            <span>
                                <span className="text-terminal-green">vaibhav@portfolio:~$</span>
                                <span className="text-white">{line.replace(">", "")}</span>
                            </span>
                        ) : (
                            <span
                                className={line.includes("Command not found") ? "text-red-400" : "text-terminal-cyan"}
                                dangerouslySetInnerHTML={{ __html: line }}
                            />
                        )}
                    </div>
                ))}

                <div className="flex items-center">
                    <span className="text-terminal-green mr-2 flex-shrink-0">vaibhav@portfolio:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="bg-transparent border-none outline-none text-white w-full font-mono caret-terminal-green"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </section>
    );
}
