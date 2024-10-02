"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment, Plane } from "@react-three/drei"
import { Suspense } from "react"
import ParticleSystem  from "./ParticleSystem"
import { TextureLoader } from 'three';

function Scene() {
  const texture = useLoader(TextureLoader, "../../assets/landscape.png")

  return (
    <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial map={texture} />
    </Plane>
  )
}

export default function MysticalLandscape() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}