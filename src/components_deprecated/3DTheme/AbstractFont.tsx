"use client"

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { InstancedMesh } from 'three';
import { Mesh } from 'three';
import { PointLight } from 'three';

// Custom shader material for the central icon
const IconShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float time;
    
    //	Simplex 3D Noise 
    //	by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1. + 3.0 * C.xxx;
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      float noiseFreq = 1.5;
      float noiseAmp = 0.25;
      vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
      pos.z += snoise(noisePos) * noiseAmp;
      vDisplacement = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    }
  `,
  // fragment shader
  `
    uniform vec3 color;
    uniform float time;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vec3 color1 = vec3(0.8, 0.1, 0.3);
      vec3 color2 = vec3(0.2, 0.0, 0.5);
      vec3 finalColor = mix(color1, color2, (sin(time) + 1.0) / 2.0);
      
      float displacement = vDisplacement / 3.0 + 0.5;
      gl_FragColor = vec4(finalColor * displacement, 1.0);
    }
  `
)

extend({ IconShaderMaterial })

function Icon() {
  const mesh = useRef<Mesh>(null)
  const hover = useRef(false)
  const uniforms = useMemo(() => {
    return {
      time: { value: 0 },
      color: { value: new THREE.Color(0.2, 0.0, 0.1) }
    }
  }, [])

  useFrame((state) => {
    const { clock } = state
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.1
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.1
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.1
    }
    uniforms.time.value = clock.getElapsedTime()
    uniforms.color.value.setHSL(Math.sin(clock.getElapsedTime() * 0.1) * 0.5 + 0.5, 0.5, 0.5)
  })

  return (
    <mesh
      ref={mesh}
      scale={hover.current ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronBufferGeometry args={[1, 20]} />
      <shaderMaterial uniforms={uniforms} />
    </mesh>
  )
}

function Particles({ count = 5000 }) {
  const mesh = useRef<InstancedMesh>(null)
  const light = useRef<PointLight>(null)

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.xFactor
      positions[i * 3 + 1] = particle.yFactor
      positions[i * 3 + 2] = particle.zFactor
    })
    return positions
  }, [count, particles])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01
      particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current?.setMatrixAt(i, dummy.matrix)
    })
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true
    }
    if (light.current) {
      light.current.position.set(
        Math.sin(state.clock.getElapsedTime() / 2) * 20,
        Math.cos(state.clock.getElapsedTime() / 2) * 20,
        Math.sin(state.clock.getElapsedTime()) * 20
      )
    }
  })

  return (
    <>
      <pointLight ref={light} distance={60} intensity={2} color="white" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronBufferGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </>
  )
}

function Scene() {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.2} />
      <Icon />
      <Particles />
    </>
  )
}

export default function AbstractFont() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas>
        <Scene />
        <OrbitControls enableZoom={false} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}