import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Code, Zap, Database, Layers } from 'lucide-react'

/**
 * AboutMe Component
 * 
 * This component displays information about a Multidimensional Developer,
 * including their skills and a brief introduction.
 */
export default function AboutMe() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null)

  const skills = [
    { icon: <Code size={24} />, name: 'Quantum Coding', description: 'Manipulating reality through advanced algorithmic structures.' },
    { icon: <Zap size={24} />, name: 'Neural UI Design', description: 'Crafting interfaces that adapt to users\' subconscious desires.' },
    { icon: <Database size={24} />, name: 'Time-Space Data Management', description: 'Organizing information across multiple dimensions and timelines.' },
    { icon: <Layers size={24} />, name: 'Holographic Architecture', description: 'Building scalable systems in projected realities.' },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4 font-mono">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-black p-8 border border-white"
      >
        <h2 className="text-4xl font-bold mb-8 text-white tracking-tighter">
          IDENTITY MATRIX
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-white text-lg mb-6 leading-relaxed">
              Greetings, fellow entity. I am a Multidimensional Developer, weaving the fabric of reality through code. 
              My existence oscillates between crafting digital paradigms and exploring the outer reaches of technological frontiers.
            </p>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-2 px-6 py-2 bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-300"
            >
              INITIATE CONTACT SEQUENCE
            </motion.a>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">CAPABILITY MATRIX</h3>
            <ul className="list-none text-white space-y-4">
              {skills.map((skill, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center cursor-pointer"
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                  whileHover={{ x: 10 }}
                >
                  <ChevronRight className="mr-2" size={16} />
                  <span className="mr-2">{skill.icon}</span>
                  <span>{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        <AnimatePresence>
          {activeSkill !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-4 border border-white"
            >
              <p className="text-white">{skills[activeSkill].description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  )
}