// components/ExperienceSection.tsx

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';

const ExperienceSection: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl text-center text-white font-tech mb-8">
        Experience
      </h1>
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="mb-8 p-6 rounded-lg bg-gray-800 shadow-lg border border-purple-500/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h2 className="text-2xl text-white font-tech mb-2">
            {experience.role} at {experience.company}
          </h2>
          <p className="text-gray-400 font-futuristic mb-4">
            {experience.duration}
          </p>
          <ul className="list-disc list-inside text-white font-futuristic space-y-2">
            {experience.descriptions.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceSection;
