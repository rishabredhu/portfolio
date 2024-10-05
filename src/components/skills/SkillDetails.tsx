import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../data/skills';
import { Project } from '../data/projects';
import { Icon } from '@iconify/react';


// Define the SkillDetailsProps interface if not already defined
interface SkillDetailsProps {
  skill: Skill;
  projects: Project[];
  onClose: () => void;
}

export default function SkillDetails({ skill, projects, onClose }: SkillDetailsProps) {
  const relevantProjects = projects.filter(project => project.skills.includes(skill.name));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <Icon icon={skill.icon} className="text-4xl mr-4" />
          <h2 className="text-2xl font-orbitron">{skill.name}</h2>
        </div>
        <p className="mb-4 font-rajdhani">{skill.description}</p>
        <div className="mb-4">
          <h3 className="text-xl font-orbitron mb-2">Proficiency</h3>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProficiencyPercentage(skill.proficiency)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="mt-1 font-rajdhani">{skill.proficiency}</p>
        </div>
        <h3 className="text-xl font-orbitron mb-2">Related Projects</h3>
        <ul className="list-disc list-inside font-rajdhani">
          {relevantProjects.map(project => (
            <li key={project.name}>{project.name} - {project.descriptions[0]}</li>
          ))}
        </ul>
        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function getProficiencyPercentage(proficiency: string): number {
  switch (proficiency) {
    case 'Beginner': return 25;
    case 'Intermediate': return 50;
    case 'Advanced': return 75;
    case 'Expert': return 100;
    default: return 0;
  }
}