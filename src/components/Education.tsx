"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
    {
        institution: "Dwarkadas J. Sanghvi College of Engineering",
        location: "Mumbai, Maharashtra",
        degree: "B.Tech in Computer Science",
        period: "Aug. 2023 – Present",
        cgpa: "CGPA: 8.73"
    },
    {
        institution: "SVKM's Mithibai College of Arts",
        location: "Mumbai, Maharashtra",
        degree: "HSC – Maharashtra Board (PCM)",
        period: "Aug. 2021 – May 2023",
        cgpa: "Score: 89.67%"
    }
];

export default function Education() {
    const { mode } = useTheme();

    if (mode === "3d") {
        return (
            <section id="education" className="py-24 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="hud-label">ACADEMY_LOGS</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-4 glow-heading">
                            Education
                        </h2>
                    </div>
                    
                    <div className="space-y-6">
                        {educationData.map((edu, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`glass-hud p-6 ${idx === 0 ? "planet-gold" : "planet-blue"}`}
                            >
                                {/* Institution */}
                                <h3 className="text-xl font-bold mb-2">
                                    <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                                        {edu.institution}
                                    </span>
                                </h3>
                                
                                {/* Degree & Location */}
                                <p className="text-slate-300 mb-4">{edu.degree}</p>
                                
                                {/* Stats pills */}
                                <div className="flex flex-wrap gap-3">
                                    <span className="stat-pill border-amber-500/30 text-amber-400">
                                        {edu.period}
                                    </span>
                                    <span className="stat-pill border-cyan-500/30 text-cyan-400">
                                        {edu.cgpa}
                                    </span>
                                    <span className="stat-pill">
                                        {edu.location}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (mode === "gui") {
        return (
            <section id="education" className="py-24 px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-4xl font-bold mb-10 text-center text-gradient flex items-center justify-center gap-3">
                            <GraduationCap className="w-8 h-8" /> Education
                        </h2>
                        <div className="space-y-5">
                            {educationData.map((edu, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-card p-5"
                                >
                                    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                                            <p className="text-[var(--secondary)]">{edu.degree}</p>
                                            <p className="text-sm text-[var(--text-muted)]">{edu.location}</p>
                                        </div>
                                        <span className="text-sm font-mono text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="font-mono">
                                        <span className="text-gradient font-semibold">{edu.cgpa}</span>
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="py-20 px-4 md:px-20 max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-2">
                <span className="text-terminal-cyan">➜</span>
                <span className="text-terminal-green">~</span>
                <span className="text-white">cat education.txt</span>
            </div>

            <div className="space-y-4 font-mono">
                {educationData.map((edu, idx) => (
                    <div key={idx} className="border border-terminal-muted/30 p-4 hover:bg-white/5 transition-colors">
                        <div className="flex justify-between text-terminal-green mb-2 flex-wrap gap-2">
                            <span>{edu.institution}</span>
                            <span className="text-terminal-muted">{edu.period}</span>
                        </div>
                        <div className="text-terminal-muted text-sm mb-1">{edu.degree}</div>
                        <div className="text-terminal-cyan text-sm">{edu.cgpa}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}