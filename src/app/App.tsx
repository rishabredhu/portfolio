// File: src/pages/index.tsx

import React, { useState, useEffect } from 'react';
import {LandingPage} from '@/components/LandingPage';

const Home: React.FC = () => {
  const [isLandingPageLoaded, setIsLandingPageLoaded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLandingPageLoaded(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <main className="content-area">
        {!isLandingPageLoaded ? (
          <LandingPage />
        ) : (
          <>
            <Bar 
              text="Playing in 3D, building in code, and occasionally pondering the meaning of it all. Welcome to my world." 
              height="75px" 
              backgroundColor="#000" 
              textColor="#fff"
              fontFamily="Courier New"
              fontSize="34px"
            />
            <FlowerNavbar />
            <Scene />
            <Bar 
              text="Optimizing a neural network is like managing your own life—you think you're improving, but deep down, you know it's just gradient descent into chaos."
              height="100px" 
              backgroundColor="white" 
              textColor="black"
              fontFamily="Courier New"
              fontSize="34px"
              additionalElement={<EasterEgg word="🎧" textColor="brown"/>}
            />
            <Projects />
            <Bar 
              text="Software Engineer | Machine Learning Engineer | Music Creator | Photographer"
              height="50px"
              backgroundColor="white"
              textColor="red"
              fontFamily="Courier New"
              isQuote={true}
              fontSize="24px"
              boldText={true}
            />
            <Chatbot />
            <ServerData />
          </>
        )}
      </main>
      <SpeedInsights />
      <Analytics />
    </div>
  )
};

export default Home;