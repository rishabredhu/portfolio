import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import EasterEgg from './EasterEgg';
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
    { name: 'email', url: 'mailto:rishabredhu@gmail.com', icon: FaEnvelope },
    { name: 'resume', url: 'https://www.dropbox.com/scl/fi/8788fi9wqen0i819xvgcl/resume_RishabNG.pdf?rlkey=21yrb3ilpqrv105tm2ycljuxy&st=nyz59zg2&dl=0', icon: FaFileAlt },
    
  ];

/**
 * FlowerNavbar component
 * 
 * This component renders a navigation bar with animated icons for various links.
 * The icons are displayed in a row and have hover and tap animations.
 * 
 * @returns {JSX.Element} The rendered FlowerNavbar component
 */
export default function FlowerNavbar() {
  return (
    <nav className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="flex flex-col items-center justify-center space-y-4 bg-black bg-opacity-20 backdrop-blur-lg rounded-full p-2 shadow-lg"
      >
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-2 rounded-full text-white hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
            whileHover={{ scale: 1.7 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">{link.name}</span>
            <link.icon className="w-6 h-6" /> {/* Increased icon size */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-200 via-green-500 to-blue-500 opacity-0"
              initial={false}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            />
          </motion.a>
        ))}
      </motion.div>

      <EasterEgg word="WOW"
      textColor="white"
      boldText={true} />
    </nav>
  )
}