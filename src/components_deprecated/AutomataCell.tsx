"use client"

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Remove the glsl import
// import glsl from 'babel-plugin-glsl/macro';

// Instead, define your GLSL shaders as strings
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;

  // Simplex 3D Noise function
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float n = snoise(vec3(uv * 5.0, time * 0.2)) * 0.5 + 0.5;
    vec3 color = mix(vec3(0.8, 0.2, 0.0), vec3(1.0, 0.5, 0.0), n);
    float glow = pow(n, 3.0) * 2.0;
    color += glow * vec3(1.0, 0.7, 0.3);
    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Constants for the Automata Grid
 */
const GRID_SIZE = 50
const CELL_SIZE = 0.2
const UPDATE_INTERVAL = 500 // milliseconds

/**
 * LavaShaderMaterial
 * 
 * This is a custom shader material that creates a lava-like effect
 * It uses noise functions to generate the fissure patterns and movement
 */
const LavaShaderMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
)

/**
 * LavaFissures Component
 * 
 * This component creates the lava fissure effect using the custom shader material
 */
function LavaFissures() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [lavaShaderMaterial] = useState(() => new LavaShaderMaterial())

  useFrame(({ clock }) => {
    if (meshRef.current) {
      lavaShaderMaterial.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <primitive object={lavaShaderMaterial} attach="material" />
    </mesh>
  )
}

/**
 * AutomataGrid Component
 * 
 * This component creates a 3D cellular automata grid using Three.js
 * The cells are now lighter and designed to fit the background image color
 * The grid is rendered inside a larger cube representing the background
 */
function AutomataGrid() {
  const gridRef = useRef<THREE.Group>(null)
  const cellsRef = useRef<boolean[]>(new Array(GRID_SIZE * GRID_SIZE * GRID_SIZE).fill(false))

  const geometry = useMemo(() => new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE), [])
  // Changed the material color to a lighter orange that fits better with a desert sunset theme
  const material = useMemo(() => new THREE.MeshPhongMaterial({ color: 0xffa07a, transparent: true, opacity: 0.7 }), [])

  const initialCells = useMemo(() => {
    return new Array(GRID_SIZE * GRID_SIZE * GRID_SIZE).fill(false).map(() => Math.random() > 0.8)
  }, [])

  useEffect(() => {
    cellsRef.current = initialCells
  }, [initialCells])

  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.rotation.x += 0.001
      gridRef.current.rotation.y += 0.001
    }
  })

  useEffect(() => {
    const updateGrid = () => {
      const newCells = [...cellsRef.current]
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          for (let z = 0; z < GRID_SIZE; z++) {
            const index = x + y * GRID_SIZE + z * GRID_SIZE * GRID_SIZE
            const neighbors = countNeighbors(x, y, z)
            if (cellsRef.current[index]) {
              newCells[index] = neighbors === 2 || neighbors === 3
            } else {
              newCells[index] = neighbors === 3
            }
          }
        }
      }
      cellsRef.current = newCells
    }

    const intervalId = setInterval(updateGrid, UPDATE_INTERVAL)
    return () => clearInterval(intervalId)
  }, [])

  const countNeighbors = (x: number, y: number, z: number): number => {
    let count = 0
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue
          const nx = (x + dx + GRID_SIZE) % GRID_SIZE
          const ny = (y + dy + GRID_SIZE) % GRID_SIZE
          const nz = (z + dz + GRID_SIZE) % GRID_SIZE
          const index = nx + ny * GRID_SIZE + nz * GRID_SIZE * GRID_SIZE
          if (cellsRef.current[index]) count++
        }
      }
    }
    return count
  }

  return (
    <group ref={gridRef}>
      {cellsRef.current.map((alive, index) => {
        if (!alive) return null
        const x = index % GRID_SIZE
        const y = Math.floor(index / GRID_SIZE) % GRID_SIZE
        const z = Math.floor(index / (GRID_SIZE * GRID_SIZE))
        return (
          <mesh
            key={index}
            geometry={geometry}
            material={material}
            position={[
              (x - GRID_SIZE / 2) * CELL_SIZE,
              (y - GRID_SIZE / 2) * CELL_SIZE,
              (z - GRID_SIZE / 2) * CELL_SIZE,
            ]}
          />
        )
      })}
    </group>
  )
}

/**
 * BackgroundCube Component
 * 
 * This component now includes the LavaFissures component for the lava effect
 */
function BackgroundCube() {
  const cubeSize = GRID_SIZE * CELL_SIZE * 1.5
  const geometry = useMemo(() => new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), [])
  const material = useMemo(() => new THREE.MeshPhongMaterial({ color: 0x2c3e50, transparent: true, opacity: 0.1, side: THREE.BackSide }), [])

  return (
    <group>
      <mesh geometry={geometry} material={material} />
      <LavaFissures />
    </group>
  )
}

/**
 * AutomataBackground Component
 * 
 * The main component that sets up the 3D scene with the AutomataGrid and lava fissure background
 */
const AutomataBackground: React.FC = () => {
  return (
    <div className="w-full h-screen" style={{ backgroundColor: '#2c3e50' }}>
      <Canvas camera={{ position: [15, 15, 15], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BackgroundCube />
        <AutomataGrid />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default AutomataBackground