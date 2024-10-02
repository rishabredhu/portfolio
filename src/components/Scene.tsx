import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Projects from './Projects';
import Horse from './Horse';
import SpaceWarpCanvas from './SpaceWarp';

/**
 * Scene component
 * 
 * This component creates a 3D scene using Three.js and loads a .glb file
 * to form a background. It includes debugging information logged to the console
 * to help identify issues with model rendering. The loaded model remains stationary.
 * 
 * Note: The model is not rotating or hovering. The initial rotation is set once when the model is loaded,
 * and it remains in that position.
 */
const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    // Load GLB file
    const loader = new GLTFLoader();
    loader.load(
      '../assets/model/3d-desk.glb', // Update this path to your .glb file
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Debugging: Log model details
        console.log(`Model loaded. Children count: ${model.children.length}`);
        
        // Adjust the position and scale of the model as needed
        model.scale.set(1, 1, 1); // Increased scale for a closer view
        model.position.set(1, -0.8,3); // Moved closer to the camera
        model.rotation.set(32, Math.PI / 6, 0.01); // Initial rotation set here

        scene.add(model);
        
        // Debugging: Log model details
        console.log(`Model added to scene. Scale: ${model.scale.x}, ${model.scale.y}, ${model.scale.z}`);
        console.log(`Model rotation: ${model.rotation.x}, ${model.rotation.y}, ${model.rotation.z}`);
        
        // Center the camera on the loaded model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        camera.lookAt(center);
        
        // Adjust camera position to fit the entire model in view
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.z = cameraZ * 1.5; // Add some padding
        
        camera.updateProjectionMatrix();
        
        // Debugging: Log camera details
        console.log(`Camera position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
        console.log(`Camera looking at: ${center.x}, ${center.y}, ${center.z}`);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the GLB file:', error);
        setError('Failed to load the 3D model. Please check the file path and try again.');
        console.error(`Error loading GLB: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
    <div>
      <div ref={mountRef} />
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
    </div>

      <Projects />
      
      
      {/* Add the Horse component */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '-2px', 
          left: '50px',  // Fixed position
          cursor: 'pointer',
          zIndex: 1000,
          width: '50px',
          height: '50px'
        }}>
        <Horse />
      </div>
    </>    
  );
};

export default Scene;
