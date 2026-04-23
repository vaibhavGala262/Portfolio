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
                                    <span className="text-cyan-400 font-semibold">I never give up — consistency is my core trait.</span>
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    I loved Physics, Chemistry, Maths, and JEE during school. Now, I'm deeply into coding, Linux, system programming, and backend engineering.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    I enjoy building things from scratch — shells, servers, full-stack apps. I'm a big fan of Linux, terminals, open-source, C, and Rust-style low-level thinking.
                                </p>
                                
                                {/* Stats pills */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <span className="stat-pill">CGPA: 8.73</span>
                                    <span className="stat-pill">2026</span>
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
                                <span className="text-[var(--primary)] font-semibold">I never give up — consistency is my core trait.</span>
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
                                I enjoy building things from scratch — shells, servers, full-stack apps. I'm a big fan of Linux, terminals, open-source, C, and Rust-style low-level thinking.
                            </motion.p>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-[var(--secondary)] italic pt-4 border-t border-[var(--border-subtle)]"
                            >
                                "Talk is cheap. Show me the code." — <span className="not-italic">Linus Torvalds</span>
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="py-20 px-4 md:px-20 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-terminal-cyan">➜</span>
                    <span className="text-terminal-green">~</span>
                    <span className="text-terminal-muted">cat</span>
                    <span className="text-white">about_me.txt</span>
                </div>

                <div className="border-l-2 border-terminal-border pl-4 ml-1 space-y-4 text-terminal-muted">
                    <p className="hover:text-terminal-green transition-colors">
                        &gt; <span className="text-white">Trait:</span> I never give up ; consistency is my core trait.
                    </p>
                    <p className="hover:text-terminal-green transition-colors">
                        &gt; <span className="text-white">Background:</span> Loved Physics, Chemistry, Maths & JEE.
                    </p>
                    <p className="hover:text-terminal-green transition-colors">
                        &gt; <span className="text-white">Current Focus:</span> Coding, Linux, System Programming, Backend Engineering.
                    </p>
                    <p className="hover:text-terminal-green transition-colors">
                        &gt; <span className="text-white">Hobbies:</span> Building from scratch (shells, servers), Linux customization, Low-level thinking.
                    </p>
                    <p className="text-terminal-cyan italic mt-4">
                        # "Talk is cheap. Show me the code." - Linus Torvalds
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
