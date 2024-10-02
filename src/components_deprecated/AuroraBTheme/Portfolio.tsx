import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {  Group } from 'three';

import { FaComments } from 'react-icons/fa';
import Navbar from '../NavBar';
import ChatbotComponent from '../WallpaperParticle';

import { ScrollArea } from '../ui/Elements';
import ParticleSystem from '../theme1/ParticleSystem';

// Rotating scene component
const RotatingScene = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

/**
 * Portfolio component
 */
export default function Portfolio() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // State to control particle transition
    const [transitionTrigger, setTransitionTrigger] = useState(false);

    // Toggle between forming sphere and dispersing
    const toggleParticles = () => {
        setTransitionTrigger((prev) => !prev);
    };

    useEffect(() => {
    setIsMounted(true);
    }, []);

    const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    };

    if (!isMounted) {
    return null; // or a loading spinner
    }

    return (
        <ScrollArea className="h-full w-full">
          <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans">
            {/* Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 40], fov: 75 }}>
                <RotatingScene>
                  {/* Include ParticleSystem */}
                  <ParticleSystem transitionTrigger={transitionTrigger} />
                  {/* Other 3D components */}
                </RotatingScene>
              </Canvas>
            </div>
    
            {/* Menu or Button to Trigger Transition */}
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button
                onClick={toggleParticles}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                {transitionTrigger ? 'Disperse Particles' : 'Form Sphere'}
              </button>
            </div>

        

        
        {/* Navbar moved to footer */}
        {/* <footer className="fixed bottom-0 left-0 right-0"> */}
          <Navbar />
        {/* </footer> */}


        {/* Render Chatbot when showChatbot is true */}
        {showChatbot && <ChatbotComponent onClose={toggleChatbot} />}

        {/* Chatbot Toggle Button */}
        <button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Toggle Chatbot"
        >
          <FaComments size={24} />
        </button>
      </div>
    </ScrollArea>
  );
}
