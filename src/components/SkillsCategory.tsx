'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const skillCategories = [
  {
    name: 'Software Engineering',
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
  {
    name: 'Cloud & DevOps',
    skills: [
      'AWS Services',
      'Google Cloud Platform',
      'Azure Services',
      'Kubernetes',
      'Docker',
      'Terraform',
      'Jenkins',
      'GitLab CI',
    ]
  }
]

export default function SkillsCategory() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)

  const nextCategory = () => {
    setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % skillCategories.length)
  }

  const prevCategory = () => {
    setCurrentCategoryIndex((prevIndex) => (prevIndex - 1 + skillCategories.length) % skillCategories.length)
  }

  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Skills</h1>
      
      <div className="w-full max-w-4xl border-2 border-purple-500 rounded-lg p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategoryIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold text-purple-400 mb-6">
              {skillCategories[currentCategoryIndex].name}
            </h2>
            <div className="grid grid-cols-3 gap-4 w-full">
              {skillCategories[currentCategoryIndex].skills.slice(0, 3).map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-end"
                >
                  <div className="border border-cyan-400 rounded px-4 py-2 text-cyan-400 text-sm text-right">
                    {skill}
                  </div>
                </motion.div>
              ))}
              <div className="col-span-1">
                {skillCategories[currentCategoryIndex].skills.slice(3, 5).map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 3) * 0.1 }}
                    className="border border-cyan-400 rounded px-4 py-2 text-cyan-400 text-sm mb-4"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
              <div className="col-span-1">
                {skillCategories[currentCategoryIndex].skills.slice(5, 7).map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index + 5) * 0.1 }}
                    className="border border-cyan-400 rounded px-4 py-2 text-cyan-400 text-sm mb-4"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
              <div className="col-span-1">
                {skillCategories[currentCategoryIndex].skills.slice(7).map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 7) * 0.1 }}
                    className="border border-cyan-400 rounded px-4 py-2 text-cyan-400 text-sm mb-4"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
          <button
            onClick={prevCategory}
            className="bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
          <button
            onClick={nextCategory}
            className="bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="mt-6 flex items-center space-x-4">
        <button
          onClick={prevCategory}
          className="bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-purple-400 text-lg">
          {currentCategoryIndex + 1} / {skillCategories.length}
        </span>
        <button
          onClick={nextCategory}
          className="bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}