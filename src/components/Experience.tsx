"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function Experience() {
    const { mode } = useTheme();

    if (mode === "gui") {
        return (
            <section id="experience" className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto space-y-20">

                    {/* Experience */}


                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-4xl font-bold mb-10 text-center text-white">Achievements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "JEE Main 2023", desc: "AIR 6934 (99.4 percentile)", icon: "🏆" },
                                { title: "JEE Advanced 2023", desc: "AIR 11640", icon: "⭐" },
                                { title: "MHT-CET 2023", desc: "99.3 percentile", icon: "🚀" },
                                { title: "CodeChef", desc: "3-Star (Max 1627)", icon: "👨‍💻" },
                                { title: "LeetCode", desc: "400+ Problems Solved", icon: "🧠" }
                            ].map((item, idx) => (
                                <div key={idx} className="group relative flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 overflow-hidden transition-colors">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <span className="relative z-10 text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                                    <div className="relative z-10">
                                        <div className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">{item.title}</div>
                                        <div className="text-sm text-[var(--secondary)]">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="py-20 px-4 md:px-20 max-w-5xl mx-auto">


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
                                <td className="p-3 border-b border-terminal-muted/30">MHT-CET 2023</td>
                                <td className="p-3 border-b border-terminal-muted/30 text-terminal-cyan">99.3%ile</td>
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
