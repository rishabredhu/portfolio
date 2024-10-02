import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vector3, Color } from 'three';
import { Mesh } from 'three';

// Define the props interface for the Star component
interface StarProps {
  position: Vector3;
  color: Color; // Change this from string to Color
  size: number;
  blinkSpeed: number;
}

// Particle component representing a single star
const Star: React.FC<StarProps> = ({ position, color, size, blinkSpeed }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the star
      meshRef.current.rotation.y += 0.01;
      
      // Make the star blink by changing its scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * blinkSpeed) * 0.3;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Main Particles component
const Particles = () => {
  // Generate random star data
  const starData = useMemo(() => {
    return Array.from({ length: 200 }, () => ({
      position: [
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
      ],
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      size: Math.random() * 0.2 + 0.1,
      blinkSpeed: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <group>
      {starData.map((data, index) => (
        <Star key={index} {...data} position={new Vector3(...data.position)} />
      ))}
    </group>
  );
};

export default Particles;
