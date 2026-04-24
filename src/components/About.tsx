"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function About() {
    const { mode } = useTheme();

    if (mode === "3d") {
        return (
            <section id="about" className="py-24 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass-hud p-6 md:p-8"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold glow-heading tracking-tight">
                                About Me
                            </h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar with cyan ring */}
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <div className="avatar-ring bg-slate-800 flex items-center justify-center">
                                    <span className="text-3xl">👨‍🚀</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <p className="text-slate-300 leading-relaxed">
                                    <span className="text-cyan-400 font-semibold">I never give up - consistency is my core trait.</span>
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    I loved Physics, Chemistry, Maths, and JEE during school. Now, I'm deeply into coding, Linux, system programming, and backend engineering.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    I enjoy building things from scratch - shells, servers, full-stack apps. I'm a big fan of Linux, terminals, open-source, C, and Rust-style low-level thinking.
                                </p>

                                {/* Stats pills */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <span className="stat-pill">CGPA: 8.73</span>
                                    <span className="stat-pill">2027</span>
                                    <span className="stat-pill">DJSCE</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (mode === "gui") {
        return (
            <section id="about" className="py-24 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass-card p-8 md:p-10"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient"
                        >
                            About Me
                        </motion.h2>

                        <div className="space-y-6 text-lg leading-relaxed text-[var(--text-secondary)] font-light">
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="text-[var(--primary)] font-semibold">I never give up - consistency is my core trait.</span>
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                I loved Physics, Chemistry, Maths, and JEE during school. Now, I'm deeply into coding, Linux, system programming, and backend engineering.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                I enjoy building things from scratch - shells, servers, full-stack apps. I'm a big fan of Linux, terminals, open-source, C, and Rust-style low-level thinking.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-[var(--secondary)] italic pt-4 border-t border-[var(--border-subtle)]"
                            >
                                "Talk is cheap. Show me the code." - <span className="not-italic">Linus Torvalds</span>
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="py-24 px-4 md:px-20 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-terminal-cyan/20 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.05)] relative group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/5 via-transparent to-purple-500/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Terminal Toolbar */}
                <div className="bg-[#111] border-b border-terminal-cyan/20 px-4 py-3 flex items-center justify-between relative z-10">
                    <div className="flex gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)] border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] border border-green-500/50"></div>
                    </div>
                    <div className="text-terminal-muted text-xs font-mono opacity-70 tracking-widest">
                        vaibhav@portfolio:~
                    </div>
                    <div className="w-12"></div> {/* Spacer for centering */}
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base selection:bg-terminal-cyan/30 relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-terminal-green font-bold shadow-terminal-green/50">vaibhav@portfolio</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400 font-bold">~</span>
                        <span className="text-white">$</span>
                        <span className="text-terminal-cyan ml-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">cat</span>
                        <span className="text-white">about_me.txt</span>
                        <span className="w-2.5 h-5 bg-terminal-green/80 animate-pulse ml-1 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    </div>

                    <div className="pl-4 border-l border-terminal-cyan/20 ml-2 space-y-7">
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="group/line"
                        >
                            <div className="text-terminal-cyan/50 text-xs mb-1.5 uppercase tracking-widest font-bold">01 // Trait</div>
                            <p className="text-slate-300 group-hover/line:text-white transition-colors duration-300 leading-relaxed bg-white/5 inline-block px-3 py-1.5 rounded-r-md border-l-2 border-transparent group-hover/line:border-terminal-green group-hover/line:bg-terminal-green/10">
                                <span className="text-terminal-green mr-2 opacity-0 group-hover/line:opacity-100 transition-opacity">➜</span>
                                I never give up ; <span className="text-terminal-cyan font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">consistency</span> is my core trait.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="group/line"
                        >
                            <div className="text-terminal-cyan/50 text-xs mb-1.5 uppercase tracking-widest font-bold">02 // Background</div>
                            <p className="text-slate-300 group-hover/line:text-white transition-colors duration-300 leading-relaxed bg-white/5 inline-block px-3 py-1.5 rounded-r-md border-l-2 border-transparent group-hover/line:border-purple-400 group-hover/line:bg-purple-500/10">
                                <span className="text-purple-400 mr-2 opacity-0 group-hover/line:opacity-100 transition-opacity">➜</span>
                                Loved <span className="text-white font-semibold">Physics, Chemistry, Maths & JEE</span>.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="group/line"
                        >
                            <div className="text-terminal-cyan/50 text-xs mb-1.5 uppercase tracking-widest font-bold">03 // Current Focus</div>
                            <p className="text-slate-300 group-hover/line:text-white transition-colors duration-300 leading-relaxed bg-white/5 inline-block px-3 py-1.5 rounded-r-md border-l-2 border-transparent group-hover/line:border-blue-400 group-hover/line:bg-blue-500/10">
                                <span className="text-blue-400 mr-2 opacity-0 group-hover/line:opacity-100 transition-opacity">➜</span>
                                Coding, Linux, System Programming, Backend Engineering.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="group/line"
                        >
                            <div className="text-terminal-cyan/50 text-xs mb-1.5 uppercase tracking-widest font-bold">04 // Hobbies</div>
                            <p className="text-slate-300 group-hover/line:text-white transition-colors duration-300 leading-relaxed bg-white/5 inline-block px-3 py-1.5 rounded-r-md border-l-2 border-transparent group-hover/line:border-yellow-400 group-hover/line:bg-yellow-500/10">
                                <span className="text-yellow-400 mr-2 opacity-0 group-hover/line:opacity-100 transition-opacity">➜</span>
                                Building from scratch <span className="text-terminal-muted italic">(shells, servers)</span>, Linux customization, Low-level thinking.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 p-5 bg-gradient-to-r from-terminal-cyan/10 to-transparent border border-terminal-cyan/20 rounded-md relative overflow-hidden group/quote"
                    >
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-terminal-cyan shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
                        <p className="text-terminal-cyan/90 italic font-light group-hover/quote:text-terminal-cyan transition-colors duration-300 relative z-10 text-lg">
                            "Talk is cheap. Show me the code." 
                            <span className="block mt-2 text-terminal-muted text-sm font-bold tracking-widest uppercase not-italic">
                                - Linus Torvalds
                            </span>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
