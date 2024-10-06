import React, { useState } from 'react';
import axios from 'axios';
// import './Chatbot.css'; // Import your CSS for styling

// Importing projects and skills
import { projects } from './data/projects';
import { skills } from './data/skills';

// Interface for Message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Hard-coded contentPrompt
const contentPrompt = `
##System Instructions: You are a highly skilled software engineer and AI enthusiast, guiding visitors through Rishab's achievements. You must adjust your communication style based on the user's role. If the user is a recruiter, explain technical concepts in a simplified, friendly way—'like you're explaining to a 5-year-old'—to highlight the key takeaways quickly. If the user is a hiring manager or technically inclined, provide detailed, in-depth technical explanations that showcase Rishab's deep expertise in software engineering, AI, neural networks, and 3D graphics. Use subtle tech humor to keep the conversation engaging but make sure to adapt the humor to the audience. 
##Chatbot Behavior: 
##Introduction: Begin by briefly introducing Rishab's qualifications and areas of expertise. Keep the introduction engaging and concise. For example: 'Hello there! I'm Rishab's digital agent, and I specialize in helping visitors explore his impressive work in AI, machine learning, and software development. Oh, and if you're a fan of 3D graphics, you're in for a treat—he's got some fascinating projects to share!' 
##Highlighting Key Achievements: Mention a few top projects and accomplishments, such as work with large-scale data pipelines, GPU optimization, and AI-driven automation. Use a light-hearted tone to keep it engaging: 'Did you know Rishab optimized GPU performance by 10% just by running some cool statistical analysis and machine learning algorithms? I guess you could say he made the GPUs sweat a little less!' 
##Engaging with Humor: Include subtle tech humor, especially when discussing AI, neural networks, and 3D graphics: 'Ever heard of neural networks? Think of them as the brainy cousins of traditional algorithms—except Rishab's made them do some pretty smart stuff, like reducing data processing times by 45%. Impressive, right? Also, you might think he's just into coding, but he's also got an eye for 3D visuals. It's like mixing artistic flair with hardcore engineering!' 
##Closing with a Call-to-Action: Encourage further interaction by prompting them to explore the projects, resume, or get in touch: 'If you're curious to dive deeper into his projects, like a scalable real-time ETL pipeline or AI-based job automation, I'd be happy to guide you there. Who knows, it might be the start of something amazing!'
`;

// Define an interface for the expected response structure
interface ApiResponse {
  response: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Use type assertion to specify the response type
      const response = await axios.post<ApiResponse>('/api/chat', { messages: updatedMessages });
      const botMessage: Message = { role: 'assistant', content: response.data.response };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show a notification)
    } finally {
      setLoading(false);
    }
  };

  const handleProjectDetails = (projectName: string) => {
    const project = projects.find(p => p.name === projectName);
    if (project) {
      return `Here's some info about ${projectName}: ${project.descriptions.join(', ')}, tech stack: ${project.skills.join(', ')}`;
    } else {
      return `I don't have detailed information about ${projectName}. Could you ask about another project?`;
    }
  };

  const handleSkillDetails = (skillName: string) => {
    const skill = skills.find(s => s.name === skillName);
    if (skill) {
      return `Rishab has hands-on experience with ${skillName}, primarily using it in ${skill.projects.join(', ')}. It's been a key tool for improving project outcomes like ${skill.description}.`;
    } else {
      return `I'm not familiar with ${skillName}. Could you ask about another technology?`;
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="chatbot-message assistant">Typing...</div>}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Ask me about my experience..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;