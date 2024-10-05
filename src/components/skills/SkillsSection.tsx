// components/SkillsSection.tsx

"use client";

import React, { useState } from 'react';
import SkillCard from './SkillCard';
import SkillModal from './SkillModal';
import { skills, Skill } from '../data/skills';
import { motion } from 'framer-motion';

const categories: string[] = [
  'All',
  'Programming Languages',
  'AI & Machine Learning',
  'Frameworks & Tools',
  'Cloud & DevOps',
  'Data Engineering & Databases',
];

const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl text-center text-white font-tech mb-8">
        Skills
      </h1>
      <div className="flex flex-wrap justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`glow-button m-2 font-futuristic ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white font-futuristic"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} onClick={setSelectedSkill} />
        ))}
      </motion.div>
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
};

export default SkillsSection;
