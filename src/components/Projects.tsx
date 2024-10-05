'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Cpu, Zap, Brain, Database, Send, Building2, Code, BarChart2, ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { Button, Input, ScrollArea } from "./ui/Elements"
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import SkillsSection from './skills/SkillsSection'
import StardustBackground from './StardustBackground'

/**
 * Projects component displaying the portfolio and skills.
 * @returns {JSX.Element} The rendered Projects component
 */
export default function Projects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; radius: number; color: string; vx: number; vy: number }[] = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(255, 165, 0, ${Math.random() * 0.5 + 0.5})`,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    /**
     * Animates particles on the canvas.
     * Clears the canvas and updates each particle's position.
     */
    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height)

        particles.forEach(particle => {
          particle.x += particle.vx
          particle.y += particle.vy

          // Check if canvas is not null before accessing its properties
          if (canvas) {
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
          }

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        })
      }
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const CRTOverlay = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-orange-900/10"></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 165, 0, 0.03) 0px, rgba(255, 165, 0, 0.03) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 2px' }}></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative overflow-hidden">
      <StardustBackground />
      <CRTOverlay />
      
      <div className="relative z-10">
        <header className="mb-8 text-center">
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
            className="text-3xl text-gray-200 font-light tracking-wide mb-8 inline-block"
            style={{
              background: 'linear-gradient(to bottom right, #FFA500, #00CED1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,165,0,0.3), 0 0 40px rgba(0,206,209,0.1)',
              fontSize: '3.5rem',
              lineHeight: '1.2',
              padding: '0.5rem 0',
              margin: '0.5rem 0',
              filter: 'hue-rotate(90deg) saturate(200%)',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            "Blending AI Brains with Human Creativity"
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
            className="flex items-center justify-center space-x-2 mx-auto text-orange-500 hover:text-orange-400 transition-colors duration-300"
          >
            <span>{isExperienceExpanded ? 'Hide' : 'Show'} Experience</span>
            {isExperienceExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
        </header>

        <AnimatePresence>
          {isExperienceExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
    
              <SkillsSection />
              
            </motion.div>
          )}
        </AnimatePresence>

      
      </div>
    </div>
  )
}