"use client";

import React from "react";
import { motion } from "framer-motion";
import GlitchText from "@/components/GlitchText";
import MatrixRain from "@/components/MatrixRain";
import { useTerminal } from "@/hooks/useTerminal";

export default function Hero() {
    const {
        input,
        setInput,
        history,
        isMatrix,
        setIsMatrix,
        isLockedDown,
        getPrompt,
        handleCommand,
        inputRef,
        bottomRef,
        mode
    } = useTerminal();

    if (mode === "3d") {
        return (
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden scanline">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-20 max-w-4xl p-6 sm:p-12 glass-hud rounded-3xl flex flex-col items-center shadow-[0_0_50px_rgba(34,211,238,0.05)] border border-cyan-500/20 backdrop-blur-sm"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-cyan-500/40 bg-black/60 shadow-[0_0_15px_rgba(34,211,238,0.2)] group"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                        <span className="text-cyan-400 text-xs tracking-[0.2em] uppercase font-bold group-hover:text-cyan-300 transition-colors">
                            System Developer & Architect
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-6 drop-shadow-2xl"
                    >
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            VAIBHAV GALA
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-base sm:text-xl text-slate-300 font-mono tracking-widest uppercase mb-10 max-w-2xl"
                    >
                        Architecting <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Scalable</span> Realities
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-5 sm:gap-6"
                    >
                        <a href="#projects" className="btn-hud btn-hud-primary hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all">
                            Explore Universe
                        </a>
                        <a href="#contact" className="btn-hud hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all">
                            Contact
                        </a>
                    </motion.div>
                </motion.div>
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
