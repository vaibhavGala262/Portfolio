"use client";

import { useTheme } from "@/context/ThemeContext";
import { Folder, ChevronRight, ChevronDown, FileCode, Cpu, Database, Globe, Wrench } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = [
    {
        category: "Programming & CS",
        icon: Cpu,
        items: ["C", "Java", "Python", "Data Structures", "Algorithms", "OOP"],
        color: "text-green-400",
        bg: "bg-green-500/10"
    },
    {
        category: "Web & Frameworks",
        icon: Globe,
        items: ["React", "Next.js", "TypeScript", "Vite", "FastAPI", "Flask", "Spring Boot"],
        color: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        category: "Databases",
        icon: Database,
        items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Redis", "ChromaDB"],
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
    },
    {
        category: "GenAI & LLMs",
        icon: Cpu,
        items: ["LangChain", "LangGraph", "MCP", "HuggingFace", "LLaMA", "Gemini", "DeepSeek"],
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        category: "DevOps & Cloud",
        icon: Wrench,
        items: ["Git", "Docker", "AWS", "GCP", "Firebase", "Vercel", "Render"],
        color: "text-orange-400",
        bg: "bg-orange-500/10"
    },
    {
        category: "Dev Tools",
        icon: Folder,
        items: ["VS Code", "Postman", "Linux", "ApacheBench", "Prometheus"],
        color: "text-green-300",
        bg: "bg-green-400/10"
    }
];

export default function Skills() {
    const { mode } = useTheme();
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

    const toggleFolder = (category: string) => {
        setOpenFolders((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    if (mode === "3d") {
        return (
            <section id="skills" className="py-24 px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold glow-heading tracking-tight">
                            Technical Arsenal
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {skillsData.map((skill, idx) => (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.08, duration: 0.4 }}
                                whileHover={{ y: -5 }}
                                className="glass-hud p-5"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${skill.bg}`}>
                                        <skill.icon size={20} className={skill.color} />
                                    </div>
                                    <h3 className="text-sm font-mono text-cyan-400 tracking-wider uppercase">
                                        {skill.category}
                                    </h3>
                                </div>
                                
                                {/* Skill tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {skill.items.map((item) => (
                                        <span key={item} className="tag-glass text-xs">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Progress bar - hardcoded per category */}
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill" 
                                        style={{ 
                                            width: skill.category === "Programming & CS" ? "90%" :
                                                  skill.category === "Web & Frameworks" ? "85%" :
                                                  skill.category === "Databases" ? "75%" :
                                                  skill.category === "GenAI & LLMs" ? "70%" :
                                                  skill.category === "DevOps & Cloud" ? "80%" : "85%"
                                        }} 
                                    />
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
            <section id="skills" className="py-24 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient"
                    >
                        Technical Arsenal
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {skillsData.map((skill, idx) => (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.08, duration: 0.4 }}
                                whileHover={{ y: -5 }}
                                className="glass-card group p-5"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${skill.bg}`}>
                                        <skill.icon size={22} className={skill.color} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-colors">{skill.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span key={item} className="tag-glass">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="py-20 px-4 md:px-20 max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
                <span className="text-terminal-cyan">➜</span>
                <span className="text-terminal-green">~</span>
                <span className="text-white">tree skills/</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsData.map((skill) => {
                    const isOpen = openFolders[skill.category] || false;
                    return (
                        <div key={skill.category} className="font-mono">
                            <div
                                onClick={() => toggleFolder(skill.category)}
                                className="flex items-center gap-2 cursor-pointer group select-none"
                            >
                                {isOpen ? <ChevronDown size={16} className="text-terminal-muted" /> : <ChevronRight size={16} className="text-terminal-muted" />}
                                <Folder size={20} className="text-blue-400 group-hover:text-blue-300 transition-colors" fill="currentColor" fillOpacity={0.2} />
                                <span className="text-terminal-green font-bold group-hover:underline decoration-terminal-cyan underline-offset-4">
                                    {skill.category}
                                </span>
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="ml-6 border-l border-terminal-muted/20 pl-4 mt-2 mb-4 space-y-1 overflow-hidden"
                                    >
                                        {skill.items.map((item) => (
                                            <div key={item} className="flex items-center gap-2 text-terminal-muted hover:text-white transition-colors cursor-default">
                                                <FileCode size={14} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-terminal-muted text-sm">
                <p>6 directories, {skillsData.reduce((acc, curr) => acc + curr.items.length, 0)} files</p>
            </div>
        </section>
    );
}
