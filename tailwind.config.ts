import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Map terminal colors to CSS variables defined in globals.css
                "terminal-green": "var(--primary)",
                "terminal-cyan": "var(--secondary)",
                "terminal-black": "#0d1117",
                "terminal-muted": "#6e7681",
            },
        },
    },
    plugins: [],
};
export default config;
