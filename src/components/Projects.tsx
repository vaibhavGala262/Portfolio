"use client";

import { useTheme } from "@/context/ThemeContext";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
    {
        name: "InternConnect",
        tech: "Next.js, FastAPI, PostgreSQL, LangGraph, Docker",
        description: "AI-powered internship platform. Features real-time chat, role-based access for students/faculty, and GenAI-driven guidance.",
        github: "https://github.com/vaibhavGala262/InternConnect",
        live: "https://intern-connect-virid.vercel.app"
    },
    {
        name: "NutShell",
        tech: "C, Linux System Calls, Make",
        description: "Feature-rich Unix shell with support for pipelines (|), redirections (>, <), background jobs (&), and custom signal handling.",
        github: "https://github.com/vaibhavGala262/NutShell",
        live: null
    },
    {
        name: "Viper",
        tech: "C, epoll, HTTP Parser",
        description: "High-performance event-driven HTTP server capable of handling thousands of concurrent connections using non-blocking I/O.",
        github: "https://github.com/vaibhavGala262/Viper",
        live: null
    },
    {
        name: "CodeSanitizer",
        tech: "TypeScript, VS Code API, Git Integration",
        description: "VS Code extension to automatically detect, highlight, and strip debug print statements (console.log, print) before commits.",
        github: "https://github.com/vaibhavGala262/CodeSanitizer",
        live: null
    }
];

export default function Projects() {
    const { mode } = useTheme();

    if (mode === "gui") {
        return (
            <section id="projects" className="py-20 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-16 text-center text-white tracking-tight"
                    >
                        Selected Works
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
                                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
                                style={{ perspective: 1000 }}
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-[var(--primary)] transition-colors">{project.name}</h3>
                                <p className="text-[var(--secondary)] font-mono text-sm mb-4">{project.tech}</p>
                                <p className="text-gray-300 mb-8 leading-relaxed text-lg">{project.description}</p>

                                <div className="flex gap-4 relative z-10">
                                    {project.github && (
                                        <Link href={project.github} className="p-2 rounded-full bg-white/10 hover:bg-[var(--primary)]/20 text-white hover:text-[var(--primary)] transition-all hover:scale-110">
                                            <Github size={20} />
                                        </Link>
                                    )}
                                    {project.live && (
                                        <Link href={project.live} className="p-2 rounded-full bg-[var(--secondary)]/20 hover:bg-[var(--secondary)]/40 text-[var(--secondary)] transition-all hover:scale-110">
                                            <ExternalLink size={20} />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 px-4 md:px-20 max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-2">
                <span className="text-terminal-cyan">➜</span>
                <span className="text-terminal-green">~</span>
                <span className="text-white">ls -la ./projects/</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.name} className="group border border-terminal-muted/30 hover:border-terminal-green/50 bg-[#0d1117]/50 p-5 transition-all hover:bg-[#161b22]">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-terminal-green group-hover:text-terminal-cyan transition-colors">
                                ./{project.name}
                            </h3>
                            <div className="text-terminal-muted text-xs">rwx-r-x</div>
                        </div>

                        <div className="text-sm text-terminal-cyan mb-3 font-mono">{project.tech}</div>
                        <p className="text-terminal-muted text-sm mb-4 leading-relaxed font-mono">
                            {project.description}
                        </p>

                        <div className="flex gap-4 text-sm mt-auto">
                            {project.github && (
                                <Link href={project.github} className="flex items-center gap-1 text-terminal-muted hover:text-white hover:underline decoration-terminal-green">
                                    [<Github size={14} className="inline mr-1" /> Source]
                                </Link>
                            )}
                            {project.live && (
                                <Link href={project.live} className="flex items-center gap-1 text-terminal-muted hover:text-white hover:underline decoration-terminal-green">
                                    [<ExternalLink size={14} className="inline mr-1" /> Deploy]
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
