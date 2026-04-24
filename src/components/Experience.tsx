"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Briefcase, Award } from "lucide-react";

const workExperience = [
    {
        company: "Aahaanya Creatives",
        role: "Freelance Web Developer",
        period: "June 2025 - Sept 2025",
        description: "Built production-ready Next.js website with SSR for SEO. Integrated GCP NoSQL database, AWS S3 media storage, end-to-end deployment."
    },
    {
        company: "Prism",
        role: "Co-Founder (Tech)",
        period: "June 2025 - Present",
        description: "Leading backend architecture for AI image sharing app. Designed scalable cloud infrastructure on AWS, Cloudflare, Supabase. Engineered secure integrations."
    }
];

const achievements = [
    { title: "JEE Main 2023", desc: "AIR 6934 (99.4 percentile, top 0.6%)", icon: "🏆" },
    { title: "JEE Advanced 2023", desc: "AIR 11640 (top 6.5%)", icon: "⭐" },
    { title: "Operating Systems", desc: "99/100 (Highest in batch of 206)", icon: "📚" },
    { title: "CodeChef", desc: "3-Star (Max 1627, top 10%)", icon: "👨‍💻" },
    { title: "LeetCode", desc: "400+ Problems Solved", icon: "🧠" }
];

export default function Experience() {
    const { mode } = useTheme();

    if (mode === "3d") {
        return (
            <section id="experience" className="py-24 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold glow-heading tracking-tight">
                            Experience
                        </h2>
                    </div>
                    
                    {/* Timeline */}
                    <div className="relative pl-8">
                        <div className="timeline-line" />
                        
                        {workExperience.map((exp, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-hud p-5 mb-6 relative"
                            >
                                {/* Role */}
                                <h3 className="text-xl font-semibold mb-1">
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                        {exp.role}
                                    </span>
                                </h3>
                                
                                {/* Company */}
                                <p className="text-slate-300 font-mono mb-2">{exp.company}</p>
                                
                                {/* Stardate */}
                                <p className="text-sm text-cyan-400/60 font-mono mb-3">
                                    STARDATE: {exp.period.replace(/[- ]/g, ".")}
                                </p>
                                
                                {/* Description with terminal prefix */}
                                <div className="text-slate-300 text-sm space-y-1">
                                    <p>&gt; {exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Achievements */}
                    <div className="mt-12">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-semibold glow-heading">
                                Achievements
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {achievements.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 + 0.3 }}
                                    className="glass-hud flex items-center gap-4 p-4"
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <div className="font-semibold text-white">{item.title}</div>
                                        <div className="text-sm text-cyan-400/80">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (mode === "gui") {
        return (
            <section id="experience" className="py-24 px-4 relative z-10">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Work Experience */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-4xl font-bold mb-10 text-center text-gradient flex items-center justify-center gap-3">
                            <Briefcase className="w-8 h-8" /> Experience
                        </h2>
                        <div className="space-y-5">
                            {workExperience.map((exp, idx) => (
                                <motion.div 
                                    key={idx} 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-card p-5"
                                >
                                    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                            <p className="text-[var(--secondary)]">{exp.company}</p>
                                        </div>
                                        <span className="text-sm font-mono text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-[var(--text-secondary)]">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-bold mb-10 text-center text-gradient flex items-center justify-center gap-3">
                            <Award className="w-8 h-8" /> Achievements
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {achievements.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 + 0.3 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="glass-card flex items-center gap-4 p-4"
                                >
                                    <span className="text-3xl">{item.icon}</span>
                                    <div>
                                        <div className="font-semibold text-white">{item.title}</div>
                                        <div className="text-sm text-[var(--secondary)]">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="py-24 px-4 md:px-20 max-w-5xl mx-auto space-y-12">
            
            {/* Work Experience Window */}
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
                        <span className="text-white">experience.log</span>
                        <span className="w-2.5 h-5 bg-terminal-green/80 animate-pulse ml-1 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    </div>

                    <div className="pl-4 border-l border-terminal-cyan/20 ml-2 space-y-8">
                        {workExperience.map((exp, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="group/exp relative"
                            >
                                <div className="absolute -left-[21px] top-3 w-2 h-2 rounded-full bg-terminal-cyan/30 group-hover/exp:bg-terminal-green shadow-[0_0_10px_rgba(74,222,128,0)] group-hover/exp:shadow-[0_0_10px_rgba(74,222,128,0.8)] transition-all duration-300"></div>
                                <div className="text-terminal-cyan/50 text-xs mb-2 uppercase tracking-widest font-bold">0{idx + 1} // {exp.period}</div>
                                
                                <div className="bg-white/5 p-5 rounded-r-md border-l-2 border-transparent group-hover/exp:border-terminal-green transition-all duration-300 hover:bg-terminal-green/5">
                                    <h3 className="text-lg font-bold text-slate-200 group-hover/exp:text-white flex items-center gap-2">
                                        <span className="text-terminal-green opacity-0 group-hover/exp:opacity-100 transition-opacity">➜</span>
                                        {exp.role} @ <span className="text-terminal-cyan">{exp.company}</span>
                                    </h3>
                                    <div className="text-terminal-muted mt-3 space-y-1.5 font-light pl-6 group-hover/exp:pl-8 transition-all duration-300">
                                        <p>&gt; {exp.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Achievements Window */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
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
                        <span className="text-terminal-cyan ml-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">./show_achievements.sh</span>
                        <span className="text-terminal-muted ml-1">--all</span>
                        <span className="w-2.5 h-5 bg-terminal-green/80 animate-pulse ml-1 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    </div>

                    <div className="overflow-x-auto border border-terminal-cyan/20 rounded-lg">
                        <table className="w-full text-left font-mono border-collapse">
                            <thead>
                                <tr className="bg-terminal-cyan/10 border-b border-terminal-cyan/20 text-terminal-cyan/80 text-xs uppercase tracking-widest font-bold">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Achievement</th>
                                    <th className="p-4">Stats/Rank</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {achievements.map((item, idx) => (
                                    <tr key={idx} className="border-b border-terminal-cyan/5 hover:bg-terminal-cyan/5 transition-colors group/row">
                                        <td className="p-4 text-terminal-muted group-hover/row:text-white transition-colors">0x0{idx + 1}</td>
                                        <td className="p-4 flex items-center gap-3">
                                            <span className="text-xl group-hover/row:scale-110 transition-transform">{item.icon}</span>
                                            <span className="text-slate-300 group-hover/row:text-white transition-colors">{item.title}</span>
                                        </td>
                                        <td className="p-4 text-terminal-cyan group-hover/row:text-terminal-green transition-colors drop-shadow-[0_0_2px_rgba(34,211,238,0.5)]">
                                            {item.desc}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
