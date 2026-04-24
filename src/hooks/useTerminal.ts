import { useState, useEffect, useRef } from "react";
import { COMMANDS, VIRTUAL_FS } from "@/data/systemData";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";

export function useTerminal() {
    const { mode, setMode } = useTheme();
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

    return {
        input,
        setInput,
        history,
        isMatrix,
        setIsMatrix,
        isLockedDown,
        cwd,
        getPrompt,
        handleCommand,
        inputRef,
        bottomRef,
        mode,
        setMode
    };
}
