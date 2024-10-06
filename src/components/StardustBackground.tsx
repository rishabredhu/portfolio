// StardustBackground Component
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * StardustBackground Component
 * 
 * This component creates a 3D background with stardust particles using Three.js.
 * It initializes a scene, camera, and renderer, and animates the stardust particles.
 * The color of the stardust particles changes between shades of white and cream.
 * 
 * @component
 * @example
 * <StardustBackground />
 */
export default function StardustBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 4700;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Calculate color gradient for shades of white and cream
      const colorPhase = (i / starCount) * 2;
      if (colorPhase < 1) {
        // White to Cream
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = 1; // G
        colors[i * 3 + 2] = 1 - colorPhase * 0.2; // B
      } else {
        // Cream to White
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = 1; // G
        colors[i * 3 + 2] = 0.8 + (colorPhase - 1) * 0.2; // B
      }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starsMaterial = new THREE.PointsMaterial({ vertexColors: true, size: 0.094 });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const animate = () => {
      requestAnimationFrame(animate);
      starField.rotation.x += .001;
      starField.rotation.y += .001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}