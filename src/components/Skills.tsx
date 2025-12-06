"use client";

import { useTheme } from "@/context/ThemeContext";
import { Folder, ChevronRight, ChevronDown, FileCode, Cpu, Database, Globe, Wrench } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = [
    {
        category: "Programming",
        icon: Cpu,
        items: ["C", "Java", "Python"],
        color: "text-green-400",
        bg: "bg-green-500/10"
    },
    {
        category: "Web",
        icon: Globe,
        items: ["React", "Next.js", "FastAPI", "Flask"],
        color: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    {
        category: "Databases",
        icon: Database,
        items: ["PostgreSQL", "MongoDB", "MySQL"],
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
    },
    {
        category: "GenAI",
        icon: Cpu,
        items: ["LangChain", "LangGraph", "MCP"],
        color: "text-teal-400",
        bg: "bg-teal-500/10"
    },
    {
        category: "DevTools",
        icon: Wrench,
        items: ["Git", "Docker", "VS Code", "Linux"],
        color: "text-green-300",
        bg: "bg-green-400/10"
    },
];

export default function Skills() {
    const { mode } = useTheme();
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

    const toggleFolder = (category: string) => {
        setOpenFolders((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    if (mode === "gui") {
        return (
            <section id="skills" className="py-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold mb-12 text-center text-white"
                    >
                        Technical Arsenal
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillsData.map((skill, idx) => (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden hover:bg-white/10 transition-colors"
                            >
                                {/* Glow Effect - Subtle 5% opacity to match "Selected Works" or be softer */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${skill.bg}`}>
                                        <skill.icon size={24} className={skill.color} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">{skill.category}</h3>
                                </div>
                                <div className="relative z-10 flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span key={item} className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm font-medium border border-white/5 hover:border-white/20 hover:text-[var(--primary)] transition-colors cursor-default">
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
                <p>4 directories, {skillsData.reduce((acc, curr) => acc + curr.items.length, 0)} files</p>
            </div>
        </section>
    );
}
