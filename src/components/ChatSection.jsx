import React from 'react';
import { Send, X } from 'lucide-react';

/**
 * A component that renders the chat interface for the AI assistant.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.messages - List of chat messages
 * @param {string} props.input - Current text in the input field
 * @param {function} props.onInputChange - Handler for input field changes
 * @param {function} props.onSend - Handler called when the send button is clicked
 * @param {boolean} props.loading - Whether the AI is currently generating a response
 * @param {function} props.onClose - Handler called to close the chat window
 * @returns {JSX.Element}
 */
const ChatSection = ({ 
  messages, 
  input, 
  onInputChange, 
  onSend, 
  loading, 
  onClose 
}) => {
  return (
    <section 
      className="w-[320px] h-[400px] bg-white border border-gray-200 shadow-2xl flex flex-col rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5"
      aria-label="Election Assistant Chat"
    >
      <header className="bg-[#000080] text-white p-4 flex justify-between items-center">
        <span className="font-bold text-sm tracking-widest uppercase">Sahayak</span>
        <button 
          onClick={onClose}
          aria-label="Close Chat"
          className="hover:bg-white/10 p-1 rounded-full transition-colors"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>
      
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-xl text-sm ${
              m.role === 'user' 
                ? 'bg-[#000080] text-white self-end ml-8' 
                : 'bg-white text-gray-800 border border-gray-100 self-start mr-8 shadow-sm'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-gray-400 font-bold animate-pulse">
            Officer is typing...
          </div>
        )}
      </div>
      
      <footer className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#000080]"
          placeholder="Type your query..."
          aria-label="Chat input"
        />
        <button 
          onClick={onSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="bg-[#000080] text-white p-2 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
};

export default React.memo(ChatSection);
