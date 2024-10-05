import React from 'react';
import { useChat, Message } from 'ai/react';

export default function ChatbotSection() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    initialMessages: [{ id: '1', role: 'assistant', content: "Hi there! I'm Rishab's personal chatbot. How can I help you today?" }],
    keepLastMessageOnError: true,
    onFinish: (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
    },
    onError: error => {
      console.error('An error occurred:', error);
    },
    onResponse: response => {
      console.log('Received HTTP response from server:', response);
    },
  });

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg p-4">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message: Message) => (
          <div key={message.id} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-grow mr-2 p-2 border rounded"
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isLoading}>
          Send
        </button>
        {isLoading && (
          <button onClick={stop} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
            Stop
          </button>
        )}
      </form>
    </div>
  );
}