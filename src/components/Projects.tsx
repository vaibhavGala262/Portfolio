"use client";

import { useTheme } from "@/context/ThemeContext";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
    {
        name: "InternConnect",
        tech: "Next.js, FastAPI, PostgreSQL, LangGraph, Supabase, WebSocket",
        description: "AI-powered internship platform enabling structured student-faculty collaboration. WebSocket real-time chat, LangGraph multi-agent chatbot, automated Excel export pipeline saving 30-40 min per batch.",
        github: "https://github.com/vaibhavGala262/InternConnect",
        live: null,
        date: "April 2025 - June 2025"
    },
    {
        name: "NutShell",
        tech: "C, POSIX, GNU Readline, Makefile",
        description: "Unix shell with pipelines (|), conditional operators (&&, ||), I/O redirection (>, >>, <). Process control using fork(), exec(), wait(), persistent history.",
        github: "https://github.com/vaibhavGala262/NutShell",
        live: null,
        date: "June 2025 - July 2025"
    },
    {
        name: "SnapLink",
        tech: "Spring Boot, Kafka, Redis, PostgreSQL, Prometheus",
        description: "URL shortener handling 2.8M redirects/day with 98.9% success rate under 10K concurrent requests. 100% Redis cache hit rate, Kafka async pipeline at 2,857 events/sec.",
        github: "https://github.com/vaibhavGala262/SnapLink",
        live: null,
        date: "Aug 2025 - Present"
    },
    {
        name: "Viper",
        tech: "C, Epoll, Makefile, ApacheBench",
        description: "Modular HTTP server with epoll-based event architecture. Handles 50k+ concurrent requests, response time reduced from 40s to 3.9s (ApacheBench).",
        github: "https://github.com/vaibhavGala262/Viper",
        live: null,
        date: "July 2025 - Aug 2025"
    }
];

export default function Projects() {
    const { mode } = useTheme();

    const projectsWithPlanets = [
        { ...projects[2], planet: "Rust Moon", color: "#f97316", colorClass: "planet-orange" }, // SnapLink
        { ...projects[3], planet: "Code Earth", color: "#22c55e", colorClass: "planet-green" }, // Viper
        { ...projects[0], planet: "Vaibhav Prime", color: "#ef4444", colorClass: "planet-red" }, // InternConnect
        { ...projects[1], planet: "Backend Ice", color: "#06b6d4", colorClass: "planet-cyan" }, // NutShell
    ];

    if (mode === "3d") {
        return (
            <section id="projects" className="py-24 px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold glow-heading tracking-tight">
                            Selected Works
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projectsWithPlanets.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                className={`glass-hud p-6 ${project.colorClass}`}
                            >
                                {/* Planet header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span 
                                        className="planet-dot" 
                                        style={{ backgroundColor: project.color, color: project.color }}
                                    />
                                    <span className="hud-label">
                                        MISSION: {project.planet}
                                    </span>
                                </div>
                                
                                {/* Project name */}
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {project.name}
                                </h3>
                                
                                {/* Tech stack */}
                                <p className="font-mono text-sm text-cyan-400/80 mb-4">
                                    {project.tech}
                                </p>
                                
                                {/* Description */}
                                <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                                    {project.description}
                                </p>
                                
                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.split(", ").slice(0, 4).map((tech) => (
                                        <span key={tech} className="tag-glass text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Action button */}
                                {project.github && (
                                    <a 
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-hud inline-flex items-center gap-2"
                                    >
                                        <ExternalLink size={14} />
                                        LAUNCH
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (mode === "gui") {
        return (
            <section id="projects" className="py-24 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient"
                    >
                        Selected Works
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8, rotateX: 2, rotateY: 2 }}
                                className="glass-card glass-card-glow group p-6 md:p-8"
                                style={{ perspective: 1000 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-colors">{project.name}</h3>
                                    <span className="text-xs font-mono text-[var(--text-muted)] px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                                        {project.date || "2025"}
                                    </span>
                                </div>
                                <p className="text-[var(--secondary)] font-mono text-sm mb-4">{project.tech}</p>
                                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{project.description}</p>

                                <div className="flex gap-3">
                                    {project.github && (
                                        <a 
                                            href={project.github} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tag-glass hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                        >
                                            <Github size={16} className="mr-2" />
                                            Source
                                        </a>
                                    )}
                                    {project.live && (
                                        <a 
                                            href={project.live} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tag-glass hover:bg-[var(--secondary)]/10 hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                                        >
                                            <ExternalLink size={16} className="mr-2" />
                                            Live
                                        </a>
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
