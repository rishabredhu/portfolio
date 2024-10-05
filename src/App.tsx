import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';

import './App.css';
import FlowerNavbar from './components/FlowerNavbar'; // Import the new FlowerNavbar component

// Import necessary types from Three.js
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Vector3 } from 'three';
import Scene from './components/Scene';
import Projects from './components/Projects';
import Bar from './components/Bar';
import { Link } from 'react-router-dom'; // Add the import statement for Link
import EasterEgg from './components/EasterEgg';

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
  const [isLandingPageLoaded, setIsLandingPageLoaded] = useState(true);

  /**
   * Simulates loading of the LandingPage by setting a timeout.
   * The Spaceman component, Navbar, and AboutMe component will be displayed once the LandingPage has completed loading.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLandingPageLoaded(true);
    }, 4000); // Simulates a 5-second loading delay

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
            
            <Bar 
            text="Playing in 3D, building in code, and occasionally pondering the meaning of it all. Welcome to my world." 
            height="30px" 
            backgroundColor="#000" 
            textColor="#fff"
            fontFamily="Courier New"
            fontSize="24px"
             />
            <Bar 
            text="I'm a software engineer with a MS in Computer Science from New York University, USA || PREVIOUSLY: @Intel-->@RadicalAI-->@Headstarter. CURRENTLY: open to opportunities."
            height="100px"
            backgroundColor="black"
            textColor="violet"
            fontFamily="Courier New"
            isQuote={true}
            fontSize="18px"
            />

            <FlowerNavbar />


            <Scene />



            <Bar 
            text="In 3D rendering, as in life, the lighting always looks perfect until you actually hit ‘render’—then it’s shadows, glitches, and a deep existential crisis." 
            height="30px"
            fontSize="24px"
            backgroundColor="#000" 
            
            fontFamily="Times New Roman"
            textColor="#fff" />

            
            <Bar 
            text="<< UNDER CONSTRUCTION - COMING SOON >>"
            height="10px" 
            backgroundColor="orange" 
            textColor="black"
            boldText={true}
            fontFamily="Courier New"
            fontSize="12px"
            additionalElement={<EasterEgg word="HEAR THIS" textColor="brown"/>}
            
             />
            {/* <Projects /> */}
            
           
          </>
        )}
      </main>
      {/* Add SpeedInsights component to the layout */}
      <SpeedInsights />
    </div>
  )
};
export default App;






