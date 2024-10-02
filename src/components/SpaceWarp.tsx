'use client'

import React, { useRef, useEffect, useState } from 'react';

/**
 * Represents a star in the space warp effect.
 */
interface Star {
  x: number       // X-coordinate of the star
  y: number       // Y-coordinate of the star
  z: number       // Z-coordinate of the star (depth)
  r: number       // Radius of the star
  color: string   // Color of the star
  speed: number   // Speed of the star
}

interface SpaceWarpCanvasProps {
  scrollContainer: React.RefObject<HTMLElement>;
}

/**
 * SpaceWarpCanvas component creates a space warp effect with stars.
 * It simulates traveling through space at a speed that increases when not at the Navbar.
 * 
 * @param {SpaceWarpCanvasProps} props - The component props
 * @param {React.RefObject<HTMLElement>} props.scrollContainer - Reference to the scroll container element
 * @returns {JSX.Element} The SpaceWarpCanvas component
 */
const SpaceWarpCanvas: React.FC<SpaceWarpCanvasProps> = ({ scrollContainer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAtNavbar, setIsAtNavbar] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const colorPalette = ['#ffffff', '#ffffdd', '#ddddff', '#ffdddd'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = 700;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          r: Math.random() * 0.5 + 0.1,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          speed: Math.random() * 3.5 + 1  // Reduced speed range from (2-7) to (1-3.5)
        });
      }
    };

    const moveStars = (baseSpeed: number) => {
      stars.forEach(star => {
        const speedMultiplier = isAtNavbar ? 0.5 : 1.5;  // Increase speed when not at Navbar
        star.z -= (baseSpeed + star.speed) * speedMultiplier;
        if (star.z <= 1) {
          star.z = 1000;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }
      });
    };

    const drawStars = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        const scale = 100 / star.z;
        const x = star.x * scale + canvas.width / 2;
        const y = star.y * scale + canvas.height / 2;
        const r = star.r * scale;

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Add a subtle glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 2);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r * 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      const scrollY = scrollContainer.current?.scrollTop || 0;
      const baseSpeed = 1 + scrollY * 0.01;
      setIsAtNavbar(scrollY < 100);  // Assume Navbar height is 100px
      moveStars(baseSpeed);
      drawStars();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollContainer, isAtNavbar]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default SpaceWarpCanvas;
