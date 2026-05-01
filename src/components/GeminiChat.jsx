import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useVoter } from '../config/VoterContext';
import ChatSection from './ChatSection';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "dummy_key";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are the Senior Election Officer. Your tone is extremely helpful, formal, and authoritative. You guide citizens through the electoral process in India. Use professional language and avoid political bias."
});

/**
 * A floating AI assistant component that uses Gemini API.
 * 
 * @component
 * @returns {JSX.Element}
 */
const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeOnboarding } = useVoter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const greeting = activeOnboarding 
      ? `I see you are looking at the ${activeOnboarding} section. Do you need help with this step?`
      : "Namaste! I am your Senior Election Officer. How can I assist you with your electoral queries today?";
    
    setMessages([{ role: 'model', content: greeting }]);
  }, [activeOnboarding]);

  /**
   * Sanitizes user input to prevent basic injection and trims whitespace.
   * @param {string} text - Raw user input
   * @returns {string} Sanitized text
   */
  const sanitizeInput = (text) => {
    return text.trim().replace(/[<>]/g, ""); // Basic tag removal
  };

  const handleSend = useCallback(async () => {
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: sanitizedInput }]);
    setLoading(true);

    try {
      if (apiKey === "dummy_key") throw new Error("Missing Key");
      const chat = model.startChat({
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
      });
      const result = await chat.sendMessage(sanitizedInput);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'model', content: response.text() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I am unable to connect to the server. Please ensure your API key is configured." }]);
    }
    setLoading(false);
  }, [input, messages]);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <ChatSection 
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          loading={loading}
          onClose={handleToggle}
        />
      ) : (
        <button 
          onClick={handleToggle}
          aria-label="Open Election Assistant Chat"
          className="bg-[#000080] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white"
        >
          <MessageSquare size={24} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default React.memo(GeminiChat);
