"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import sunsetImage from '../assets/mkbhd/5.jpeg'

/**
 * DesertSunset Component
 * 
 * This component creates a full-screen interactive desert sunset scene with a dynamic, animated overlay.
 * It includes a background image, SVG filter for displacement, and parallax scrolling effects.
 * 
 * @param {Object} props - The properties passed to the component
 * @param {string} props.headerText - The text to display in the header (default: "Rishab Singh")
 * @param {string} props.subText - The subtext to display below the header (default: "helping you create your next great idea, product or service.")
 */
interface DesertSunsetProps {
  headerText?: string;
  subText?: string;
}

export default function DesertSunset({
  headerText = "Rishab Singh",
  subText = "helping you create your next great idea, product or service."
}: DesertSunsetProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* SVG filter for displacement effect */}
      <svg width="0" height="0">
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.1 0.1"
            numOctaves="9"
            result="turbulence"
            seed="1"
          >
            <animate
              attributeName="seed"
              from="1"
              to="10"
              dur="15s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Background Image with animated overlay */}
      <motion.div
        initial={{ filter: 'url(#displacementFilter)' }}
        animate={{
          filter: [
            'url(#displacementFilter)',
            'url(#displacementFilter) hue-rotate(360deg)',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        <img
          src={sunsetImage}
          alt="Desert Sunset"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-4 sm:px-6 lg:px-8">
        {/* Joshua trees and desert plants silhouettes with parallax effect */}
        <div className="absolute bottom-0 left-0 right-0" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <svg
            viewBox="0 0 1200 300"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0,300 L50,280 Q75,260 100,280 L150,300 L200,280 Q225,260 250,280 L300,300 L350,280 Q375,240 400,280 L450,300 L500,280 Q525,220 550,280 L600,300 L650,280 Q675,240 700,280 L750,300 L800,280 Q825,260 850,280 L900,300 L950,280 Q975,240 1000,280 L1050,300 L1100,280 Q1125,260 1150,280 L1200,300 Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Text content with parallax effect */}
        <div className="relative text-center" style={{ transform: `translateY(${scrollY * -0.3}px)` }}>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {headerText}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {subText}
          </p>
        </div>
      </div>
    </div>
  )
}