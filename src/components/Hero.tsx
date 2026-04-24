"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import GlitchText from "@/components/GlitchText";
import MatrixRain from "@/components/MatrixRain";

const COMMANDS = {
    help: `
<table class="w-full text-left border-collapse font-mono text-xs sm:text-sm md:text-base whitespace-nowrap">
  <thead>
    <tr class="bg-terminal-green text-black uppercase tracking-wider">
      <th class="py-1 px-2 font-bold w-32">Command</th>
      <th class="py-1 px-2 font-bold">Description</th>
    </tr>
  </thead>
  <tbody class="text-terminal-muted">
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">help</td><td class="py-1 px-2">Show this help message</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">whoami</td><td class="py-1 px-2">About me</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">about</td><td class="py-1 px-2">Jump to About section</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">education</td><td class="py-1 px-2">Jump to Education details</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">skills</td><td class="py-1 px-2">Technical skills readout</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">projects</td><td class="py-1 px-2">My projects portfolio</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">experience</td><td class="py-1 px-2">Work experience logs</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">neofetch</td><td class="py-1 px-2">System information</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">theme</td><td class="py-1 px-2">theme [green|red|purple|gold|blue]</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">matrix</td><td class="py-1 px-2">Wake up, Neo...</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">gui</td><td class="py-1 px-2">Switch to standard GUI Mode</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">3d</td><td class="py-1 px-2">Launch Celestial 3D Universe</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">top</td><td class="py-1 px-2">Active system processes</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">tree</td><td class="py-1 px-2">View directory structure</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">ls</td><td class="py-1 px-2">List files</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">cat</td><td class="py-1 px-2">Read file content</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">download</td><td class="py-1 px-2">download --resume</td>
    </tr>
    <tr class="hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">clear</td><td class="py-1 px-2">Clear terminal</td>
    </tr>
  </tbody>
</table>`,
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
    gui: "Switching to GUI Mode...",
    "3d": "Launching Celestial Universe...",
    clear: "CLEAR",
    matrix: "Wake up, Neo...",
    top: `
<table class="w-full text-left border-collapse mt-2 text-sm md:text-base">
  <thead>
    <tr class="bg-terminal-green text-black font-bold">
      <th class="py-1 px-2">PID</th>
      <th class="py-1 px-2">USER</th>
      <th class="py-1 px-2">PR</th>
      <th class="py-1 px-2">NI</th>
      <th class="py-1 px-2">VIRT</th>
      <th class="py-1 px-2">RES</th>
      <th class="py-1 px-2">SHR</th>
      <th class="py-1 px-2">S</th>
      <th class="py-1 px-2">%CPU</th>
      <th class="py-1 px-2">%MEM</th>
      <th class="py-1 px-2">TIME+</th>
      <th class="py-1 px-2">COMMAND</th>
    </tr>
  </thead>
  <tbody class="text-terminal-cyan/90 font-mono">
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2">262</td>
      <td class="py-1 px-2">vaibhav</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">1.2g</td>
      <td class="py-1 px-2">420m</td>
      <td class="py-1 px-2">88m</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2">4.3</td>
      <td class="py-1 px-2">2.4</td>
      <td class="py-1 px-2">0:12.42</td>
      <td class="py-1 px-2 text-white">Brain.exe</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2">101</td>
      <td class="py-1 px-2">vaibhav</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">850m</td>
      <td class="py-1 px-2">120m</td>
      <td class="py-1 px-2">45m</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2 text-green-400">1.2</td>
      <td class="py-1 px-2">0.8</td>
      <td class="py-1 px-2">0:05.10</td>
      <td class="py-1 px-2 text-white">Coffee_Eng</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-orange-400">404</td>
      <td class="py-1 px-2 text-orange-400">root</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2 text-red-400">0.0</td>
      <td class="py-1 px-2 text-red-400">0.0</td>
      <td class="py-1 px-2">0:00.00</td>
      <td class="py-1 px-2 text-white font-bold">Curiosity_d</td>
    </tr>
    <tr class="hover:bg-terminal-cyan/10">
      <td class="py-1 px-2">888</td>
      <td class="py-1 px-2">vaibhav</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">500m</td>
      <td class="py-1 px-2">90m</td>
      <td class="py-1 px-2">30m</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2">0.8</td>
      <td class="py-1 px-2">0.5</td>
      <td class="py-1 px-2">0:08.15</td>
      <td class="py-1 px-2 text-white">React_Run</td>
    </tr>
  </tbody>
</table>
`,
    tree: `
<div class="font-mono text-sm md:text-base leading-none">
  <div><span class="text-blue-400 font-bold">.</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-white">about.txt</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-white">education.txt</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-white">experience.log</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-green-400 font-bold">start.sh</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-blue-400 font-bold">projects/</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">internconnect.py</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">NutShell.c</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">SnapLink.java</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;└──</span> <span class="text-white">Viper.c</span></div>
  <div><span class="text-terminal-muted">└──</span> <span class="text-blue-400 font-bold">skills/</span></div>
  <div><span class="text-terminal-muted">&nbsp;&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">Languages.json</span></div>
  <div><span class="text-terminal-muted">&nbsp;&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">Frameworks.json</span></div>
  <div><span class="text-terminal-muted">&nbsp;&nbsp;&nbsp;&nbsp;└──</span> <span class="text-white">Cloud.json</span></div>
</div>
`,
    neofetch: `
        /\\        OS: PortfolioOS v2.0
       /  \\       Kernel: Linux 6.8.0-vaibhav
      / /\\ \\      Uptime: 21 years
     / /  \\ \\     Shell: NutShell v1.0
    / /    \\ \\    Resolution: 1920x1080
   / /      \\ \\   Theme: Cyberpunk Neon
  /_/        \\_\\  Font: Fira Code | CPU: 2.8M req/day
`
};

const VIRTUAL_FS: Record<string, Record<string, { type: "file" | "dir", content?: string }>> = {
    "~": {
        "about.txt": { type: "file", content: COMMANDS.whoami },
        "education.txt": { type: "file", content: COMMANDS.education },
        "experience.log": { type: "file", content: COMMANDS.experience },
        "start.sh": { type: "file", content: "bash: ./start.sh: Permission denied" },
        "projects": { type: "dir" },
        "skills": { type: "dir" }
    },
    "~/projects": {
        "internconnect.py": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-purple-400">def</span> <span class="text-blue-400 font-bold">internconnect</span>():
    <span class="text-green-400">"""
    InternConnect - AI-powered Internship Platform
    Tech Stack: Python, FastAPI, Next.js, LangGraph
    ================================================
    Matches students with top startups using an AI graph reasoning engine.
    Analyzes CVs, matches job requirements, and generates custom pathways.
    """</span>
    print(<span class="text-yellow-400">"Deploying to production..."</span>)
    <span class="text-purple-400">return</span> <span class="text-orange-400">True</span>
</div>` },
        "NutShell.c": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-purple-400">int</span> <span class="text-blue-400 font-bold">main</span>(<span class="text-purple-400">int</span> argc, <span class="text-purple-400">char</span> **argv) {
    <span class="text-green-400">/* NutShell - Custom UNIX shell (C) */</span>
    <span class="text-green-400">/* Supports pipelines, I/O redirection, and signals */</span>
    printf(<span class="text-yellow-400">"Welcome to NutShell\\n"</span>);
    loop();
    <span class="text-purple-400">return</span> 0;
}
</div>` },
        "SnapLink.java": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-purple-400">public class</span> <span class="text-blue-400 font-bold">SnapLink</span> {
    <span class="text-green-400">// High-performance URL shortener processing 2.8M redirects/day.</span>
    <span class="text-green-400">// Tech: Java, Spring Boot, Redis, PostgreSQL</span>
    <span class="text-purple-400">public static void</span> <span class="text-blue-400">main</span>(String[] args) {
        System.out.println(<span class="text-yellow-400">"Cache hit ratio: 99.8%"</span>);
    }
}
</div>` },
        "Viper.c": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-green-400">/* Viper - Ultra-fast HTTP server written in C using epoll. */</span>
<span class="text-green-400">/* Capable of handling over 50,000 concurrent connections. */</span>
listen_for_connections(PORT);
accept_and_serve();
</div>` }
    },
    "~/skills": {
        "Languages.json": { type: "file", content: "{\n  \"languages\": [\"C\", \"Java\", \"Python\", \"TypeScript\", \"Rust\"]\n}" },
        "Frameworks.json": { type: "file", content: "{\n  \"frameworks\": [\"React\", \"Next.js\", \"FastAPI\", \"Spring Boot\"]\n}" },
        "Cloud.json": { type: "file", content: "{\n  \"cloud\": [\"AWS\", \"GCP\", \"Docker\", \"Kubernetes\", \"Redis\"]\n}" }
    }
};

export default function Hero() {
    const { mode, setMode, setColorTheme } = useTheme();
    const { playSound } = useSound();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isMatrix, setIsMatrix] = useState(false);
    const [isLockedDown, setIsLockedDown] = useState(false);
    const [fileSystem, setFileSystem] = useState<Record<string, string>>({});
    const [cwd, setCwd] = useState("~");
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Load File System & Command History
    useEffect(() => {
        const savedFS = localStorage.getItem("portfolio_fs");
        if (savedFS) {
            try { setFileSystem(JSON.parse(savedFS)); } catch (e) { console.error(e); }
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

    const getPrompt = () => {
        const displayPath = cwd === "~" ? "~" : cwd.replace("~/projects", "projects").replace("~/skills", "skills");
        return `vaibhav@portfolio:${displayPath}$`;
    };

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = input.trim();
            if (!cmd) return;

            setCommandHistory(prev => [cmd, ...prev]);
            setHistoryIndex(-1);

            const args = cmd.split(" ");
            const command = args[0].toLowerCase();

            playSound("click");

            if (input.startsWith("sudo rm -rf") || input.startsWith("sudo su") || command === "sudo") {
                setHistory(prev => [...prev, 
                    `> ${input}`, 
                    `<span class="text-red-500 font-bold block animate-pulse">SECURITY ALERT: UNAUTHORIZED PRIVILEGE ESCALATION DETECTED</span>`, 
                    `<span class="text-red-500 block">Initiating system lockdown...</span>`, 
                    `<span class="text-red-500 block">Tracing hacker IP address... [FAILED]</span>`
                ]);
                playSound("error");
                setIsLockedDown(true);
                setTimeout(() => setIsLockedDown(false), 3000);
            } else if (command === "clear") {
                setHistory([]);
            } else if (command === "help") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.help]);
            } else if (command === "pwd") {
                setHistory(prev => [...prev, `> ${input}`, cwd === "~" ? "/home/vaibhav" : `/home/vaibhav/${cwd.replace("~/", "")}`]);
            } else if (command === "cd") {
                const target = args[1] || "~";
                if (target === ".." || target === "../") {
                    if (cwd !== "~") {
                        const newPath = cwd.split("/").slice(0, -1).join("/") || "~";
                        setCwd(newPath);
                        setHistory(prev => [...prev, `> ${input}`]);
                    } else {
                        setHistory(prev => [...prev, `> ${input}`]);
                    }
                } else if (target === "~" || target === "/") {
                    setCwd("~");
                    setHistory(prev => [...prev, `> ${input}`]);
                } else {
                    const fullTarget = cwd === "~" ? `~/${target.replace(/\/$/, '')}` : `${cwd}/${target.replace(/\/$/, '')}`;
                    if (VIRTUAL_FS[fullTarget]) {
                        setCwd(fullTarget);
                        setHistory(prev => [...prev, `> ${input}`]);
                    } else {
                        setHistory(prev => [...prev, `> ${input}`, `cd: ${target}: No such file or directory`]);
                        playSound("error");
                    }
                }
            } else if (command === "ls") {
                const dirContent = VIRTUAL_FS[cwd];
                let output = "";
                if (dirContent) {
                    const items = Object.entries(dirContent).map(([name, data]) => {
                        return data.type === "dir" ? `<span class="text-blue-400 font-bold">${name}/</span>` : `<span class="text-white">${name}</span>`;
                    });
                    if (cwd === "~") {
                        const userFiles = Object.keys(fileSystem).map(f => `<span class="text-terminal-cyan">${f}</span>`);
                        output = [...items, ...userFiles].join("  ");
                    } else {
                        output = items.join("  ");
                    }
                }
                setHistory(prev => [...prev, `> ${input}`, output || "(empty)"]);
            } else if (command === "theme") {
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
                const redirectIndex = args.indexOf(">");
                if (redirectIndex !== -1 && redirectIndex < args.length - 1) {
                    const content = args.slice(1, redirectIndex).join(" ").replace(/["']/g, "");
                    const filename = args[redirectIndex + 1];
                    setFileSystem(prev => ({ ...prev, [filename]: content }));
                    setHistory(prev => [...prev, `> ${input}`, `Wrote content to ${filename}`]);
                    playSound("success");
                } else {
                    setHistory(prev => [...prev, `> ${input}`, args.slice(1).join(" ")]);
                }
            } else if (command === "cat") {
                let filename = args[1];
                let searchDir = cwd;
                
                // Extremely basic path parsing (e.g., cat projects/NutShell.c)
                if (filename?.includes("/")) {
                    const parts = filename.split("/");
                    filename = parts.pop()!;
                    const path = parts.join("/");
                    searchDir = cwd === "~" ? `~/${path}` : `${cwd}/${path}`;
                }

                if (cwd === "~" && fileSystem[filename] !== undefined && !args[1].includes("/")) {
                    setHistory(prev => [...prev, `> ${input}`, fileSystem[filename] || "(empty file)"]);
                } else if (VIRTUAL_FS[searchDir] && VIRTUAL_FS[searchDir][filename] && VIRTUAL_FS[searchDir][filename].type === "file") {
                    setHistory(prev => [...prev, `> ${input}`, VIRTUAL_FS[searchDir][filename].content || ""]);
                } else {
                    setHistory(prev => [...prev, `> ${input}`, `cat: ${args[1] || ""}: No such file or directory`]);
                    playSound("error");
                }
            } else if (command === "gui") {
                setHistory(prev => [...prev, `> ${input}`, "Switching to GUI Mode (Premium Experience)..."]);
                playSound("success");
                setTimeout(() => setMode("gui"), 800);
            } else if (command === "3d") {
                setHistory(prev => [...prev, `> ${input}`, "Booting Universe.exe... Jumping to 3D mode."]);
                playSound("success");
                setTimeout(() => setMode("3d"), 800);
            } else if (command === "matrix") {
                setHistory(prev => [...prev, `> ${input}`, "Wake up, Neo..."]);
                setIsMatrix(true);
            } else if (command === "contact") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.contact]);
                scrollToSection("contact");
            } else if (command === "projects") {
                const detailFlag = args[1] === "--details";
                setHistory(prev => [...prev, `> ${input}`, detailFlag ? "Loading detailed payload..." : COMMANDS.projects]);
                scrollToSection("projects");
            } else if (command === "download") {
                if (args[1] === "--resume") {
                    setHistory(prev => [...prev, `> ${input}`, "Initiating secure transfer...", "[✓] Resume located", "[✓] Handshake complete. Download started."]);
                    playSound("success");
                    // Assuming resume.pdf exists in public/
                    const link = document.createElement("a");
                    link.href = "/Vaibhav_Resumr.pdf";
                    link.setAttribute("download", "Vaibhav_Gala_Resume.pdf");
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    setHistory(prev => [...prev, `> ${input}`, "Usage: download --resume"]);
                    playSound("error");
                }
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
            } else if (command === "top") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.top]);
            } else if (command === "tree") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.tree]);
            } else if (command === "neofetch") {
                setHistory(prev => [...prev, `> ${input}`, COMMANDS.neofetch]);
            } else {
                setHistory(prev => [...prev, `> ${input}`, `Command not found: ${command}. Type 'help' for available commands.`]);
                playSound("error");
            }

            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const nextIndex = historyIndex + 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const currentCmd = input.toLowerCase();
            const possible = Object.keys(COMMANDS).filter(c => c.startsWith(currentCmd));
            if (possible.length === 1) {
                setInput(possible[0]);
            }
        } else {
            playSound("type");
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
                        Architecting Scalable Realities
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <a href="#projects" className="btn-hud btn-hud-primary">Explore Universe</a>
                        <a href="#contact" className="btn-hud">Contact</a>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (mode === "gui") {
        return (
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                {/* Layered Background Effects */}
                <div className="absolute inset-0 subtle-grid pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-4xl"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-xl group"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_10px_var(--primary)]" />
                        <span className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase font-bold group-hover:text-[var(--primary)] transition-colors">
                            System Developer & Architect
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none drop-shadow-2xl"
                    >
                        <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            VAIBHAV GALA
                        </span>
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-medium leading-relaxed mb-10">
                            Engineering complex systems with <span className="text-white underline decoration-[var(--primary)] underline-offset-8">Linux Kernel</span>, <span className="text-white underline decoration-[var(--secondary)] underline-offset-8">High Performance C</span>, and <span className="text-white underline decoration-[var(--accent)] underline-offset-8">Architecture-first Web</span>.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 mt-12"
                    >
                        <a href="#projects" className="px-8 py-4 bg-[var(--primary)] text-black font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                            Explored Projects
                        </a>
                        <a href="#contact" className="px-8 py-4 border border-[var(--border-subtle)] backdrop-blur-md rounded-xl hover:bg-white/5 transition-all">
                            Get In Touch
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

    return (
        <section className={`min-h-[90vh] flex flex-col justify-center px-4 md:px-20 max-w-4xl mx-auto transition-all ${isLockedDown ? "animate-glitch-heavy bg-red-950/80 shadow-[inset_0_0_100px_rgba(220,38,38,0.5)] !border-red-500 overflow-hidden" : ""}`} onClick={() => inputRef.current?.focus()}>
            {isMatrix && <MatrixRain onExit={() => setIsMatrix(false)} />}

            <div className="font-mono text-base md:text-lg">
                {history.length === 0 && (
                    <div className="mb-8 text-terminal-muted">
                        <pre className="text-xs md:text-sm text-terminal-green leading-none mb-4">
                            {`
 __      __   _____ 
 \\ \\    / /  / ____|
  \\ \\  / /  | |  __ 
   \\ \\/ /   | | |_ |
    \\  /    | |__| |
     \\/      \\_____| v2.0
`}
                        </pre>
                        <p>Welcome to Vaibhav's Professional Shell</p>
                        <p className="text-xs text-gray-500 mb-4 tracking-widest uppercase">System status: [OPTIMAL]</p>
                        <p>Type <span className="text-terminal-cyan">'help'</span> to see available commands.</p>
                    </div>
                )}

                <div className="space-y-0">
                    {history.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words">
                            {line.startsWith(">") ? (
                                <div className="flex gap-2">
                                    <span className="text-terminal-green shrink-0">{getPrompt()}</span>
                                    <span className="text-white font-bold">{line.replace(">", "")}</span>
                                </div>
                            ) : (
                                <div
                                    className={line.includes("Command not found") ? "text-red-400" : "text-terminal-cyan/90"}
                                    dangerouslySetInnerHTML={{ __html: line }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center">
                    <span className="text-terminal-green mr-2 flex-shrink-0 font-bold underline decoration-terminal-green/30 underline-offset-4">{getPrompt()}</span>
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
                <div ref={bottomRef} className="h-20" />
            </div>

            {/* Terminal Status Bar */}
            <div className="fixed bottom-0 left-0 w-full h-8 bg-terminal-dim border-t border-terminal-border flex items-center justify-between px-4 text-[10px] font-mono text-terminal-muted z-50">
                <div className="flex gap-4">
                    <span>MODE: {mode.toUpperCase()}</span>
                    <span className="hidden sm:inline">LANG: TypeScript/C</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-terminal-green animate-pulse">● ONLINE</span>
                    <span>v2.0.42</span>
                </div>
            </div>
        </section>
    );
}
