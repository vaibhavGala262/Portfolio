export const COMMANDS = {
    help: `
<table class="w-full text-left border-collapse font-mono text-xs sm:text-sm md:text-base whitespace-nowrap">
  <thead>
    <tr class="bg-terminal-green text-black uppercase tracking-wider">
      <th class="py-1 px-2 font-bold w-32">Command</th>
      <th class="py-1 px-2 font-bold">Description</th>
    </tr>
  </thead>
  <tbody class="text-terminal-muted">
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">help</td><td class="py-1 px-2">Show this help message</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">whoami</td><td class="py-1 px-2">About me</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">about</td><td class="py-1 px-2">Jump to About section</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">education</td><td class="py-1 px-2">Jump to Education details</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">skills</td><td class="py-1 px-2">Technical skills readout</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">projects</td><td class="py-1 px-2">My projects portfolio</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">experience</td><td class="py-1 px-2">Work experience logs</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">neofetch</td><td class="py-1 px-2">System information</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">matrix</td><td class="py-1 px-2">Wake up, Neo...</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">gui</td><td class="py-1 px-2">Switch to standard GUI Mode</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">3d</td><td class="py-1 px-2">Launch Celestial 3D Universe</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">top</td><td class="py-1 px-2">Active system processes</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">tree</td><td class="py-1 px-2">View directory structure</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">ls</td><td class="py-1 px-2">List files</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">cat</td><td class="py-1 px-2">Read file content</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">download</td><td class="py-1 px-2">download --resume</td>
    </tr>
    <tr class="hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-white font-bold">clear</td><td class="py-1 px-2">Clear terminal</td>
    </tr>
  </tbody>
</table>`,
    whoami: "Vaibhav Gala - System Developer & Architect | B.Tech CS @ DJ Sanghvi (CGPA 8.73)",
    contact: "Email: vaibhavgala262@gmail.com | LinkedIn: Vaibhav Gala | GitHub: @vaibhavGala262",
    ls: "about.txt  education.txt  skills/  projects/  experience.log  start.sh",
    skills: `
=== TECHNICAL ARSENAL ===

[Programming & CS]
  C, Java, Python, DSA, Algorithms, OOP

[Web & Frameworks]  
  React, Next.js, TypeScript, Vite, FastAPI, Flask, Spring Boot

[Databases]
  PostgreSQL, MySQL, MongoDB, Supabase, Redis, ChromaDB

[GenAI & LLMs]
  LangChain, LangGraph, MCP, HuggingFace, LLaMA, Gemini, DeepSeek

[DevOps & Cloud]
  Git, Docker, AWS, GCP, Firebase, Vercel, Render
`,
    projects: `
=== SELECTED WORKS ===

[1] InternConnect     - AI internship platform (Next.js, FastAPI, LangGraph)
[2] NutShell         - Unix shell in C (pipelines, I/O redirection)
[3] SnapLink         - URL shortener (2.8M redirects/day, Redis cache)
[4] Viper            - HTTP server in C (epoll, 50k+ concurrent)

Type 'projects --details' for more info
`,
    education: `
=== EDUCATION ===

[1] B.Tech CS @ DJ Sanghvi College
    CGPA: 8.73 | Aug 2023 - Present

[2] HSC (PCM) @ Mithibai College
    Score: 89.67% | Aug 2021 - May 2023
`,
    experience: `
=== EXPERIENCE ===

[1] Aahaanya Creatives | Freelance Web Developer
    Jun 2025 - Sept 2025
    Next.js SSR, GCP NoSQL, AWS S3

[2] Prism (Co-Founder - Tech)
    Jun 2025 - Present
    AI image sharing app, AWS, Supabase, FastAPI
`,
    gui: "Switching to GUI Mode...",
    "3d": "Launching Celestial Universe...",
    clear: "CLEAR",
    matrix: "Wake up, Neo...",
    top: `
<table class="w-full text-left border-collapse mt-2 text-sm md:text-base">
  <thead>
    <tr class="bg-terminal-green text-black font-bold">
      <th class="py-1 px-2">PID</th>
      <th class="py-1 px-2">USER</th>
      <th class="py-1 px-2">PR</th>
      <th class="py-1 px-2">NI</th>
      <th class="py-1 px-2">VIRT</th>
      <th class="py-1 px-2">RES</th>
      <th class="py-1 px-2">SHR</th>
      <th class="py-1 px-2">S</th>
      <th class="py-1 px-2">%CPU</th>
      <th class="py-1 px-2">%MEM</th>
      <th class="py-1 px-2">TIME+</th>
      <th class="py-1 px-2">COMMAND</th>
    </tr>
  </thead>
  <tbody class="text-terminal-cyan/90 font-mono">
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2">262</td>
      <td class="py-1 px-2">vaibhav</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">1.2g</td>
      <td class="py-1 px-2">420m</td>
      <td class="py-1 px-2">88m</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2">4.3</td>
      <td class="py-1 px-2">2.4</td>
      <td class="py-1 px-2">0:12.42</td>
      <td class="py-1 px-2 text-white">Brain.exe</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2">101</td>
      <td class="py-1 px-2">vaibhav</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">850m</td>
      <td class="py-1 px-2">120m</td>
      <td class="py-1 px-2">45m</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2 text-green-400">1.2</td>
      <td class="py-1 px-2">0.8</td>
      <td class="py-1 px-2">0:05.10</td>
      <td class="py-1 px-2 text-white">Coffee_Eng</td>
    </tr>
    <tr class="border-b border-terminal-cyan/10 hover:bg-terminal-cyan/10">
      <td class="py-1 px-2 text-orange-400">404</td>
      <td class="py-1 px-2 text-orange-400">root</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2 text-red-400">0.0</td>
      <td class="py-1 px-2 text-red-400">0.0</td>
      <td class="py-1 px-2">0:00.00</td>
      <td class="py-1 px-2 text-white font-bold">Curiosity_d</td>
    </tr>
    <tr class="hover:bg-terminal-cyan/10">
      <td class="py-1 px-2">888</td>
      <td class="py-1 px-2">vaibhav</td>
      <td class="py-1 px-2">20</td>
      <td class="py-1 px-2">0</td>
      <td class="py-1 px-2">500m</td>
      <td class="py-1 px-2">90m</td>
      <td class="py-1 px-2">30m</td>
      <td class="py-1 px-2">S</td>
      <td class="py-1 px-2">0.8</td>
      <td class="py-1 px-2">0.5</td>
      <td class="py-1 px-2">0:08.15</td>
      <td class="py-1 px-2 text-white">React_Run</td>
    </tr>
  </tbody>
</table>
`,
    tree: `
<div class="font-mono text-sm md:text-base leading-none">
  <div><span class="text-blue-400 font-bold">.</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-white">about.txt</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-white">education.txt</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-white">experience.log</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-green-400 font-bold">start.sh</span></div>
  <div><span class="text-terminal-muted">├──</span> <span class="text-blue-400 font-bold">projects/</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">internconnect.py</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">NutShell.c</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">SnapLink.java</span></div>
  <div><span class="text-terminal-muted">│&nbsp;&nbsp;&nbsp;└──</span> <span class="text-white">Viper.c</span></div>
  <div><span class="text-terminal-muted">└──</span> <span class="text-blue-400 font-bold">skills/</span></div>
  <div><span class="text-terminal-muted">&nbsp;&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">Languages.json</span></div>
  <div><span class="text-terminal-muted">&nbsp;&nbsp;&nbsp;&nbsp;├──</span> <span class="text-white">Frameworks.json</span></div>
  <div><span class="text-terminal-muted">&nbsp;&nbsp;&nbsp;&nbsp;└──</span> <span class="text-white">Cloud.json</span></div>
</div>
`,
    neofetch: `
        /\\        OS: PortfolioOS v2.0
       /  \\       Kernel: Linux 6.8.0-vaibhav
      / /\\ \\      Uptime: 21 years
     / /  \\ \\     Shell: NutShell v1.0
    / /    \\ \\    Resolution: 1920x1080
   / /      \\ \\   Theme: Cyberpunk Neon
  /_/        \\_\\  Font: Fira Code | CPU: 2.8M req/day
`
};

export const VIRTUAL_FS: Record<string, Record<string, { type: "file" | "dir", content?: string }>> = {
    "~": {
        "about.txt": { type: "file", content: COMMANDS.whoami },
        "education.txt": { type: "file", content: COMMANDS.education },
        "experience.log": { type: "file", content: COMMANDS.experience },
        "start.sh": { type: "file", content: "bash: ./start.sh: Permission denied" },
        "projects": { type: "dir" },
        "skills": { type: "dir" }
    },
    "~/projects": {
        "internconnect.py": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-purple-400">def</span> <span class="text-blue-400 font-bold">internconnect</span>():
    <span class="text-green-400">"""
    InternConnect - AI-powered Internship Platform
    Tech Stack: Python, FastAPI, Next.js, LangGraph
    ================================================
    Matches students with top startups using an AI graph reasoning engine.
    Analyzes CVs, matches job requirements, and generates custom pathways.
    """</span>
    print(<span class="text-yellow-400">"Deploying to production..."</span>)
    <span class="text-purple-400">return</span> <span class="text-orange-400">True</span>
</div>` },
        "NutShell.c": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-purple-400">int</span> <span class="text-blue-400 font-bold">main</span>(<span class="text-purple-400">int</span> argc, <span class="text-purple-400">char</span> **argv) {
    <span class="text-green-400">/* NutShell - Custom UNIX shell (C) */</span>
    <span class="text-green-400">/* Supports pipelines, I/O redirection, and signals */</span>
    printf(<span class="text-yellow-400">"Welcome to NutShell\\n"</span>);
    loop();
    <span class="text-purple-400">return</span> 0;
}
</div>` },
        "SnapLink.java": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-purple-400">public class</span> <span class="text-blue-400 font-bold">SnapLink</span> {
    <span class="text-green-400">// High-performance URL shortener processing 2.8M redirects/day.</span>
    <span class="text-green-400">// Tech: Java, Spring Boot, Redis, PostgreSQL</span>
    <span class="text-purple-400">public static void</span> <span class="text-blue-400">main</span>(String[] args) {
        System.out.println(<span class="text-yellow-400">"Cache hit ratio: 99.8%"</span>);
    }
}
</div>` },
        "Viper.c": { type: "file", content: `
<div class="text-terminal-cyan bg-black/40 p-4 rounded border border-terminal-cyan/20">
<span class="text-green-400">/* Viper - Ultra-fast HTTP server written in C using epoll. */</span>
<span class="text-green-400">/* Capable of handling over 50,000 concurrent connections. */</span>
listen_for_connections(PORT);
accept_and_serve();
</div>` }
    },
    "~/skills": {
        "Languages.json": { type: "file", content: "{\n  \"languages\": [\"C\", \"Java\", \"Python\", \"TypeScript\", \"Rust\"]\n}" },
        "Frameworks.json": { type: "file", content: "{\n  \"frameworks\": [\"React\", \"Next.js\", \"FastAPI\", \"Spring Boot\"]\n}" },
        "Cloud.json": { type: "file", content: "{\n  \"cloud\": [\"AWS\", \"GCP\", \"Docker\", \"Kubernetes\", \"Redis\"]\n}" }
    }
};
