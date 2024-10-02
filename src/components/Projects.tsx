'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Cpu, Zap, Brain, Database, Send, Building2, Code, BarChart2, ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { Button, Input, ScrollArea } from "./ui/Elements"
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

/**
 * Projects component displaying the portfolio and chatbot interface.
 * @returns {JSX.Element} The rendered Projects component
 */
export default function Projects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Greetings, temporal traveler. How may I assist you in your journey through the cosmic web?" }
  ])
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSkillIndex, setActiveSkillIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false)
  const [isChatBotVisible, setIsChatBotVisible] = useState(false)

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { sender: 'user', text: inputMessage }])
      setInputMessage('')
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: "Fascinating query. The bot is aligning to formulate a response." }])
      }, 1000)
    }
  }

 

  const skillCategories = [
    {
      name: 'Software Engineering',
      icon: <Code className="w-8 h-8 text-orange-500" />,
      skills: [
        
        'Full-Stack Development',
        'Cloud Infrastructure (AWS, GCP)',
        'DevOps & CI/CD',
        'Microservices & API Design',
        'Distributed Systems',
        'Visualization Dashboards',
        'Performance Optimization',
        'Systems Architecture',
        
      ]
    },
    {
      name: 'Data & AI',
      icon: <Brain className="w-8 h-8 text-orange-500" />,
      skills: [
        'Machine Learning',
        'Deep Neural Networks',
        'Natural Language Processing',
        'Computer Vision',
        'Big Data Processing',
        'ETL & Data Pipelines',
        'Statistical Analysis',
        'Predictive Modeling',
        
      ]
    },
  ]

  // Define the prop type for SkillItem
  interface SkillItemProps {
    skill: string;
  }

  // Use the defined interface for the component props
  const SkillItem: React.FC<SkillItemProps> = ({ skill }) => (
    <div className="bg-black border border-orange-500 rounded-sm p-2 text-center transform transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:text-orange-400">
      <span className="text-sm font-mono text-orange-500">{skill}</span>
    </div>
  )

  // Define the props interface for RetroCard
  interface RetroCardProps {
    category: {
      name: string;
      icon: React.ReactNode;
      skills: string[];
    };
    isActive: boolean;
  }

  const RetroCard: React.FC<RetroCardProps> = ({ category, isActive }) => (
    <motion.div
      initial={{ opacity: 0, rotateY: 180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -180 }}
      transition={{ duration: 0.5 }}
      className={`absolute inset-0 bg-black rounded-sm border-2 border-orange-500 p-4 ${
        isActive ? 'z-10' : 'z-0'
      }`}
      style={{
        boxShadow: '0 0 15px rgba(255, 165, 0, 0.3), inset 0 0 5px rgba(255, 165, 0, 0.2)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 border-b border-orange-00 pb-2">
          <h3 className="text-xl font-bold font-mono text-orange-500">{category.name}</h3>
          {category.icon && <div>{category.icon}</div>}
        </div>
        <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-grow">
          {category.skills.map((skill) => (
            <SkillItem key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </motion.div>
  )

  const CRTOverlay = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-orange-900/10"></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 165, 0, 0.03) 0px, rgba(255, 165, 0, 0.03) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 2px' }}></div>
    </div>
  )

  const handleCardFlip = (direction: number) => {
    if (isFlipping) return
    setIsFlipping(true)
    const newIndex = (activeSkillIndex + direction + skillCategories.length) % skillCategories.length
    setActiveSkillIndex(newIndex)
    setTimeout(() => setIsFlipping(false), 500)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handleCardFlip(-1)
      if (event.key === 'ArrowRight') handleCardFlip(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSkillIndex, isFlipping])

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative overflow-hidden">
      {/* Canvas for particle animation */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ mixBlendMode: 'screen' }}></canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-70"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header section */}
        <header className="mb-8 text-center">
         
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }} // Added 3D rotation on hover
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
            className="text-3xl text-gray-200 font-light tracking-wide mb-8 inline-block" // Added inline-block for better 3D effect
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
              transformStyle: 'preserve-3d', // Enable 3D transformations
              perspective: '1000px' // Add perspective for 3D effect
            }}
          >
            "Blending AI Brains with Human Creativity"
          </motion.p>
          <p>

            
          </p>
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
            <>
              <motion.main
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-800 mb-8"
                style={{ boxShadow: '0 0 30px rgba(255,165,0,0.1), inset 0 0 30px rgba(255,165,0,0.05)' }}
              >
                <section className="p-8 relative">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10"></div>
                  
                  {/* Section title */}
                  <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2 relative"
                    style={{
                      background: `linear-gradient(to bottom right, #FFA500, #00CED1)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 20px rgba(255,165,0,0.3), 0 0 40px rgba(0,206,209,0.1)',
                      filter: 'hue-rotate(90deg) saturate(200%)'
                    }}
                  >
                    Candidate ID: Rishab Singh
                  </motion.h2>
                  
                  {/* Professional Expertise */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <h3 className="text-2xl font-medium text-gray-300 mb-4">Some Achievements to be proud of</h3>
                    <ul className="space-y-3 text-gray-400 font-light relative">
                      {[
                        {
                          icon: <Cpu className="w-5 h-5 mr-2 text-orange-500/50" />,
                          text: "Developed <span class='text-orange-500 glow-text'>high-throughput data pipeline</span> processing <span class='text-orange-500 glow-text'>5,000+ records/second</span> using <span class='text-orange-500 glow-text'>Apache Kafka, and Spark</span>; implemented <span class='text-orange-500 glow-text'>AWS Redshift and S3</span> for data warehousing, reducing query times by 40%."
                        },
                        {
                          icon: <Zap className="w-5 h-5 mr-2 text-orange-500/50" />,
                          text: "Utilized <span class='text-orange-500 glow-text'>Airflow, Docker, and NLP libraries</span> to analyze unstructured textual data for <span class='text-orange-500 glow-text'>sentiment analysis and topic modeling</span>; developed predictive models achieving <span class='text-orange-500 glow-text'>20% resource optimization</span>."
                        },
                        {
                          icon: <Brain className="w-5 h-5 mr-2 text-orange-500/50" />,
                          text: "Led development of new features for <span class='text-orange-500 glow-text'>LLM-based product</span>; fine-tuned <span class='text-orange-500 glow-text'>PyTorch-based similarity search model</span>, improving face detection accuracy by 12%."
                        },
                        {
                          icon: <Code className="w-5 h-5 mr-2 text-orange-500/50" />,
                          text: "Contributed to <span class='text-orange-500 glow-text'>AI Hawk</span>, an open-source project with <span class='text-orange-500 glow-text'>11k+ GitHub stars</span>; implemented <span class='text-orange-500 glow-text'>WebRPC service in Go</span> using gRPC for real-time sensor data transmission."
                        }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"                          whileHover={{ scale: 1.02, color: "#FFA500" }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.icon}
                          <span className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: item.text }}></span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  {/* Spacer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="my-12 border-t border-gray-700 opacity-30"
                  />
                  
                  
            {/* Skills Section */}
            <section>
                  <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-12"
              >
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">Skills</h3>
      {/*             
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-500"></span>
                  </h3> */}
                  <div className="relative w-full max-w-2xl aspect-[4/3] perspective-1000 mx-auto">
                  <div className="relative w-full h-full transform-style-preserve-3d">
                      <AnimatePresence>
                      {skillCategories.map((category, index) => (
                          index === activeSkillIndex && (
                          <RetroCard key={category.name} category={category} isActive={index === activeSkillIndex} />
                          )
                      ))}
                      </AnimatePresence>
                  </div>
                  <CRTOverlay />
                  </div>
                  <div className="mt-8 flex justify-center items-center space-x-4">
                  <button
                      onClick={() => handleCardFlip(-1)}
                      className="p-2 border border-orange-500 rounded-full hover:bg-orange-500 hover:text-black transition-colors duration-300"
                      aria-label="Previous skill category"
                  >
                      <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="font-mono text-lg text-orange-500">
                      {activeSkillIndex + 1} / {skillCategories.length}
                  </span>
                  <button
                      onClick={() => handleCardFlip(1)}
                      className="p-2 border border-orange-500 rounded-full hover:bg-orange-500 hover:text-black transition-colors duration-300"
                      aria-label="Next skill category"
                  >
                      <ChevronRight className="w-6 h-6" />
                  </button>
                  </div>
              </motion.div>
             </section>
                </section>
              </motion.main>
            </>
          )}
        </AnimatePresence>

        {/* Chatbot Section */}
        <main className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-800" style={{ boxShadow: '0 0 30px rgba(255,165,0,0.1), inset 0 0 30px rgba(255,165,0,0.05)' }}>
          <section className="p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent"></div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2 relative"
            >
              Learn more about me through this bot
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-gray-800 rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm relative"
              style={{ boxShadow: 'inset 0 0 20px rgba(255,165,0,0.05)' }}
            >
              <div className="absolute inset-0 rounded-2xl led-border"></div>
              <ScrollArea className="h-[300px] p-4 relative z-10">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <span className={`inline-block p-3 rounded-xl ${message.sender === 'user' ? 'bg-orange-900/20 text-gray-200' : 'bg-gray-900/50 text-gray-300'}`} style={{ boxShadow: message.sender === 'user' ? '0 0 15px rgba(255,165,0,0.1)' : 'none' }}>
                        {message.text}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="flex p-4 bg-black/50 border-t border-gray-800 relative z-10">
                <Input
                  type="text"
                  placeholder="Transmit your query across time..."
                  value={inputMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                  className="flex-grow mr-2 bg-gray-900/50 border-gray-700 text-gray-200 placeholder-gray-500"
                />
                <Button type="submit" className="bg-orange-900/30 text-gray-200 hover:bg-orange-800/30 transition-colors duration-300">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
            </motion.div>
          </section>
        </main>
      </div>
   </div>
  )
}