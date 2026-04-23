"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import GlitchText from "@/components/GlitchText";
import MatrixRain from "@/components/MatrixRain";
import HeroCosmic from "@/components/HeroCosmic"; // Keep for future use

const COMMANDS = {
    help: `Available commands:
  help        - Show this help message
  whoami      - About me
  about      - About section
  education  - Education details
  skills     - Technical skills
  projects   - My projects
  experience - Work experience
  neofetch   - System info
  theme      - Change color [green|red|purple|gold|blue]
  matrix     - Enter the Matrix
  gui        - Switch to GUI Mode
  contact    - Contact info
  clear      - Clear terminal`,
    whoami: "Vaibhav Gala - System Developer & Architect | B.Tech CS @ DJ Sanghvi (CGPA 8.73)",
    contact: "Email: vaibhavgala262@gmail.com | LinkedIn: Vaibhav Gala | GitHub: @vaibhavGala262",
    ls: "about.txt  education.txt  skills/  projects/  experience.log  start.sh",
    skills: `
=== TECHNICAL ARSENAL ===

[Programming & CS]
  C, Java, Python, DSA, Algorithms, OOP

[Web & Frameworks]  
  React, Next.js, TypeScript, Vite, FastAPI, Flask, Spring Boot

[Databases]
  PostgreSQL, MySQL, MongoDB, Supabase, Redis, ChromaDB

[GenAI & LLMs]
  LangChain, LangGraph, MCP, HuggingFace, LLaMA, Gemini, DeepSeek

[DevOps & Cloud]
  Git, Docker, AWS, GCP, Firebase, Vercel, Render
`,
    projects: `
=== SELECTED WORKS ===

[1] InternConnect     - AI internship platform (Next.js, FastAPI, LangGraph)
[2] NutShell         - Unix shell in C (pipelines, I/O redirection)
[3] SnapLink         - URL shortener (2.8M redirects/day, Redis cache)
[4] Viper            - HTTP server in C (epoll, 50k+ concurrent)

Type 'projects --details' for more info
`,
    education: `
=== EDUCATION ===

[1] B.Tech CS @ DJ Sanghvi College
    CGPA: 8.73 | Aug 2023 - Present

[2] HSC (PCM) @ Mithibai College
    Score: 89.67% | Aug 2021 - May 2023
`,
    experience: `
=== EXPERIENCE ===

[1] Aahaanya Creatives | Freelance Web Developer
    Jun 2025 - Sept 2025
    Next.js SSR, GCP NoSQL, AWS S3

[2] Prism (Co-Founder - Tech)
    Jun 2025 - Present
    AI image sharing app, AWS, Supabase, FastAPI
`,
    gui: "Switching to God Mode...",
    clear: "CLEAR",
    matrix: "Wake up, Neo...",
    neofetch: `
        /\\        OS: PortfolioOS v2.0
       /  \\       Kernel: Linux 6.8.0
      / /\\ \\      Uptime: 21 years
     / /  \\ \\     Shell: NutShell v1.0
    / /    \\ \\    Resolution: 1920x1080
   / /      \\ \\   Theme: Cyberpunk Neon
  /_/        \\_\\  Font: Fira Code | CPU: 2.8M req/day
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
                setHistory(prev => [...prev, `> ${input}`, "Wake up, Neo..."]);
                setIsMatrix(true);
            } else if (command === "contact") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.contact]);
                scrollToSection("contact");
            } else if (command === "projects") {
                const detailFlag = args[1] === "--details";
                const projectsDetail = `=== DETAILED PROJECT INFO ===

[1] InternConnect
    Stack: Next.js, FastAPI, PostgreSQL, LangGraph, Supabase, WebSocket
    Features: AI chatbot, real-time chat, Excel export
    Links: https://github.com/vaibhavGala262/InternConnect

[2] NutShell
    Stack: C, POSIX, GNU Readline, Makefile
    Features: Pipelines, I/O redirection, fork/exec/wait
    Links: https://github.com/vaibhavGala262/NutShell

[3] SnapLink
    Stack: Spring Boot, Kafka, Redis, PostgreSQL, Prometheus
    Stats: 2.8M redirects/day, 100% Redis cache hit
    Links: https://github.com/vaibhavGala262/SnapLink

[4] Viper
    Stack: C, Epoll, Makefile, ApacheBench
    Stats: 50k+ concurrent, 3.9s response time
    Links: https://github.com/vaibhavGala262/Viper
`;
                setHistory(prev => [...prev, `> ${input}`, detailFlag ? projectsDetail : COMMANDS.projects]);
                scrollToSection("projects");
            } else if (command === "about" || command === "whoami") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.whoami]);
                scrollToSection("about");
            } else if (command === "education") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.education]);
                scrollToSection("education");
            } else if (command === "skills") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.skills]);
                scrollToSection("skills");
            } else if (command === "experience" || command === "exp") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.experience]);
                scrollToSection("experience");
            } else if (command === "run") {
                // run command - simulate running stuff
                setHistory(prev => [...prev, `> ${input}`, "Executing..."]);
                setTimeout(() => {
                    setHistory(prev => [...prev, "[✓] Build successful", "[✓] Tests passed", "System ready!"]);
                }, 500);
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

    if (mode === "3d") {
        return (
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden scanline">
                <div className="relative z-20 max-w-4xl">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hud-label mb-6 uppercase"
                    >
                        Full Stack Developer
                    </motion.h2>
                    
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4"
                    >
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            VAIBHAV GALA
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-base sm:text-lg text-slate-400 font-mono tracking-widest uppercase mb-8"
                    >
                        Full Stack Developer
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <a 
                            href="#projects" 
                            className="btn-hud btn-hud-primary"
                        >
                            Explore Universe
                        </a>
                        <a 
                            href="#contact" 
                            className="btn-hud"
                        >
                            Contact
                        </a>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (mode === "gui") {
        return (
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-4xl"
                >
                    {/* Aurora badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-md text-sm font-mono font-medium"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                        <span className="text-[var(--text-secondary)]">System Developer & Architect</span>
                    </motion.div>
                    
                    {/* Name with gradient */}
                    <GlitchText
                        text="VAIBHAV GALA"
                        className="text-7xl md:text-9xl font-bold mb-6 tracking-tight block text-gradient"
                    />
                    
                    {/* Tagline */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Building scalable systems with <span className="text-[var(--primary)] font-semibold">Linux</span>, <span className="text-[var(--secondary)] font-semibold">C</span>, and <span className="text-[var(--accent)] font-semibold">Modern Web Tech</span>.
                    </motion.p>
                    
                    {/* CTA Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-4 mt-10"
                    >
                        <a href="#projects" className="btn-glow">
                            View Projects
                        </a>
                        <a href="#contact" className="btn-ghost">
                            Get In Touch
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

    // Interactive Terminal Mode
    return (
        <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-20 max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
            {isMatrix && <MatrixRain onExit={() => setIsMatrix(false)} />}

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
