import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { useVoter } from '../config/VoterContext';

const checklistItems = [
  { id: 1, title: 'Register to vote', detail: 'Submit Form 6 on the NVSP portal. You will need age and address proof.' },
  { id: 2, title: 'Check eligibility', detail: 'Ensure you are 18+ by the qualifying date of the upcoming election.' },
  { id: 3, title: 'Find polling place', detail: 'Use the Voter Helpline App or NVSP to locate your designated booth.' },
  { id: 4, title: 'Bring required ID', detail: 'Carry your EPIC card or any of the 12 alternative photo IDs approved by ECI.' },
  { id: 5, title: 'Cast ballot', detail: 'Visit the booth between 7 AM and 6 PM, verify your identity, and vote.' },
];

export default function VoterJourney() {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(1);
  const { firstTimeVoter } = useVoter();

  const toggleComplete = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(i => i !== id));
    } else {
      setCompleted([...completed, id]);
      if (id < checklistItems.length) {
        setExpanded(id + 1);
      }
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 mb-24 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-[#000080] uppercase tracking-tight">
          Voter Checklist
        </h2>
        {firstTimeVoter && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            FIRST-TIME VOTER GUIDE ACTIVE
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        {checklistItems.map((item) => (
          <div 
            key={item.id}
            className={`border-2 rounded-2xl transition-all duration-300 ${
              completed.includes(item.id) ? 'border-green-100 bg-green-50/30' : 'border-gray-100 bg-white shadow-sm'
            }`}
          >
            <div 
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(item.id);
                  }}
                  className="transition-transform active:scale-90"
                >
                  {completed.includes(item.id) ? (
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="text-green-600" size={28} />
                    </motion.div>
                  ) : (
                    <Circle className="text-gray-300 hover:text-[#000080]" size={28} />
                  )}
                </button>
                <span className={`text-xl font-bold ${completed.includes(item.id) ? 'text-gray-400 line-through' : 'text-[#000080]'}`}>
                  {item.title}
                </span>
              </div>
              {expanded === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            <AnimatePresence>
              {expanded === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-14 pb-6">
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {item.detail}
                    </p>
                    {firstTimeVoter && item.id === 1 && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm font-bold text-blue-700">
                        💡 Tip: You can apply online at voters.eci.gov.in or use the Voter Helpline App.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
