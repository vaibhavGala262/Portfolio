"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry({ position, color, speed = 1, scale = 1 }: { 
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot3D({ position, color, scale = 0.5 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.z += 0.003;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <MeshDistortMaterial 
          color={color} 
          speed={1.5} 
          distort={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Sphere3D({ position, color, scale = 0.5 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.4}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <float32BufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MouseFollower() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        (state.pointer.x * viewport.width) / 2,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        (state.pointer.y * viewport.height) / 2,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere3D position={[0, 0, 0]} color="#22d3ee" scale={0.3} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
      
      <Particles />
      <MouseFollower />
      
      {/* Floating geometries */}
      <FloatingGeometry position={[-4, 2, -3]} color="#22d3ee" speed={1.2} scale={0.8} />
      <FloatingGeometry position={[4, -1, -2]} color="#a855f7" speed={0.8} scale={0.6} />
      <FloatingGeometry position={[-3, -2, -4]} color="#f472b6" speed={1} scale={0.5} />
      <FloatingGeometry position={[3, 3, -3]} color="#34d399" speed={0.9} scale={0.7} />
      
      {/* Torus knots */}
      <TorusKnot3D position={[2, -3, -4]} color="#22d3ee" scale={0.4} />
      <TorusKnot3D position={[-5, 1, -5]} color="#a855f7" scale={0.6} />
      
      {/* Spheres */}
      <Sphere3D position={[5, 2, -3]} color="#f472b6" scale={0.5} />
      <Sphere3D position={[-2, 4, -5]} color="#34d399" scale={0.4} />
      <Sphere3D position={[0, -4, -2]} color="#22d3ee" scale={0.3} />
    </>
  );
}

export default function Aurora3DBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}