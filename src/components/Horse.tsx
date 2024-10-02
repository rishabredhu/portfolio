'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Horse: React.FC = () => {
  const gallop = {
    y: [0, -10, 0, -5],
    rotate: [0, 5, 0, -5],
  }

  return (
    <motion.div
      className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
      animate={gallop}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 100 100"
        className="fill-white drop-shadow-lg"
      >
        <motion.path
          d="M70 5 C65 5 55 15 55 25 C55 35 65 40 75 40 C85 40 90 35 90 25 C90 15 80 5 70 5 Z"
          animate={{ rotate: [0, 5, 0, -5] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        /> {/* Head */}
        <path d="M75 40 C85 40 90 45 90 55 C90 65 85 75 75 75 C65 75 60 65 60 55 C60 45 65 40 75 40 Z" /> {/* Body */}
        <motion.path
          d="M65 75 C60 80 55 85 50 90 C45 85 40 80 35 75"
          animate={{ y: [0, 5, 0, -5] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        /> {/* Back legs */}
        <motion.path
          d="M85 75 C80 80 75 85 70 90 C65 85 60 80 55 75"
          animate={{ y: [0, -5, 0, 5] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        /> {/* Front legs */}
        <motion.path
          d="M90 45 C95 40 100 35 100 30 C100 25 95 20 90 25"
          animate={{ rotate: [0, 10, 0, -10] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        /> {/* Tail */}
      </svg>
    </motion.div>
  )
}

export default Horse