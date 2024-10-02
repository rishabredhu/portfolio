import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

/**
 * Babylonjs component
 * 
 * This component is responsible for rendering a 3D scene using Babylon.js.
 * It sets up a canvas element and initializes a Babylon.js engine and scene.
 */
const Babylonjs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new BABYLON.Engine(canvasRef.current, true);
      const scene = new BABYLON.Scene(engine);

      // Create a camera
      const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
      camera.attachControl(canvasRef.current, true);

      // Create a light
      new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

      // Create your "nabber" object (for this example, we'll use a simple box)
      const nabber = BABYLON.MeshBuilder.CreateBox("nabber", { width: 2, height: 3, depth: 0.2 }, scene);
      nabber.position.y = 1.5;

      // Function to create a flower
      const createFlower = (position: BABYLON.Vector3) => {
        const flower = BABYLON.MeshBuilder.CreateSphere("flower", { diameter: 0.1 }, scene);
        flower.position = position;
        flower.material = new BABYLON.StandardMaterial("flowerMaterial", scene);
        (flower.material as BABYLON.StandardMaterial).diffuseColor = new BABYLON.Color3(
          Math.random(),
          Math.random(),
          Math.random()
        );
      };

      // Function to generate flowers along the edges
      const generateFlowers = () => {
        const edges = [
          { start: new BABYLON.Vector3(-1, 1.5, 0), end: new BABYLON.Vector3(1, 1.5, 0) },
          { start: new BABYLON.Vector3(1, 1.5, 0), end: new BABYLON.Vector3(1, -1.5, 0) },
          { start: new BABYLON.Vector3(1, -1.5, 0), end: new BABYLON.Vector3(-1, -1.5, 0) },
          { start: new BABYLON.Vector3(-1, -1.5, 0), end: new BABYLON.Vector3(-1, 1.5, 0) },
        ];

        edges.forEach((edge) => {
          const direction = edge.end.subtract(edge.start);
          const length = direction.length();
          const normalized = direction.normalize();

          for (let i = 0; i <= length; i += 0.1) {
            const position = edge.start.add(normalized.scale(i));
            createFlower(position);
          }
        });
      };

      // Generate initial flowers
      generateFlowers();

      // Animation to make flowers "bloom" downwards
      let time = 0;
      scene.registerBeforeRender(() => {
        time += 0.01;
        scene.meshes.forEach((mesh: BABYLON.AbstractMesh) => {
          if (mesh.name === "flower") {
            mesh.position.y -= 0.01;
            mesh.scaling = new BABYLON.Vector3(
              1 + Math.sin(time) * 0.1,
              1 + Math.sin(time) * 0.1,
              1 + Math.sin(time) * 0.1
            );
          }
        });
      });

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener("resize", () => {
        engine.resize();
      });

      return () => {
        engine.dispose();
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Babylonjs;