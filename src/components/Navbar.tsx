"use client";

import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { Terminal, Monitor, User, Code, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { mode, toggleMode } = useTheme();
    const { playSound } = useSound();
    const pathname = usePathname();

    const navItems = [
        { name: "home", path: "/", icon: Terminal },
        { name: "about", path: "#about", icon: User },
        { name: "projects", path: "#projects", icon: Code },
        { name: "experience", path: "#experience", icon: Briefcase },
        { name: "contact", path: "#contact", icon: Mail },
    ];

    return (
        <nav className={`fixed z-50 transition-all duration-300 ${mode === "terminal"
            ? "top-0 w-full bg-[#0d1117]/90 backdrop-blur border-b border-[#30363d]"
            : "top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
            }`}>
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${mode === "terminal" ? "max-w-7xl" : ""}`}>
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 font-mono font-bold text-lg">
                        {mode === "terminal" ? (
                            <span className="text-terminal-green">
                                vaibhav@portfolio:~<span className="animate-blink">_</span>
                            </span>
                        ) : (
                            <span className="text-white text-xl tracking-tight font-bold bg-gradient-to-r from-terminal-green to-terminal-cyan bg-clip-text text-transparent">
                                VG
                            </span>
                        )}
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onMouseEnter={() => playSound("hover")}
                                    onClick={() => playSound("click")}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${mode === "terminal"
                                        ? "text-terminal-muted hover:text-terminal-green hover:bg-[#161b22]"
                                        : "text-gray-300 hover:text-terminal-green hover:bg-white/10"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {mode === "terminal" && <span>./{item.name}</span>}
                                        {mode === "gui" && item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => { toggleMode(); playSound("success"); }}
                            onMouseEnter={() => playSound("hover")}
                            className={`flex items-center gap-2 px-3 py-1 rounded border transition-colors ${mode === "terminal"
                                ? "border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black"
                                : "border-terminal-green/20 text-terminal-green hover:bg-terminal-green/10"
                                }`}
                        >
                            {mode === "terminal" ? <Monitor size={16} /> : <Terminal size={16} />}
                            <span className="text-sm font-mono">{mode === "terminal" ? "GUI Mode" : "Terminal"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
