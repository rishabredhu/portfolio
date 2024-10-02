import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaFileAlt } from 'react-icons/fa';

// Add this type definition at the top of the file
type NavLink = {
  name: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Update the type of your links array
const links: NavLink[] = [
    { name: 'github',  url: 'https://github.com/rishabredhu', icon: FaGithub },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/rishabredhuu/', icon: FaLinkedin },
    { name: 'twitter', url: 'https://twitter.com/rishabredhu', icon: FaTwitter },
    { name: 'resume', url: 'https://www.dropbox.com/scl/fi/ax6952w7gkvdt4xivxnbm/resume_RishabNG.pdf?rlkey=n96uae62f29mswlxnzknjyhm9&st=prexewm8&dl=0', icon: FaFileAlt },
    
  ];

export default function FlowerNavbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="flex items-center justify-center space-x-4 bg-black bg-opacity-20 backdrop-blur-lg rounded-full p-2 shadow-lg"
      >
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-2 rounded-full text-white hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">{link.name}</span>
            <link.icon />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0"
              initial={false}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            />
          </motion.a>
        ))}
      </motion.div>
    </nav>
  )
}