import React, { useState, useRef, useEffect } from 'react';
import ChatIcon from '../assets/bunny.mp4';

interface ChatbotProps {
  onClose: () => void;
}

/**
 * Chatbot component that displays the chatbot interface
 */
const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        setIsLoaded(true);
        videoRef.current?.play();
      };
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading chatbot...</div>;
  }

  return (
    <div
      className="chatbot-container"
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>

      {/* Chatbot content */}
      <div className="chatbot-content" style={{ marginTop: '50px' }}>
        {/* Replace this with your chatbot UI and logic */}
        <h3>Chatbot</h3>
        <p>Interact with your chatbot here!</p>
      </div>
    </div>
  );
};

export default Chatbot;
