import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SpaceScene from './components/SpaceScene';
import './App.css';
import FlowerNavbar from './components/FlowerNavbar'; // Import the new FlowerNavbar component
import BabylonCanvas from './components/Babylonjs';
// Import necessary types from Three.js
import Navbar from './components/FlowerNavbar';
import { Vector3 } from 'three';
import Scene from './components/Scene';
// Define props interface for SpaceScene
interface SpaceSceneProps {
  scale: Vector3;
  position: Vector3;
}

/**
 * App component
 * 
 * The main component that manages the loading of the LandingPage and Spaceman components.
 * It switches from LandingPage to Spaceman after a simulated loading period.
 * The Navbar is only rendered after the loading phase is complete.
 * A Footer is added to the bottom of the page.
 */
function App() {
  // State to manage whether the LandingPage has completed loading
  const [isLandingPageLoaded, setIsLandingPageLoaded] = useState(false);

  /**
   * Simulates loading of the LandingPage by setting a timeout.
   * The Spaceman component, Navbar, and AboutMe component will be displayed once the LandingPage has completed loading.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLandingPageLoaded(true);
    }, 5000); // Simulates a 5-second loading delay

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  return (
    
    <div className="app-container">
      <main className="content-area">
        {/* Render either the LandingPage or the Spaceman and AboutMe components based on loading state */}
        {!isLandingPageLoaded ? (
          <LandingPage />
        ) : (
          <>
            <div style={{ position: 'relative' }}>
              {/* Place BabylonCanvas first to ensure it's behind the Navbar */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <BabylonCanvas />
              </div>
              {/* Place Navbar on top with a higher z-index */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <FlowerNavbar />
              </div> 
            </div>
            
            <Scene />
          </>
        )}
      </main>
    </div>
  )
};
export default App;
