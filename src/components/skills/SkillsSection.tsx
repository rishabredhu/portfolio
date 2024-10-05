"use client";

import React, { useState, useEffect } from 'react';
import SkillCard from './SkillCard';
import SkillModal from './SkillModal';
import { skills, Skill } from '../data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

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
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);

  useEffect(() => {
    const filtered = skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredSkills(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <motion.h1 
        className="text-5xl text-center text-white font-tech mb-12 glow-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h1>
      <div className="flex flex-wrap justify-center mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`glow-button m-2 px-4 py-2 rounded-full font-futuristic text-sm transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-gray-800 text-gray-300 hover:bg-purple-500 hover:text-white'
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full px-12 py-3 rounded-full bg-gray-800 text-white font-futuristic focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchQuery && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
            onClick={() => setSearchQuery('')}
          >
            <X size={20} />
          </button>
        )}
      </div>
      <AnimatePresence>
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
      </AnimatePresence>
      {filteredSkills.length === 0 && (
        <motion.p
          className="text-center text-gray-400 font-futuristic mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No skills found. Try adjusting your search or category.
        </motion.p>
      )}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsSection;