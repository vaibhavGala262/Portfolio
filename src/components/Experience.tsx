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
        <section id="experience" className="py-20 px-4 md:px-20 max-w-5xl mx-auto">

            {/* Work Experience Terminal */}
            <div className="mb-12">
                <div className="mb-6 flex items-center gap-2">
                    <span className="text-terminal-cyan">➜</span>
                    <span className="text-terminal-green">~</span>
                    <span className="text-white">cat experience.txt</span>
                </div>

                <div className="space-y-4 font-mono">
                    {workExperience.map((exp, idx) => (
                        <div key={idx} className="border border-terminal-muted/30 p-4 hover:bg-white/5 transition-colors">
                            <div className="flex justify-between text-terminal-green mb-2">
                                <span>{exp.role} @ {exp.company}</span>
                                <span className="text-terminal-muted">{exp.period}</span>
                            </div>
                            <div className="text-terminal-muted text-sm">{exp.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div>
                <div className="mb-6 flex items-center gap-2">
                    <span className="text-terminal-cyan">➜</span>
                    <span className="text-terminal-green">~</span>
                    <span className="text-white">./show_achievements.sh --all</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono border-collapse border border-terminal-muted/30">
                        <thead>
                            <tr className="bg-terminal-border/50 text-terminal-green">
                                <th className="p-3 border-b border-terminal-muted/30">ID</th>
                                <th className="p-3 border-b border-terminal-muted/30">Achievement</th>
                                <th className="p-3 border-b border-terminal-muted/30">Stats/Rank</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-muted">0x01</td>
                                <td className="p-3 border-b border-terminal-muted/30">JEE Main 2023</td>
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-cyan">AIR 6934 (99.4%ile)</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-muted">0x02</td>
                                <td className="p-3 border-b border-terminal-muted/30">JEE Advanced 2023</td>
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-cyan">AIR 11640</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-muted">0x03</td>
                                <td className="p-3 border-b border-terminal-muted/30">Operating Systems</td>
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-cyan">99/100 (Highest in batch)</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-muted">0x04</td>
                                <td className="p-3 border-b border-terminal-muted/30">CodeChef Rating</td>
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-cyan">3-Star (1627)</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-muted">0x05</td>
                                <td className="p-3 border-b border-terminal-muted/30">LeetCode Solved</td>
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-cyan">400+ Problems</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
