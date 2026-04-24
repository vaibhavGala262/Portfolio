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
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold glow-heading tracking-tight">
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
        <section id="education" className="py-24 px-4 md:px-20 max-w-4xl mx-auto">
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
                    <div className="w-12"></div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base selection:bg-terminal-cyan/30 relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-terminal-green font-bold shadow-terminal-green/50">vaibhav@portfolio</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400 font-bold">~</span>
                        <span className="text-white">$</span>
                        <span className="text-terminal-cyan ml-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">cat</span>
                        <span className="text-white">education.json</span>
                        <span className="w-2.5 h-5 bg-terminal-green/80 animate-pulse ml-1 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    </div>

                    <div className="pl-4 border-l border-terminal-cyan/20 ml-2 space-y-8">
                        {educationData.map((edu, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="group/edu relative"
                            >
                                <div className="absolute -left-[21px] top-3 w-2 h-2 rounded-full bg-terminal-cyan/30 group-hover/edu:bg-terminal-green shadow-[0_0_10px_rgba(74,222,128,0)] group-hover/edu:shadow-[0_0_10px_rgba(74,222,128,0.8)] transition-all duration-300"></div>
                                <div className="text-terminal-cyan/50 text-xs mb-2 uppercase tracking-widest font-bold">0{idx + 1} // {edu.period}</div>
                                
                                <div className="bg-white/5 p-5 rounded-r-md border-l-2 border-transparent group-hover/edu:border-terminal-green transition-all duration-300 hover:bg-terminal-green/5">
                                    <h3 className="text-lg font-bold text-slate-200 group-hover/edu:text-white flex items-center gap-2">
                                        <span className="text-terminal-green opacity-0 group-hover/edu:opacity-100 transition-opacity">➜</span>
                                        {edu.institution}
                                    </h3>
                                    <div className="text-terminal-muted mt-3 space-y-1.5 font-light pl-6 group-hover/edu:pl-8 transition-all duration-300">
                                        <p><span className="text-purple-400">"degree"</span>: <span className="text-terminal-cyan">"{edu.degree}"</span>,</p>
                                        <p><span className="text-purple-400">"location"</span>: <span className="text-yellow-400">"{edu.location}"</span>,</p>
                                        <p><span className="text-purple-400">"metrics"</span>: <span className="text-green-400">"{edu.cgpa}"</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}