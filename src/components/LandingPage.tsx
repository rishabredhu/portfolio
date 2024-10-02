'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Vector3 } from 'three'

import SpaceScene from './SpaceScene'
import SpaceWarp from './SpaceWarp'


// LandingPage component: Displays a loading screen with a running horse animation
const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50) // Adjust this value to change the loading speed

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-900 overflow-hidden">
      
      <SpaceScene
            scaleVector={new Vector3(1, 1, 1)}
            positionVector={new Vector3(-10, 0, 0)}
          />
      <SpaceWarp scrollContainer={scrollContainerRef} />
      <div className="absolute bottom-4 left-4 flex items-center justify-center">
        <h1 className="text-2xl text-green-400 bg-black p-2 rounded-md" style={{
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: '2px',
          fontWeight: '300',
          border: '1px solid #00ff00',
          boxShadow: '0 0 5px #00ff00',
          transition: 'all 0.3s ease'
        }}>
          LOADING: {loading}%
        </h1>
      </div>
    </div>
  )
}

export default LandingPage