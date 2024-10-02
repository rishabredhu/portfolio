import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * SphereParticle Component
 * 
 * This component creates a 3D sphere with particles that pulsate and move in a synchronized manner.
 * The particles are generated within a spherical boundary and their colors pulse in rich shades of purple.
 * 
 * @component
 * @example
 * <SphereParticle />
 */

const Sphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let colorPulse = 0;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const colors = [];
      const particleCount = 50000; // Increased particle count for fuller effect

      for (let i = 0; i < particleCount; i++) {
        vertices.push(Math.random() * 2 - 1);
        vertices.push(Math.random() * 2 - 1);
        vertices.push(Math.random() * 2 - 1);

        // Rich shades of purple
        colors.push(0.5 + Math.random() * 0.5); // R
        colors.push(0); // G
        colors.push(0.5 + Math.random() * 0.5); // B
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.0005,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 1.8; // Keep the z distance at 75
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const colors = particles.geometry.attributes.color.array as Float32Array;
      const total = positions.length;

      colorPulse += 0.01;

      for (let i = 0; i < total; i += 3) {
        // Unsynchronized movement
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.011;
        positions[i + 1] += Math.cos(Date.now() * 0.002 + i) * 0.01;
        positions[i + 2] += Math.sin(Date.now() * 0.003 + i) * 0.01;

        // Keep particles within a spherical boundary
        const distance = Math.sqrt(
          positions[i] ** 2 + 
          positions[i + 1] ** 2 + 
          positions[i + 2] ** 2
        );

        if (distance > 1) {
          positions[i] /= distance;
          positions[i + 1] /= distance;
          positions[i + 2] /= distance;
        }

        // Pulsating colors (rich shades of purple)
        colors[i] = 0.5 + (Math.sin(colorPulse + i * 0.1) + 1) * 0.55; // R
        colors[i + 1] = 0; // G
        colors[i + 2] = 0.5 + (Math.sin(colorPulse + i * 0.3) + 1) * 0.15; // B
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    init();
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

/**
 * 
 * This is the main component that combines all other components to create the landing page.
 */
const SphereParticle: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sphere />
      
    </div>
  );
};


export default SphereParticle;
