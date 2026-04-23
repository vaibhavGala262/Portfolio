"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingText() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[5, 1.8, 0.15]} />
        <meshStandardMaterial 
          color={hovered ? "#22d3ee" : "#111122"}
          metalness={0.9}
          roughness={0.1}
          emissive={hovered ? "#22d3ee" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        VAIBHAV GALA
      </Text>
    </Float>
  );
}

function OrbitingBadge({ position, text, color }: {
  position: [number, number, number];
  text: string;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

function EnergyRing({ radius, color }: { radius: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 5;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#22d3ee" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function CosmicOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x += 0.01;
      orbRef.current.rotation.y += 0.015;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial 
          color="#a855f7" 
          speed={3} 
          distort={0.4}
          emissive="#a855f7"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function SceneCosmicHero() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa00" />
      
      {/* Floating name */}
      <FloatingText />
      
      {/* Orbiting badges */}
      <OrbitingBadge position={[-3, 1.5, 0]} text="SYSTEM DEV" color="#22d3ee" />
      <OrbitingBadge position={[3, 1, 0]} text="ARCHITECT" color="#a855f7" />
      <OrbitingBadge position={[-2.5, -1, 0]} text="C" color="#f472b6" />
      <OrbitingBadge position={[2.5, -1.2, 0]} text="BACKEND" color="#34d399" />
      <OrbitingBadge position={[0, 2, 0]} text="LINUX" color="#22d3ee" />
      <OrbitingBadge position={[-4, 0, 0]} text="SCALABLE" color="#a855f7" />
      <OrbitingBadge position={[4, -0.5, 0]} text="CLOUD" color="#f472b6" />
      
      {/* Energy rings */}
      <EnergyRing radius={3} color="#22d3ee" />
      <EnergyRing radius={4} color="#a855f7" />
      <EnergyRing radius={5} color="#f472b6" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Cosmic orb */}
      <CosmicOrb />
    </>
  );
}

export default function HeroCosmic() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <SceneCosmicHero />
      </Canvas>
    </div>
  );
}