import * as THREE from 'three';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useMemo, useEffect } from 'react';

/**
 * AuroraEffect Component
 * 
 * This component produces a full-screen aurora effect using colors
 * sampled from the image `landscape.png`.
 * 
 * @component
 * @example
 * <AuroraEffect />
 */
const AuroraEffect: React.FC = () => {
  const particlesRef = useRef<THREE.Points | null>(null);
  const count = 30000; // Increased number of particles for fuller effect
  const texture = useLoader(THREE.TextureLoader, '../../assets/landscape.png');
  const { viewport } = useThree();

  // Function to generate colors based on image data
  const generateColors = (texture: THREE.Texture, count: number) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return new Float32Array(count * 3);

    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    context.drawImage(texture.image, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const colorArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * canvas.width);
      const y = Math.floor(Math.random() * canvas.height);
      const pixelIndex = (y * canvas.width + x) * 4;

      colorArray[i * 3] = imageData.data[pixelIndex] / 255;
      colorArray[i * 3 + 1] = imageData.data[pixelIndex + 1] / 255;
      colorArray[i * 3 + 2] = imageData.data[pixelIndex + 2] / 255;
    }

    return colorArray;
  };

  // Generate particle positions to fill the entire screen
  const positions = useMemo(() => {
    const positionsArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] = (Math.random() - 0.5) * viewport.width;
      positionsArray[i * 3 + 1] = (Math.random() - 0.5) * viewport.height;
      positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 10; // Reduced depth for a flatter effect
    }
    return positionsArray;
  }, [count, viewport.width, viewport.height]);

  const colors = useMemo(() => generateColors(texture, count), [texture, count]);

  // Animate the particles with a slow, wave-like motion
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * 0.18 + positions[i3] * 0.9) * 0.02;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Adjust particle system when viewport changes
  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.scale.set(1, 1, 1);
    }
  }, [viewport]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.009} // Reduced size for more subtle effect
        vertexColors
        transparent
        opacity={1} // Adjusted for better visibility
        blending={THREE.AdditiveBlending} // Enhanced blending for aurora-like glow
      />
    </points>
  );
};

export default AuroraEffect;
