"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Hero3DText() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[4, 1.5, 0.2]} />
        <meshStandardMaterial 
          color={hovered ? "#22d3ee" : "#1a1a2e"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#22d3ee" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        VAIBHAV GALA
      </Text>
    </Float>
  );
}

function FloatingCodeSymbol({ position, symbol, delay = 0 }: {
  position: [number, number, number];
  symbol: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + delay;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#22d3ee"
          metalness={0.9}
          roughness={0.1}
          emissive="#22d3ee"
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.2}
        color="#050508"
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    </group>
  );
}

function OrbitRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function TechOrbit({ children, radius, speed }: { children: React.ReactNode; radius: number; speed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <OrbitRing radius={radius} color="#22d3ee" speed={speed} />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <OrbitRing radius={radius} color="#a855f7" speed={-speed * 0.5} />
      </group>
      <group position={[radius, 0, 0]}>
        {children}
      </group>
    </group>
  );
}

function Scene3DHero() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#22d3ee" />
      
      <Hero3DText />
      
      <FloatingCodeSymbol position={[-3, 1, 2]} symbol="C" delay={0} />
      <FloatingCodeSymbol position={[3, 2, 1]} symbol="{" delay={1} />
      <FloatingCodeSymbol position={[-2, -1, 3]} symbol="/" delay={2} />
      <FloatingCodeSymbol position={[2.5, -0.5, 2]} symbol=">" delay={0.5} />
      <FloatingCodeSymbol position={[-4, 0, 1]} symbol="()" delay={1.5} />
      <FloatingCodeSymbol position={[4, 1, 0]} symbol=";" delay={2.5} />
      
      <TechOrbit radius={3} speed={0.2}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.5}
          />
        </mesh>
      </TechOrbit>
      
      <TechOrbit radius={4} speed={0.15}>
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial 
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </TechOrbit>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene3DHero />
      </Canvas>
    </div>
  );
}