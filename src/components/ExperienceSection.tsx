"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'

interface Achievement {
  company: string
  descriptions: string[]
}

const achievements: Achievement[] = [
  {
    company: "Intel Corporation",
    descriptions: [
      "Developed high-throughput data pipeline processing 5,000+ records/second using Apache Kafka and Spark.",
      "Implemented AWS Redshift and S3 for data warehousing, reducing query times by 40%."
    ]
  },
  {
    company: "Center of Urban Science, NYU",
    descriptions: [
      "Utilized Airflow and Docker for sentiment analysis and topic modeling on unstructured data.",
      "Developed predictive models achieving 20% resource optimization."
    ]
  },
  {
    company: "Radical AI",
    descriptions: [
      "Led development of new features for LLM-based product.",
      "Fine-tuned PyTorch-based similarity search model, improving face detection accuracy by 12%."
    ]
  },
  {
    company: "Github",
    descriptions: [
      "Contributed to AI Hawk, an open-source project with 11k+ GitHub stars.",
      "Implemented WebRPC service in Go using gRPC for real-time sensor data transmission."
    ]
  }
]

/**
 * Card Component
 * 
 * This component is a styled container that provides a glowing effect to its children.
 * It uses a combination of CSS classes to create a visually appealing card with a glow.
 * 
 * @component
 * @param {React.ReactNode} children - The content to be displayed inside the card.
 * @example
 * <Card>
 *   <p>Your content here</p>
 * </Card>
 */
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative overflow-hidden rounded-3xl shadow-lg p-8 border border-purple-500/50">
    <div className="absolute inset-0 bg-gradient-to-br from-white-600/10 to-pink-600/10 z-0 blur-md"></div>
    <div className="relative z-10 text-white glow">{children}</div>
  </div>
)

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
  <div className="mb-6">
    <h3 className="text-3xl font-bold mb-4 font-tech">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-600 animate-pulse">
        {achievement.company}
      </span>
    </h3>
    <ul className="space-y-3">
      {achievement.descriptions.map((description, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start text-white font-futuristic"
        >
          <span className="text-purple-500 mr-2 flex-shrink-0 font-bold">▹</span>
          <span>{description}</span>
        </motion.li>
      ))}
    </ul>
  </div>
)

export default function EnhancedClearExperienceCard() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length)
  }

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>
          {`
            .font-tech {
              font-family: 'Orbitron', sans-serif;
            }

            .font-futuristic {
              font-family: 'Rajdhani', sans-serif;
            }
          `}
        </style>
      </Head>
      <div className="relative w-full max-w-3xl mx-auto">
        <Card>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementCard achievement={achievements[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </Card>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex space-x-2">
          {achievements.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-purple-500' : 'bg-purple-300'
              }`}
              animate={{
                scale: index === currentIndex ? 1.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </>
  )
}