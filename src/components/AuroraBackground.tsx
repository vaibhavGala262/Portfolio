"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
    return (
        <div className="aurora-bg pointer-events-none">
            <motion.div 
                className="aurora-orb aurora-orb-1"
                animate={{ 
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />
            <motion.div 
                className="aurora-orb aurora-orb-2"
                animate={{ 
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />
            <motion.div 
                className="aurora-orb aurora-orb-3"
                animate={{ 
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.08, 1]
                }}
                transition={{ 
                    duration: 18, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />
            <div className="aurora-noise" />
        </div>
    );
}