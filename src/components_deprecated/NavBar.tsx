
// NavBar.jsx

import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center p-4 bg-transparent">
      <div className="text-white text-2xl font-bold">
        My Portfolio
      </div>
      <div className="flex space-x-4">
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="text-white" />
        </a>
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="text-white" />
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} className="text-white" />
        </a>
        {/* Add more social icons as needed */}
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useEffect } from 'react';
// import '../App.css'; // Make sure to import the CSS file

// /**
//  * Navbar component that renders a footer with social profiles and a starry background
//  */
// const Navbar: React.FC = () => {
//   useEffect(() => {
//     createStars();
//     createConstellation();
//   }, []);

//   /**
//    * Creates star elements and appends them to the stars container
//    */
//   const createStars = () => {
//     const starsContainer = document.getElementById('stars');
//     if (starsContainer) {
//       for (let i = 0; i < 100; i++) {
//         const star = document.createElement('div');
//         star.classList.add('star');
//         star.style.width = `${Math.random() * 2 + 1}px`;
//         star.style.height = star.style.width;
//         star.style.left = `${Math.random() * 100}%`;
//         star.style.top = `${Math.random() * 100}%`;
//         star.style.animationDuration = `${Math.random() * 3 + 2}s`;
//         starsContainer.appendChild(star);
//       }
//     }
//   };

//   /**
//    * Creates constellation lines and appends them to the constellation container
//    */
//   const createConstellation = () => {
//     const constellation = document.getElementById('constellation');
//     const lines = [
//       {x1: 0, y1: 75, x2: 100, y2: 25, delay: 0},
//       {x1: 100, y1: 25, x2: 200, y2: 50, delay: 0.5},
//       {x1: 200, y1: 50, x2: 300, y2: 75, delay: 1},
//     ];
    
//     if (constellation) {
//       lines.forEach(line => {
//         const el = document.createElement('div');
//         el.classList.add('constellation-line');
//         el.style.width = `${Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2))}px`;
//         el.style.left = `${line.x1}px`;
//         el.style.top = `${line.y1}px`;
//         el.style.transform = `rotate(${Math.atan2(line.y2 - line.y1, line.x2 - line.x1)}rad)`;
//         el.style.transformOrigin = 'left center';
//         el.style.animation = `fadeIn 2s ${line.delay}s forwards`;
//         constellation.appendChild(el);
//       });
//     }
//   };

//   return (
//     <footer className="footer fixed bottom-0 left-0 right-0">
//       {/* <div className="stars" id="stars"></div>
//       <div className="constellation" id="constellation"></div> */}
//       <div className="footer-content">
//         <h2 className="mb-2">BUILDING YOUR NEXT</h2>
//         <p className="mb-4">G R E A T &nbsp; P R O D U C T</p>
//         <div className="social-icons flex justify-center space-x-4">
//           <a href="#" title="LinkedIn" className="social-icon transform hover:-translate-y-2 transition-transform duration-300">LinkedIn</a>
//           <a href="#" title="GitHub" className="social-icon transform hover:-translate-y-2 transition-transform duration-300">GitHub</a>
//           <a href="#" title="Twitter" className="social-icon transform hover:-translate-y-2 transition-transform duration-300">Twitter</a>
//           <a href="#" title="Medium" className="social-icon transform hover:-translate-y-2 transition-transform duration-300">Resume</a>
//           <a href="#" title="Email" className="social-icon transform hover:-translate-y-2 transition-transform duration-300">Email</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Navbar;