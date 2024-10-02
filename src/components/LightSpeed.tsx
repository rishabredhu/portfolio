import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { CanvasLoader } from './SpaceScene'
import * as THREE from 'three';

/**
 * Interface for Spaceman component props
 */
interface SpacemanProps {
  scale: Vector3;
  position: Vector3;
}

/**
 * LightSpeedEffect component: Creates a particle effect simulating light speed travel
 */
const LightSpeedEffect: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 5000
  const positions = new Float32Array(particleCount * 3)

  // Initialize particle positions
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100
    positions[i + 1] = (Math.random() - 0.5) * 100
    positions[i + 2] = (Math.random() - 0.5) * 100
  }

  // Update particle positions in each frame
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z += delta * 0.1
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 2] += delta * 10
        if (positions[i + 2] > 50) {
          positions[i + 2] = -50
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" />
    </points>
  )
}

/**
 * LightSpeed component: Main component that renders the light speed effect
 */
export default function LightSpeed() {
  const [scale, setScale] = useState(new Vector3(2, 2, 2))
  const [position, setPosition] = useState(new Vector3(-0.2, -0.7, 0))
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Handle resizing and adjust scale and position accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(new Vector3(1, 1, 1))
        setPosition(new Vector3(0.2, -0.1, 0))
      } else if (window.innerWidth < 1024) {
        setScale(new Vector3(1.33, 1.33, 1.33))
        setPosition(new Vector3(0.2, -0.3, 0))
      } else if (window.innerWidth < 1280) {
        setScale(new Vector3(1.5, 1.5, 1.5))
        setPosition(new Vector3(0.2, -0.4, 0))
      } else if (window.innerWidth < 1536) {
        setScale(new Vector3(1.66, 1.66, 1.66))
        setPosition(new Vector3(0.2, -0.5, 0))
      } else {
        setScale(new Vector3(2, 2, 2))
        setPosition(new Vector3(0.2, -0.7, 0))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div ref={scrollContainerRef} style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Canvas className="w-full h-screen bg-transparent z-10" camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<CanvasLoader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
          <hemisphereLight color="#b1e1ff" groundColor="#000000" intensity={1} />
  
          <LightSpeedEffect />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}