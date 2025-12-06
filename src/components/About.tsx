"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function About() {
    const { mode } = useTheme();

    if (mode === "gui") {
        return (
            <section id="about" className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                            About Me
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-gray-300 font-light">
                            <p>
                                <strong className="text-white font-semibold">I never give up ; consistency is my core trait.</strong>
                            </p>
                            <p>
                                I loved Physics, Chemistry, Maths and JEE during school. Now, I am deeply into coding, Linux, system programming, and backend engineering.
                            </p>
                            <p>
                                I enjoy building things from scratch : shells, servers, full-stack apps, etc. I am a big fan of Linux, terminals, open-source, C, and Rust-style low-level thinking.
                            </p>
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
