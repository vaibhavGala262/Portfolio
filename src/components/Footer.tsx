"use client";

import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const { mode } = useTheme();
    const { playSound } = useSound();

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/vaibhavGala262",
            icon: Github,
            terminalLabel: "git_profile"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/vaibhav-gala-a39029280",
            icon: Linkedin,
            terminalLabel: "linkedin_connect"
        },
        {
            name: "Email",
            url: "mailto:vaibhavgala262@gmail.com",
            icon: Mail,
            terminalLabel: "send_mail"
        }
    ];

    if (mode === "gui") {
        return (
            <footer id="contact" className="relative z-10 py-12 mt-20 border-t border-white/5 bg-[#0d1117]/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-terminal-green to-terminal-cyan bg-clip-text text-transparent">
                            VAIBHAV GALA
                        </h3>
                        <p className="text-gray-400 text-sm max-w-md text-center md:text-left">
                            Building the future with <span className="text-terminal-green">Systems Programming</span> and <span className="text-terminal-cyan">Web Technologies</span>.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => playSound("hover")}
                                onClick={() => playSound("click")}
                                className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-terminal-green/50 hover:bg-terminal-green/10 hover:text-terminal-green transition-all text-gray-300"
                            >
                                <link.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center text-xs text-gray-500 font-mono">
                    &copy; {new Date().getFullYear()} Vaibhav Gala. All rights reserved.
                </div>
            </footer>
        );
    }

    // Terminal Mode Footer
    return (
        <footer id="contact" className="py-8 mt-20 border-t border-terminal-muted/20 bg-[#0d1117] text-terminal-muted font-mono">
            <div className="max-w-7xl mx-auto px-4">
                {/* Status Bar Look */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-terminal-green">➜</span>
                        <span>/usr/bin/contact_info</span>
                    </div>

                    <div className="flex gap-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => playSound("hover")}
                                onClick={() => playSound("click")}
                                className="group flex items-center gap-2 hover:text-terminal-cyan transition-colors"
                            >
                                <span className="text-terminal-green opacity-50 group-hover:opacity-100">[</span>
                                <link.icon size={16} />
                                <span>{link.terminalLabel}</span>
                                <span className="text-terminal-green opacity-50 group-hover:opacity-100">]</span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs opacity-50">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>SYSTEM ONLINE</span>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs opacity-30">
                    <p>vaibhav@portfolio:~$ echo "Thank you for visiting."</p>
                </div>
            </div>
        </footer>
    );
}
