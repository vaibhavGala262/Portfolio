"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

// ─── MODULE-LEVEL PLANET POSITIONS ───────────────────────────────────────────
// Updated every frame via getWorldPosition — zero GC, shareable across components
const _planetPos: Record<string, THREE.Vector3> = {};
const ORIGIN = new THREE.Vector3(0, 0, 0);

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface FocusPlanet {
  name: string;
  color: string;
  radius: number;
}

type PType = "rocky" | "gas" | "ice" | "terrestrial";

// ─── HUD CONTENT DATA ────────────────────────────────────────────────────────
const HUD_DATA: Record<string, { label: string; section: string; tagline: string; bullets: string[] }> = {
  "Vaibhav Prime": {
    label: "ABOUT", section: "about", tagline: "Vaibhav Gala — System Developer",
    bullets: ["B.Tech CS @ DJSCE  ·  CGPA 8.73", "Full Stack + Systems Engineering", "Linux · C · Backend · GenAI", "\"Talk is cheap. Show me the code.\""],
  },
  "Systems World": {
    label: "ABOUT", section: "about", tagline: "Consistency is my core trait",
    bullets: ["Loves building from scratch", "Shells, servers, full-stack apps", "Open-source & low-level thinker"],
  },
  "Code Earth": {
    label: "PROJECTS", section: "projects", tagline: "Selected Works",
    bullets: ["InternConnect — AI internship platform", "NutShell — Unix shell in C", "SnapLink — 2.8M redirects / day", "Viper — 50k+ concurrent HTTP server"],
  },
  "Rust Moon": {
    label: "SKILLS", section: "skills", tagline: "Technical Arsenal",
    bullets: ["C · Java · Python · DSA", "React · Next.js · FastAPI · Spring Boot", "PostgreSQL · MongoDB · Redis", "Docker · AWS · GCP · LangChain"],
  },
  "Linux Giant": {
    label: "EDUCATION", section: "education", tagline: "Academic Path",
    bullets: ["B.Tech CS @ DJSCE — CGPA 8.73", "Aug 2023 – Present", "HSC (PCM) @ Mithibai — 89.67%", "Aug 2021 – May 2023"],
  },
  "Backend Ice": {
    label: "EXPERIENCE", section: "experience", tagline: "Work Experience",
    bullets: ["Aahaanya Creatives — Freelance Web Dev", "Next.js · GCP · AWS S3 · Jun–Sep 2025", "Prism — Co-Founder (Tech)", "AI image app · FastAPI · Supabase"],
  },
};

// ─── PLANET DATA ─────────────────────────────────────────────────────────────
const PLANETS: Array<{
  distance: number; radius: number; color: string; speed: number; orbitSpeed: number;
  name: string; sectionName: string; atmosphereColor?: string;
  hasRings?: boolean; ringInner?: number; ringOuter?: number; ringColor?: string;
  tilt?: number; type: PType;
}> = [
  { distance: 5,  radius: 0.35, color: "#ef4444", speed: 0.02,  orbitSpeed: 0.02,   name: "Vaibhav Prime", sectionName: "about",     atmosphereColor: "#fca5a5", tilt: 0.1,  type: "rocky" },
  { distance: 8,  radius: 0.6,  color: "#3b82f6", speed: 0.012, orbitSpeed: 0.012,  name: "Systems World", sectionName: "about",     atmosphereColor: "#93c5fd", tilt: 0.3,  type: "gas",  hasRings: true, ringInner: 1.4, ringOuter: 2.3, ringColor: "#a5b4fc" },
  { distance: 11, radius: 0.45, color: "#22c55e", speed: 0.015, orbitSpeed: 0.008,  name: "Code Earth",    sectionName: "projects",  atmosphereColor: "#86efac", tilt: 0.2,  type: "terrestrial" },
  { distance: 15, radius: 0.25, color: "#f97316", speed: 0.025, orbitSpeed: 0.005,  name: "Rust Moon",     sectionName: "skills",    atmosphereColor: "#fdba74", tilt: 0.05, type: "rocky" },
  { distance: 20, radius: 1.1,  color: "#eab308", speed: 0.008, orbitSpeed: 0.003,  name: "Linux Giant",   sectionName: "education", atmosphereColor: "#fde047", tilt: 0.4,  type: "gas",  hasRings: true, ringInner: 1.4, ringOuter: 2.2, ringColor: "#ca8a04" },
  { distance: 26, radius: 0.8,  color: "#06b6d4", speed: 0.01,  orbitSpeed: 0.0015, name: "Backend Ice",   sectionName: "experience",atmosphereColor: "#67e8f9", tilt: 0.15, type: "ice" },
];

// ─── NEBULA ──────────────────────────────────────────────────────────────────
function NebulaPlane({ position, rotation, color, size = 180, opacity = 0.18 }: {
  position: [number, number, number]; rotation: [number, number, number];
  color: string; size?: number; opacity?: number;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, color);
    g.addColorStop(0.4, color.replace(/[\d.]+\)$/, "0.08)"));
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false}
        blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Nebula() {
  return (
    <group>
      <NebulaPlane position={[-120, 20, -180]} rotation={[0.3, 0.5, 0.1]}   color="rgba(80,20,160,0.35)"  size={220} opacity={0.22} />
      <NebulaPlane position={[150, -30, -200]} rotation={[-0.2, -0.4, 0.2]} color="rgba(10,40,160,0.3)"   size={200} opacity={0.18} />
      <NebulaPlane position={[20, 100, -150]}  rotation={[0.8, 0.2, -0.3]}  color="rgba(0,100,180,0.25)"  size={160} opacity={0.14} />
      <NebulaPlane position={[-80, -60, -220]} rotation={[0.1, 0.8, 0.4]}   color="rgba(140,20,80,0.2)"   size={180} opacity={0.12} />
    </group>
  );
}

// ─── SUN ─────────────────────────────────────────────────────────────────────
function Sun() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.001; });
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[2, 64, 64]} /><meshStandardMaterial color="#fff4c2" emissive="#fbbf24" emissiveIntensity={3.5} roughness={0.8} /></mesh>
      <mesh><sphereGeometry args={[2.3, 32, 32]} /><meshBasicMaterial color="#f59e0b" transparent opacity={0.55} /></mesh>
      <mesh><sphereGeometry args={[2.9, 32, 32]} /><meshBasicMaterial color="#ea580c" transparent opacity={0.18} /></mesh>
      <mesh><sphereGeometry args={[3.4, 32, 32]} /><MeshDistortMaterial color="#dc2626" speed={2} distort={0.6} transparent opacity={0.12} /></mesh>
      <pointLight intensity={6} color="#fff4d0" distance={180} decay={1.8} />
    </group>
  );
}

// ─── PLANET ──────────────────────────────────────────────────────────────────
interface PlanetProps {
  distance: number; radius: number; color: string; speed: number; orbitSpeed: number;
  name: string; sectionName: string; atmosphereColor?: string;
  hasRings?: boolean; ringInner?: number; ringOuter?: number; ringColor?: string;
  tilt?: number; type?: PType;
  onFocus: (p: FocusPlanet) => void;
  isFocused: boolean;
  anyFocused: boolean;
}

function Planet({
  distance, radius, color, speed, orbitSpeed, name, sectionName,
  atmosphereColor, hasRings = false, ringInner, ringOuter, ringColor,
  tilt = 0, type = "rocky", onFocus, isFocused, anyFocused,
}: PlanetProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const orbitRef  = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const mat = useMemo(() => {
    if (type === "gas")         return { roughness: 0.35, metalness: 0.05 };
    if (type === "ice")         return { roughness: 0.25, metalness: 0.20 };
    if (type === "terrestrial") return { roughness: 0.60, metalness: 0.05 };
    return { roughness: 0.92, metalness: 0.00 };
  }, [type]);

  useFrame(() => {
    if (orbitRef.current) orbitRef.current.rotation.y += orbitSpeed;
    if (groupRef.current) {
      groupRef.current.rotation.y += speed;
      // Track world position for camera fly-in — reuse existing Vector3 to avoid GC
      if (!_planetPos[name]) _planetPos[name] = new THREE.Vector3();
      groupRef.current.getWorldPosition(_planetPos[name]);
    }
  });

  return (
    <group ref={orbitRef}>
      <group
        ref={groupRef}
        position={[distance, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          onFocus({ name, color, radius });
        }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = "pointer"; }}
        onPointerOut={()  => {                       setHovered(false); document.body.style.cursor = "auto";    }}
      >
        {/* Planet body */}
        <mesh>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial color={color} roughness={mat.roughness} metalness={mat.metalness} />
        </mesh>

        {/* ── Floating label (Feature 2) ─────────────────────────────────── */}
        {/* Hidden when ANY planet is focused so camera transitions are clean */}
        {!anyFocused && (
          <Html
            position={[0, radius * 2.6, 0]}
            center
            distanceFactor={12}
            occlude={false}
            style={{
              transition: "opacity 0.25s ease, transform 0.25s ease",
              opacity: hovered ? 1 : 0,
              transform: `scale(${hovered ? 1 : 0.82}) translateY(${hovered ? 0 : 6}px)`,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          >
            <div style={{
              background: "rgba(0,0,10,0.88)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: `1px solid ${color}65`,
              boxShadow: `0 0 24px ${color}28, 0 4px 12px rgba(0,0,0,0.5)`,
              padding: "5px 14px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              fontFamily: "'Fira Code', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color,
              textTransform: "uppercase",
            }}>
              {name}
              <span style={{ color: "#44556a", fontWeight: 400, margin: "0 6px" }}>›</span>
              <span style={{ color: "#94a3b8", fontWeight: 400 }}>{sectionName.toUpperCase()}</span>
            </div>
          </Html>
        )}

        {/* Atmosphere */}
        {atmosphereColor && (
          <mesh>
            <sphereGeometry args={[radius * 1.12, 32, 32]} />
            <meshBasicMaterial color={atmosphereColor} transparent opacity={0.15} side={THREE.BackSide} />
          </mesh>
        )}

        {/* Hover glow */}
        {hovered && !anyFocused && (
          <mesh>
            <sphereGeometry args={[radius * 1.35, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.12} />
          </mesh>
        )}

        {/* Focus pulse ring — visible when this planet is the focused target */}
        {isFocused && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.65, radius * 1.82, 80]} />
            <meshBasicMaterial color={color} transparent opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Saturn-style rings */}
        {hasRings && (
          <group rotation={[tilt + 0.45, 0, 0]}>
            <mesh>
              <ringGeometry args={[radius * (ringInner ?? 1.5), radius * (ringOuter ?? 2.5), 64]} />
              <meshStandardMaterial color={ringColor ?? "#c4a35a"} transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

// ─── ORBIT PATH ──────────────────────────────────────────────────────────────
function OrbitPath({ radius, color = "#fff" }: { radius: number; color?: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

// ─── ASTEROID BELT ────────────────────────────────────────────────────────────
function AsteroidBelt() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const a = Math.random() * Math.PI * 2, r = 5.5 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3; pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return pos;
  }, []);
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0004; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.06} color="#a1a1aa" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ─── COSMIC DUST ──────────────────────────────────────────────────────────────
function CosmicDust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 300;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    return pos;
  }, []);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += 0.00008;
      ref.current.position.x = Math.sin(s.clock.elapsedTime * 0.03) * 1.5;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.07} color="#93c5fd" transparent opacity={0.22} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ─── SHOOTING STARS / COMETS ────────────────────────────────────────────────────
// Purely imperative (scene.add / scene.remove) — zero React re-renders per frame.

const NUM_COMETS  = 3;
const TRAIL_SEGS  = 26;

const COMET_COLORS_DEF = [
  new THREE.Color(1,    1,    1   ),  // white
  new THREE.Color(0.72, 0.90, 1   ),  // ice blue
  new THREE.Color(0.90, 0.85, 1   ),  // lavender white
];

interface CometState {
  active:   boolean;
  start:    THREE.Vector3;
  dir:      THREE.Vector3;
  speed:    number;
  trailLen: number;
  journey:  number;
  elapsed:  number;
  idle:     number;
  idleWait: number;
  colorIdx: number;
}

function spawnComet(s: CometState) {
  const theta = Math.random() * Math.PI * 2;
  const phi   = (0.15 + Math.random() * 0.7) * Math.PI;
  const r     = 72 + Math.random() * 38;

  s.start.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  );

  // Travel tangentially across the star field (not radially toward origin)
  const n  = s.start.clone().normalize();
  const up = Math.abs(n.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const t1 = new THREE.Vector3().crossVectors(n, up).normalize();
  const t2 = new THREE.Vector3().crossVectors(n, t1);
  const a  = Math.random() * Math.PI * 2;

  s.dir.set(0, 0, 0)
    .addScaledVector(t1, Math.cos(a))
    .addScaledVector(t2, Math.sin(a))
    .normalize();

  s.speed    = 28 + Math.random() * 38;   // 28–66 units/sec
  s.trailLen = 9  + Math.random() * 15;   // 9–24 units long
  s.journey  = 50 + Math.random() * 65;   // 50–115 unit path
  s.elapsed  = 0;
  s.active   = true;
  s.colorIdx = Math.floor(Math.random() * COMET_COLORS_DEF.length);
}

function ShootingStars() {
  const { scene } = useThree();
  const headPosRef = useRef(new THREE.Vector3());

  const statesRef = useRef<CometState[]>([]);
  const meshesRef = useRef<Array<{
    trail:    THREE.Line;
    trailGeo: THREE.BufferGeometry;
    trailMat: THREE.ShaderMaterial;
    posBuf:   Float32Array;
    alphaBuf: Float32Array;
    head:     THREE.Points;
    headGeo:  THREE.BufferGeometry;
    headMat:  THREE.PointsMaterial;
    headBuf:  Float32Array;
  }>>([]);

  useEffect(() => {
    const VERT = `
      attribute float aAlpha;
      varying  float vAlpha;
      void main() {
        vAlpha      = aAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const FRAG = `
      uniform vec3  uColor;
      varying float vAlpha;
      void main() { gl_FragColor = vec4(uColor, vAlpha); }
    `;

    const states: CometState[] = [];
    const meshes: typeof meshesRef.current = [];

    for (let i = 0; i < NUM_COMETS; i++) {
      // Trail line
      const posBuf   = new Float32Array(TRAIL_SEGS * 3).fill(0);
      const alphaBuf = new Float32Array(TRAIL_SEGS).fill(0);

      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(posBuf,   3));
      trailGeo.setAttribute('aAlpha',   new THREE.BufferAttribute(alphaBuf, 1));

      const trailMat = new THREE.ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        uniforms:    { uColor: { value: COMET_COLORS_DEF[i % COMET_COLORS_DEF.length].clone() } },
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      });

      const trail = new THREE.Line(trailGeo, trailMat);
      trail.frustumCulled = false;
      scene.add(trail);

      // Head glow — single bright point
      const headBuf = new Float32Array(3).fill(0);
      const headGeo = new THREE.BufferGeometry();
      headGeo.setAttribute('position', new THREE.BufferAttribute(headBuf, 3));

      const headMat = new THREE.PointsMaterial({
        color:           new THREE.Color(1, 0.96, 0.88),
        size:            0.95,
        sizeAttenuation: true,
        transparent:     true,
        opacity:         0,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
      });

      const head = new THREE.Points(headGeo, headMat);
      head.frustumCulled = false;
      scene.add(head);

      // Stagger first spawn: comet 0→1.5s, 1→4s, 2→6.5s (+ random)
      states.push({
        active:   false,
        start:    new THREE.Vector3(),
        dir:      new THREE.Vector3(1, 0, 0),
        speed:    40,
        trailLen: 12,
        journey:  80,
        elapsed:  0,
        idle:     0,
        idleWait: 1.5 + i * 2.5 + Math.random() * 3,
        colorIdx: i % COMET_COLORS_DEF.length,
      });

      meshes.push({ trail, trailGeo, trailMat, posBuf, alphaBuf, head, headGeo, headMat, headBuf });
    }

    statesRef.current = states;
    meshesRef.current = meshes;

    return () => {
      meshes.forEach(m => {
        scene.remove(m.trail);
        scene.remove(m.head);
        m.trailGeo.dispose();
        m.trailMat.dispose();
        m.headGeo.dispose();
        m.headMat.dispose();
      });
    };
  }, [scene]);

  useFrame((_, delta) => {
    const states = statesRef.current;
    const meshes = meshesRef.current;
    if (!states.length) return;

    const headPos = headPosRef.current; // reused each frame — no GC

    for (let i = 0; i < NUM_COMETS; i++) {
      const s = states[i];
      const m = meshes[i];

      if (!s.active) {
        s.idle += delta;
        if (s.idle >= s.idleWait) {
          spawnComet(s);
          m.trailMat.uniforms.uColor.value.copy(COMET_COLORS_DEF[s.colorIdx]);
        }
        continue;
      }

      s.elapsed += delta;
      const dist  = s.speed * s.elapsed;         // head distance from start
      const trail = Math.min(dist, s.trailLen);  // effective trail length

      // Global alpha: fade-in over 0.25 s, fade-out as head approaches end
      const fadeIn  = Math.min(1, s.elapsed * 4);
      const leftover = s.journey - dist;
      const fadeOut = Math.min(1, leftover / Math.max(s.trailLen * 0.4, 1));
      const ga      = Math.min(fadeIn, Math.max(0, fadeOut));

      headPos.copy(s.start).addScaledVector(s.dir, dist);

      for (let j = 0; j < TRAIL_SEGS; j++) {
        const t = j / (TRAIL_SEGS - 1); // 0 = tail end, 1 = head
        m.posBuf[j * 3]     = headPos.x - s.dir.x * (1 - t) * trail;
        m.posBuf[j * 3 + 1] = headPos.y - s.dir.y * (1 - t) * trail;
        m.posBuf[j * 3 + 2] = headPos.z - s.dir.z * (1 - t) * trail;
        m.alphaBuf[j]        = Math.pow(t, 1.8) * ga; // quadratic: bright head, wisp tail
      }

      m.trailGeo.attributes.position.needsUpdate = true;
      m.trailGeo.attributes.aAlpha.needsUpdate   = true;

      m.headBuf[0] = headPos.x;
      m.headBuf[1] = headPos.y;
      m.headBuf[2] = headPos.z;
      m.headGeo.attributes.position.needsUpdate = true;
      m.headMat.opacity = ga;

      // Comet finished — reset to idle
      if (dist > s.journey + s.trailLen) {
        s.active   = false;
        s.idle     = 0;
        s.idleWait = 4 + Math.random() * 6;
        m.alphaBuf.fill(0);
        m.trailGeo.attributes.aAlpha.needsUpdate = true;
        m.headMat.opacity = 0;
      }
    }
  });

  return null; // all objects are added imperatively to the scene
}

// ─── CAMERA CONTROLLER ───────────────────────────────────────────────────────
// Feature 1 (fly-in) + Feature 3 (scroll camera) — no external deps, manual lerp.
function CameraController({
  focused,
  scrollRef,
}: {
  focused: FocusPlanet | null;
  scrollRef: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  const autoAngle = useRef(0.8);  // current azimuth for cinematic auto-rotation
  const lookAt    = useRef(new THREE.Vector3(0, 0, 0));
  const camTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (focused) {
      // ── FEATURE 1: Fly the camera to orbit the clicked planet ──────────────
      const pos = _planetPos[focused.name];
      if (!pos) return;

      const d = focused.radius * 5.5 + 7;   // orbit stand-off distance
      camTarget.current.set(
        pos.x + d * 0.45,
        pos.y + d * 0.50,
        pos.z + d,
      );
      camera.position.lerp(camTarget.current, 0.045);
      lookAt.current.lerp(pos, 0.060);
      camera.lookAt(lookAt.current);
    } else {
      // ── FEATURE 3: Cinematic auto-rotation + scroll-driven zoom ───────────
      // Slow orbit (~2.6 min / revolution) for a god-tier idle feel
      autoAngle.current += delta * 0.035;

      const t    = scrollRef.current;        // 0 (top) → 1 (bottom)
      const dist = 70 - t * 56;             // 70 (far out) → 14 (close in)
      const elev = 0.62 - t * 0.22;         // 35.5° → 23.5° above ecliptic

      camTarget.current.set(
        Math.sin(autoAngle.current) * dist * Math.cos(elev),
        dist * Math.sin(elev),
        Math.cos(autoAngle.current) * dist * Math.cos(elev),
      );
      camera.position.lerp(camTarget.current, 0.025);
      lookAt.current.lerp(ORIGIN, 0.040);
      camera.lookAt(lookAt.current);
    }
  });

  return null;
}

// ─── SCENE ───────────────────────────────────────────────────────────────────
function SceneCosmos({
  focused, scrollRef, onFocus,
}: {
  focused: FocusPlanet | null;
  scrollRef: React.MutableRefObject<number>;
  onFocus: (p: FocusPlanet) => void;
}) {
  return (
    <>
      <CameraController focused={focused} scrollRef={scrollRef} />
      <ambientLight intensity={0.04} />
      <Stars radius={400} depth={120} count={18000} factor={4} saturation={1} fade speed={0.4} />

      <Nebula />
      <CosmicDust />
      <Sun />

      <OrbitPath radius={5}  color="#f59e0b" />
      <OrbitPath radius={8}  color="#3b82f6" />
      <OrbitPath radius={11} color="#22c55e" />
      <OrbitPath radius={15} color="#f97316" />
      <OrbitPath radius={20} color="#eab308" />
      <OrbitPath radius={26} color="#06b6d4" />

      {PLANETS.map((p) => (
        <Planet
          key={p.name}
          {...p}
          onFocus={onFocus}
          isFocused={focused?.name === p.name}
          anyFocused={focused !== null}
        />
      ))}

      <AsteroidBelt />
      <ShootingStars />
    </>
  );
}

// ─── HUD PANEL ───────────────────────────────────────────────────────────────
// Rendered via React portal directly to document.body to avoid z-index stacking issues.
function HudPanel({ planet, onClose }: { planet: FocusPlanet; onClose: () => void }) {
  const d = HUD_DATA[planet.name];
  if (!d) return null;
  const c = planet.color;

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      right: "clamp(1rem, 3vw, 2.5rem)",
      transform: "translateY(-50%)",
      zIndex: 9999,
      width: "min(390px, calc(100vw - 2rem))",
      background: "rgba(2, 2, 15, 0.94)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      border: `1px solid ${c}42`,
      boxShadow: `0 0 90px ${c}15, 0 0 0 1px ${c}08, 0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)`,
      borderRadius: 20,
      padding: "1.85rem",
      animation: "hudSlideIn 0.44s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
    }}>
      {/* Planet-coloured accent bar */}
      <div style={{ height: 2, marginBottom: "1.4rem", background: `linear-gradient(90deg, ${c}, ${c}00)`, borderRadius: 1 }} />

      {/* Section label */}
      <div style={{ fontFamily: "monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: c, opacity: 0.75, marginBottom: "0.35rem" }}>
        {d.label}_SYSTEM.LOG
      </div>

      {/* Planet name */}
      <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#44556a", marginBottom: "0.28rem" }}>
        ◉ {planet.name}
      </div>

      {/* Tagline */}
      <h3 style={{ fontSize: "1.18rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 1.2rem", lineHeight: 1.35 }}>
        {d.tagline}
      </h3>

      {/* Divider */}
      <div style={{ height: 1, background: `${c}1a`, marginBottom: "1rem" }} />

      {/* Bullets */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.52rem" }}>
        {d.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", color: "#94a3b8", fontSize: "0.8rem", fontFamily: "monospace", lineHeight: 1.55 }}>
            <span style={{ color: c, flexShrink: 0, marginTop: 1 }}>›</span>
            {b}
          </li>
        ))}
      </ul>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.6rem" }}>
        <button
          onClick={() => {
            const el = document.getElementById(d.section);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            onClose();
          }}
          style={{
            flex: 1, padding: "0.65rem 0.75rem",
            background: `linear-gradient(135deg, ${c}28, ${c}0e)`,
            border: `1px solid ${c}80`, color: "#fff", borderRadius: 10,
            fontFamily: "monospace", fontSize: "0.73rem", letterSpacing: "0.1em",
            cursor: "pointer", transition: "box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 22px ${c}45`; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
        >
          VIEW SECTION →
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "0.65rem 1rem", background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)", color: "#475569",
            borderRadius: 10, fontFamily: "monospace", fontSize: "0.73rem",
            cursor: "pointer",
          }}
        >
          ESC
        </button>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function CosmosBackground() {
  const [focused, setFocused] = useState<FocusPlanet | null>(null);
  const scrollRef  = useRef(0);
  const [mounted, setMounted] = useState(false);

  // Wait for client mount before using createPortal
  useEffect(() => { setMounted(true); }, []);

  // Feature 3 — scroll progress tracking (passive, zero jank)
  useEffect(() => {
    const handler = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Keyboard dismiss
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setFocused(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Reset cursor whenever focus is cleared
  useEffect(() => {
    if (!focused) document.body.style.cursor = "auto";
  }, [focused]);

  return (
    <>
      {/* Inject keyframe for HUD slide-in (runs once, no deps on external CSS) */}
      <style>{`
        @keyframes hudSlideIn {
          from { opacity: 0; transform: translateY(-50%) translateX(28px) scale(0.95); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0)     scale(1);   }
        }
      `}</style>

      {/* 3D Canvas — stays behind page content (z:-1) */}
      <div className="fixed inset-0 z-[-1]" style={{ pointerEvents: "none" }}>
        <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <Canvas
            camera={{ position: [0, 38, 68], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: false,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 0.85,
            }}
            style={{ background: "#000008" }}
            // Click on empty space → dismiss focus
            onPointerMissed={() => setFocused(null)}
          >
            <SceneCosmos focused={focused} scrollRef={scrollRef} onFocus={setFocused} />
          </Canvas>
        </div>
      </div>

      {/* Portal: backdrop + HUD panel rendered at document.body to escape z-index constraints */}
      {mounted && focused && createPortal(
        <>
          {/* Transparent click-away backdrop — sits above every page layer */}
          <div
            onClick={() => setFocused(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              cursor: "pointer",
              // Subtle dark vignette to draw attention to the planet
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)",
            }}
          />
          <HudPanel planet={focused} onClose={() => setFocused(null)} />
        </>,
        document.body,
      )}
    </>
  );
}