import React from 'react'

interface ChatBotProps {
  onClose: () => void
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '300px',
      height: '400px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      zIndex: 1001
    }}>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <h2>Chat with Agent</h2>
      {/* Add your chatbot implementation here */}
    </div>
  )
}

export default ChatBot