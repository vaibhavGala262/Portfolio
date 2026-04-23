# VAIBHAV GALA PORTFOLIO - Project Context

## 📋 PROJECT OVERVIEW

**Project Name:** Vaibhav Gala Portfolio  
**Type:** Interactive 3D Portfolio Website  
**Core:** Multi-theme portfolio showcasing skills as a Full Stack Developer with immersive 3D solar system cosmos mode  
**Live URL:** vaibhavgala.in (or similar)

---

## 🎯 PURPOSE

Showcase Vaibhav Gala as a Full Stack Developer through:
1. **Terminal Mode** - Retro hacker terminal aesthetic with commands
2. **Aurora GUI Mode** - Modern glassmorphism with cosmic cyan/purple gradients  
3. **3D Cosmos Mode** - Interactive solar system in Three.js with realistic planets

---

## 👤 PERSONA

**Vaibhav Gala**
- Full Stack Developer
- B.Tech CSE at LDRP-ITR (2022-2026)
- Skills: MERN, Next.js, TypeScript, Python, SQL, Docker, AWS
- Projects: SnapLink, Viper, Aahaanya, Prism
- Experience: Aahaanya (Full Stack Intern), Prism (Frontend Lead)

---

## 🏗️ TECH STACK

### Core
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables

### 3D & Animation
- **3D Engine:** React-Three-Fiber + Drei
- **Animation:** Framer Motion
- **Particles:** @react-three/postprocessing

### Dependencies
```json
{
  "three": "^0.172.0",
  "@react-three/fiber": "^9.0.0",
  "@react-three/drei": "^9.120.0",
  "@react-three/postprocessing": "^2.16.0",
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.468.0"
}
```

---

## 📁 PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx           # Main page (Hero + all sections)
│   ├── globals.css        # Global styles + 3D theme
│   └── not-found.tsx
├── components/
│   ├── Navbar.tsx        # Responsive nav with mode toggle
│   ├── Hero.tsx          # Hero section (adapts by mode)
│   ├── About.tsx         # About section
│   ├── Education.tsx      # Education section
│   ├── Skills.tsx        # Skills section (42 skills)
│   ├── Projects.tsx      # Projects section (4 projects)
│   ├── Experience.tsx   # Experience section
│   ├── Footer.tsx        # Footer
│   ├── ModeToggle.tsx    # Theme mode switcher
│   ├── Contact.tsx       # Contact section
│   ├── CosmosBackground.tsx  # 3D solar system
│   └── HeroCosmic.tsx   # 3D hero (currently unused)
├── context/
│   ├── ThemeContext.tsx  # Mode: terminal | gui | 3d
│   └── SoundContext.tsx # Click sounds
├── hooks/
│   └── useSound.ts
└── data/
    └── projects.ts       # Project data
```

---

## 🌐 MODES

### 1. TERMINAL MODE (Default)
- **Style:** Retro green-on-black hacker terminal
- **Font:** Fira Code (monospace)
- **Interaction:** Type commands (`help`, `skills`, `projects`, `education`, `run`)
- **Cursor:** Blinking green cursor
- **Background:** Pure black (#0a0a0f)

### 2. AURORA GUI MODE
- **Style:** Modern glassmorphism
- **Colors:** Cyan (#22d3ee), Purple (#a855f7), Pink (#f472b6)
- **Cards:** Glass cards with backdrop blur
- **Background:** Deep space gradient (#050508)
- **Font:** Plus Jakarta Sans
- **Effects:** Glows, gradients, animations

### 3. 3D COSMOS MODE
- **Style:** Interactive 3D solar system
- **Background:** Three.js canvas with stars, nebula
- **Planets:** 6 realistic planets with materials/lighting
- **Interaction:** Drag to rotate, scroll to zoom
- **Font:** Space-themed headings
- **Colors:** Cyan (#06b6d4), Purple (#8b5cf6), Pink (#ec4899)

---

## 🪐 3D COSMOS - SOLAR SYSTEM

### Planets (Most Recent)
| Planet | Color | Features |
|--------|-------|----------|
| Vaibhav Prime | Red (#ef4444) | Atmosphere layer, emissive glow |
| Systems World | Blue (#3b82f6) | Saturn rings, tilted axis (23°) |
| Code Earth | Green (#22c55e) | Earth-like with atmosphere |
| Rust Moon | Orange (#f97316) | Small, fast rotation |
| Linux Giant | Gold (#eab308) | Large planet, beautiful rings |
| Backend Ice | Cyan (#06b6d4) | Ice giant atmosphere |

### Sun
- Emissive yellow-orange core
- Multi-layer corona (pulsing)
- Point light illuminating planets

### Environment
- Starfield (2000+ stars)
- Nebula clouds
- Asteroid belt
- Ambient + point lighting

---

## 📦 SECTIONS

### Hero
- **Terminal:** ASCII art title + typing effect
- **GUI:** Gradient text + buttons
- **3D:** Clean title "VAIBHAV GALA" + CTA buttons

### About
- Brief bio + photo
- Adapts styling by mode

### Education
- LDRP-ITR (2022-2026)
- GPA: 8.5+
- Course: B.Tech CSE

### Skills (42 total)
**Frontend:** React, Next.js, TypeScript, Tailwind, Framer Motion, Three.js, Redux, HTML/CSS, JavaScript

**Backend:** Node.js, Express, Python, PostgreSQL, MongoDB, REST APIs, GraphQL

**Tools:** Git, Docker, AWS, VS Code, Figma, Linux, Vim, npm

### Projects (4)
1. **SnapLink** - URL shortener (MERN + Docker)
2. **Viper** - Resume builder (React + PDF)
3. **Aahaanya** - E-commerce (Full Stack)
4. **Prism** - Video streaming (Frontend lead)

### Experience
- **Aahaanya** - Full Stack Developer Intern (2024)
- **Prism** - Frontend Team Lead

### Contact
- Email, GitHub, LinkedIn, Twitter links

---

## 🎨 DESIGN SYSTEM

### CSS Variables (globals.css)
```css
:root {
  --primary: #22d3ee;    /* Cyan */
  --secondary: #a855f7;  /* Purple */
  --accent: #f472b6;      /* Pink */
  --bg-base: #050508;
  --bg-card: rgba(20, 20, 35, 0.6);
  --text-primary: #f8fafc;
  --border-subtle: rgba(255, 255, 255, 0.08);
}

[data-mode="3d"] {
  --primary: #06b6d4;
  --secondary: #8b5cf6;
  --bg-base: #000005;
}
```

### Components
- **Glass Card:** backdrop-blur-md, border, subtle glow
- **Gradient Text:** background-clip text
- **Tag Glass:** glowing tags
- **Buttons:** btn-glow (gradient), btn-ghost (outline)

---

## 🔄 THEME CYCLING

```typescript
// ThemeContext.tsx
type ThemeMode = "terminal" | "gui" | "3d";

const toggleMode = () => {
  if (prev === "terminal") return "gui";
  if (prev === "gui") return "3d";
  return "terminal";
};
```

---

## 🎯 CURRENT STATE (April 2026)

### ✅ Working
- Terminal mode fully functional with commands
- Aurora GUI mode with glassmorphism
- 3D Cosmos mode with solar system background
- All sections displaying
- Responsive mobile navbar + footer
- Build passes: `npm run build`

### ⚠️ Issues / In Progress
- 3D mode sections still use terminal/GUI styling (need space-themed)
- HeroCosmic component unused (commented out - too messy)
- Need 3D mode-specific styling/theme

### 🚧 Next Steps
1. Update all sections to support 3D mode with space-themed styling
2. Create minimal 3D hero (clean, no floating text)
3. Add realistic planet textures (optional)
4. Optimize for mobile performance

---

## 📝 COMMANDS (Terminal Mode)

```
help        - Show all commands
skills      - Display skill tree
projects    - List projects
education   - Show education
experience  - Show work experience
contact    - Display contact info
clear      - Clear terminal
run        - Run special animation
theme      - Switch theme
whoami     - About Vaibhav
```

---

## 🔧 BUILD & RUN

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

---

## 📄 KEY FILES

| File | Purpose |
|------|---------|
| ThemeContext.tsx | Mode state & toggling |
| CosmosBackground.tsx | 3D solar system |
| Hero.tsx | Hero section |
| globals.css | All themes & styles |
| Navbar.tsx | Navigation + mode toggle |
| Layout.tsx | Providers wrapper |

---

## 🎭 ANIMATIONS

- **Page Load:** Staggered fade-in
- **Hover Effects:** Scale + glow
- **Mode Switch:** Smooth transitions
- **3D Planets:** Auto-rotate + drag rotation
- **Terminal:** Typing effect + blinking cursor
- **Cards:** Hover lift + border glow

---

## 📱 RESPONSIVE

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Hamburger menu on mobile
- Stacked layouts on small screens

---

## 🚀 HOSTING

- Platform: Vercel (recommended)
- Build: Next.js static export possible
- Domain: vaibhavgala.in

---

## 📌 NOTES FOR AI/DEVELOPER

1. **Theme system:** 3 modes (terminal/gui/3d) - each section needs adaptation
2. **3D dependencies:** three, @react-three/fiber, @react-three/drei
3. **Build status:** Passes currently
4. **3D Hero:** Currently minimal text (HeroCosmic unused)
5. **Goal:** Make 3D mode feel fully immersive with matching section styles

---

## 🛠️ RECENT CHANGES

1. Updated CosmosBackground with 6 realistic planets
2. Added planet materials, atmospheres, rings
3. Created 3D mode theme in CSS
4. Updated ThemeContext with data-mode attribute
5. Cleaned up Hero.tsx for minimal 3D
6. Created space-themed section styling

---

*Last Updated: April 2026*