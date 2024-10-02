import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ParticleSystem Component
 * 
 * This component manages a particle system for visual effects.
 * 
 * @param {boolean} transitionTrigger - A boolean to trigger particle transitions
 */
const ParticleSystem: React.FC<{ transitionTrigger: boolean }> = ({ transitionTrigger }) => {
  const particlesRef = useRef<any>(null); // Consider using a more specific type if possible

  // Number of particles
  const particleCount = 10000;

  // Store the initial dispersed positions
  const dispersedPositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50; // Spread out more for effect
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [particleCount]);

  // Store the sphere positions
  const spherePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const radius = 10;
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [particleCount]);

  // Initialize particle positions to dispersed
  const [currentPositions] = useState(() => dispersedPositions.slice());

  // State to control the animation progress
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isFormingSphere, setIsFormingSphere] = useState(false);

  // Effect to trigger animation
  useEffect(() => {
    if (transitionTrigger !== null) {
      setIsFormingSphere(transitionTrigger);
      setAnimationProgress(0);
    }
  }, [transitionTrigger]);

  // Animation loop
  useFrame(() => {
    if (animationProgress < 1) {
      setAnimationProgress((prev) => Math.min(prev + 0.01, 1));

      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        // Current positions
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];

        // Target positions
        const targetX = isFormingSphere
          ? spherePositions[i * 3]
          : dispersedPositions[i * 3];
        const targetY = isFormingSphere
          ? spherePositions[i * 3 + 1]
          : dispersedPositions[i * 3 + 1];
        const targetZ = isFormingSphere
          ? spherePositions[i * 3 + 2]
          : dispersedPositions[i * 3 + 2];

        // Interpolate positions
        positions[i * 3] = THREE.MathUtils.lerp(x, targetX, 0.02);
        positions[i * 3 + 1] = THREE.MathUtils.lerp(y, targetY, 0.02);
        positions[i * 3 + 2] = THREE.MathUtils.lerp(z, targetZ, 0.02);
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Rotate the particle system for visual effect
    particlesRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={currentPositions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={new THREE.Color(0.6, 1, 0.6)}
        blending={THREE.AdditiveBlending}
        transparent={true}
      />
    </points>
  );
};

export default ParticleSystem;
