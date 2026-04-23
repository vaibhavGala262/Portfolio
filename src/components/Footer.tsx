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
            <footer id="contact" className="relative z-10 py-12 sm:py-16 mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        {/* Left - Branding */}
                        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                            <h3 className="text-2xl sm:text-3xl font-bold text-gradient">
                                VAIBHAV GALA
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-sm">
                                Building the future with <span className="text-[var(--primary)]">Systems Programming</span> and <span className="text-[var(--secondary)]">Web Technologies</span>.
                            </p>
                        </div>

                        {/* Right - Social Links */}
                        <div className="flex gap-4 sm:gap-5">
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
                                    className="p-3 sm:p-4 rounded-2xl glass-card flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all group"
                                    aria-label={link.name}
                                >
                                    <link.icon size={20} className="sm:w-5 sm:h-5" />
                                    <span className="hidden sm:inline text-sm font-medium">{link.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-10 sm:mt-12 border-t border-[var(--border-subtle)]" />

                    {/* Bottom Bar */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                        <p className="text-[var(--text-muted)] text-xs sm:text-sm font-mono">
                            &copy; {new Date().getFullYear()} Vaibhav Gala. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
                            <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                            <span>Available for opportunities</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer id="contact" className="py-8 sm:py-10 mt-20 border-t border-terminal-muted/20 bg-[var(--bg-base)] text-terminal-muted font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col items-center md:flex-row justify-between gap-6">
                    {/* Status */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm order-2 md:order-1">
                        <span className="text-terminal-green">➜</span>
                        <span className="hidden sm:inline">/usr/bin/contact_info</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 sm:gap-8 order-1 md:order-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => playSound("hover")}
                                onClick={() => playSound("click")}
                                className="group flex items-center gap-2 hover:text-terminal-cyan transition-colors text-xs sm:text-sm"
                            >
                                <span className="text-terminal-green opacity-50 group-hover:opacity-100">[</span>
                                <link.icon size={14} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">{link.terminalLabel}</span>
                                <span className="text-terminal-green opacity-50 group-hover:opacity-100">]</span>
                            </a>
                        ))}
                    </div>

                    {/* System Status */}
                    <div className="flex items-center gap-2 text-xs opacity-50 order-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="hidden sm:inline">SYSTEM ONLINE</span>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs opacity-30 hidden sm:block">
                    <p>vaibhav@portfolio:~$ echo "Thank you for visiting."</p>
                </div>
            </div>
        </footer>
    );
}