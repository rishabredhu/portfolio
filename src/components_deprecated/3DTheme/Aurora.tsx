import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ShaderMaterial } from 'three';
import { Mesh } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0.1, 0.3, 0.5);
    
    float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 5.0 - time * 0.5);
    color += vec3(0.2, 0.5, 0.7) * noise;
    
    gl_FragColor = vec4(color, 0.7);
  }
`

export function Aurora() {
  // Specify the type explicitly as React.RefObject<Mesh>
  const mesh = useRef<Mesh>(null);
  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), [])

  useFrame(({ clock }) => {
    if (mesh.current && mesh.current.material instanceof ShaderMaterial) {
      mesh.current.material.uniforms.time.value = clock.getElapsedTime();
    }
  })

  return (
    <mesh ref={mesh} position={[0, 10, -20]} scale={[40, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}