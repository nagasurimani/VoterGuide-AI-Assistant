import { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useVoter } from '../config/VoterContext';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "dummy_key";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are the Senior Election Officer. Your tone is extremely helpful, formal, and authoritative. You guide citizens through the electoral process in India. Use professional language and avoid political bias."
});

export default function GeminiChat() {
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

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      if (apiKey === "dummy_key") throw new Error("Missing Key");
      const chat = model.startChat({
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
      });
      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'model', content: response.text() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I am unable to connect to the server. Please ensure your API key is configured." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[320px] h-[400px] bg-white border border-gray-200 shadow-2xl flex flex-col rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-[#000080] text-white p-4 flex justify-between items-center">
            <span className="font-bold text-sm tracking-widest uppercase">Election Assistant</span>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#000080] text-white self-end ml-8' : 'bg-white text-gray-800 border border-gray-100 self-start mr-8 shadow-sm'}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400 font-bold animate-pulse">Officer is typing...</div>}
          </div>
          
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#000080]"
              placeholder="Type your query..."
            />
            <button onClick={handleSend} className="bg-[#000080] text-white p-2 rounded-full hover:scale-105 transition-transform">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#000080] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
