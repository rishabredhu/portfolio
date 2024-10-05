// components/SkillCard.tsx

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../data/skills';

interface SkillCardProps {
  skill: Skill;
  onClick: (skill: Skill) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => (
  <motion.div
    className="skill-card relative group cursor-pointer p-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    onClick={() => onClick(skill)}
  >
    <img src={skill.icon} alt={skill.name} className="w-12 h-12 mx-auto" />
    <p className="text-center text-white mt-2 font-futuristic">{skill.name}</p>
  </motion.div>
);

export default SkillCard;
