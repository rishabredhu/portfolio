"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects, Project } from "../data/projects";
import { Skill } from "../data/skills";

interface SkillModalProps {
  skill: Skill;
  onClose: () => void;
}

const proficiencyLevels: { [key: string]: number } = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
  const relatedProjects: Project[] = projects.filter((project) =>
    project.skills.includes(skill.name)
  );

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-lg p-6 w-full max-w-lg relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:text-purple-500 transition-colors duration-300"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-16 h-16 mx-auto"
          />
          <h2 className="text-2xl text-white mt-2 font-tech glow-text">{skill.name}</h2>
          <div className="mt-4">
            <p className="text-white font-futuristic">{skill.description}</p>
          </div>
          <div className="mt-4">
            <div className="relative w-64 h-4 bg-gray-700 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-4 bg-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${proficiencyLevels[skill.proficiency]}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-white mt-2 font-futuristic">
              Proficiency: {skill.proficiency}
            </p>
          </div>
          <div className="mt-6 text-left">
            <h3 className="text-xl text-white font-tech glow-text">Projects:</h3>
            <ul className="mt-2 space-y-2">
              {relatedProjects.map((project, index) => (
                <li key={index} className="text-white font-futuristic">
                  <strong>{project.name}</strong>: {project.descriptions[0]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillModal;