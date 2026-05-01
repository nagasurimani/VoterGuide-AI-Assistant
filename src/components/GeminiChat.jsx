import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "dummy_key";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are the official 2026 Election Guide. Provide neutral, step-by-step assistance for Indian voters. Do NOT generate political opinions. If a user provides their age or date of birth, calculate their age as of April 1, 2026, and determine if they are eligible to vote (must be 18 or older by April 2026)."
});

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', content: "Namaste! I am your ECI Digital Assistant. How can I help you prepare for the 2026 State Elections?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      if (apiKey === "dummy_key") {
        throw new Error("Missing Key");
      }
      
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }))
      });
      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'model', content: response.text() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I cannot connect to the civic database right now. Please check if VITE_GEMINI_API_KEY is configured in your .env file." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[350px] h-[450px] bg-white border-[3px] border-navy shadow-[0_10px_40px_rgb(0,0,0,0.3)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-navy text-white p-4 flex justify-between items-center border-b-2 border-[#FF9933]">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <MessageCircle size={22} className="text-[#FF9933]" /> ECI Assistant
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-[#FF9933] transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-[4px] max-w-[85%] font-medium ${m.role === 'user' ? 'bg-[#000080] text-white self-end border border-[#000050]' : 'bg-white border border-gray-200 text-gray-800 self-start shadow-sm'} text-[15px] leading-relaxed`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="self-start text-sm text-gray-500 font-bold animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#000080] animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-[#000080] animate-bounce delay-75"></div>
              <div className="w-2 h-2 rounded-full bg-[#000080] animate-bounce delay-150"></div>
            </div>}
          </div>
          
          <div className="p-3 bg-white border-t-2 border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border-2 border-gray-200 rounded-[4px] px-3 py-2 text-[15px] focus:outline-none focus:border-[#000080] transition-colors font-medium text-gray-800"
              placeholder="Ask about Form 6/8..."
            />
            <button onClick={handleSend} className="bg-[#000080] text-white px-4 rounded-[4px] hover:bg-[#FF9933] transition-colors shadow-sm font-bold">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat"
          className="bg-[#000080] hover:scale-105 transition-transform duration-300 text-white py-3 px-5 shadow-[0_4px_15px_rgb(0,0,0,0.3)] flex items-center justify-center border-4 border-white mb-2 mr-2 gap-3"
          style={{borderRadius: '0px'}} // Blocky design per instructions
        >
          <MessageCircle size={30} />
          <span className="font-bold text-lg">ECI Assistant</span>
        </button>
      )}
    </div>
  );
}
