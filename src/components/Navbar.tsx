"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { Terminal, Monitor, User, Code, Briefcase, Mail, GraduationCap, Menu, X, Box } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { mode, toggleMode } = useTheme();
    const { playSound } = useSound();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { name: "home", path: "/", icon: Terminal },
        { name: "about", path: "#about", icon: User },
        { name: "education", path: "#education", icon: GraduationCap },
        { name: "skills", path: "#skills", icon: Code },
        { name: "projects", path: "#projects", icon: Code },
        { name: "experience", path: "#experience", icon: Briefcase },
        { name: "contact", path: "#contact", icon: Mail },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = () => {
        setIsOpen(false);
        playSound("click");
    };

    const isTerminal = mode === "terminal";
    const is3D = mode === "3d";

    return (
        <>
            <nav className={`fixed z-50 transition-all duration-500 ${isTerminal
                ? "top-0 w-full bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]"
                : is3D
                    ? "top-0 w-full bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
                    : scrolled
                        ? "top-0 w-full glass-card !rounded-none"
                        : "top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl glass-card !rounded-2xl"
                }`}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 font-mono font-bold text-lg">
                            {isTerminal ? (
                                <span className="text-[var(--primary)] text-sm sm:text-lg">
                                    vaibhav@portfolio:~<span className="animate-blink">_</span>
                                </span>
                            ) : (
                                <span className="text-lg sm:text-xl tracking-tight font-bold text-gradient">
                                    VG
                                </span>
                            )}
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center">
                            <div className="flex items-baseline space-x-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        onMouseEnter={() => playSound("hover")}
                                        onClick={() => playSound("click")}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isTerminal
                                            ? "text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-card)]"
                                            : "text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--bg-card)]"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {isTerminal && <span>./{item.name}</span>}
                                            {isTerminal === false && item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => { setIsOpen(!isOpen); playSound("click"); }}
                                className={`lg:hidden p-2 rounded-lg transition-colors ${isTerminal
                                    ? "text-[var(--text-muted)] hover:text-[var(--primary)]"
                                    : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                                    }`}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>

                            {/* Mode Toggle Button */}
                            <button
                                onClick={() => { toggleMode(); playSound("success"); }}
                                onMouseEnter={() => playSound("hover")}
                                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full border transition-all text-xs sm:text-sm ${isTerminal
                                    ? "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black"
                                    : "tag-glass border-[var(--border-subtle)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                    }`}
                            >
                                {isTerminal ? <Monitor size={14} /> : mode === "gui" ? <Terminal size={14} /> : <Box size={14} />}
                                <span className="font-mono hidden sm:inline">
                                    {isTerminal ? "GUI" : mode === "gui" ? "3D" : "Terminal"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />

                        {/* Mobile Menu Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`fixed top-0 right-0 h-full w-72 z-50 lg:hidden ${isTerminal
                                ? "bg-[var(--bg-base)] border-l border-[var(--border-subtle)]"
                                : "glass-card !rounded-none"
                                }`}
                        >
                            <div className="p-4 flex justify-end border-b border-[var(--border-subtle)]">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg text-[var(--text-muted)] hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-4 space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={handleNavClick}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${isTerminal
                                                ? "text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-card)]"
                                                : "text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--bg-card)]"
                                                }`}
                                        >
                                            <item.icon size={18} />
                                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}