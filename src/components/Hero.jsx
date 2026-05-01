import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Hero() {
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState(null);

  const checkEligibility = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const ELECTION_DATE = new Date('2026-04-01');
    
    let age = ELECTION_DATE.getFullYear() - birthDate.getFullYear();
    const m = ELECTION_DATE.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && ELECTION_DATE.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setStatus(age >= 18 ? 'eligible' : 'ineligible');
  };

  return (
    <section className="bg-[#000080] text-white py-16 px-6 shadow-xl mb-12 text-center border-b-[6px] border-[#FF9933] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest text-[#FF9933] drop-shadow-sm"
        >
          National Voter Services Portal
        </motion.h2>
        
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl font-bold mb-10 opacity-90 text-white"
        >
          2026 Revision Phase Active
        </motion.h3>

        {/* 2026 Eligibility Tool */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-lg p-6 flex flex-col shadow-2xl relative"
        >
          <h4 className="text-[#000080] font-bold text-xl mb-4">Check Your 2026 Eligibility</h4>
          <p className="text-gray-600 mb-4 text-sm font-medium">To vote in the upcoming April 2026 State Elections, you must be 18+ by April 1, 2026.</p>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Calendar className="absolute left-3 top-3 text-[#000080]" size={20} />
              <input 
                type="date" 
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setStatus(null);
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-[#FF9933] text-gray-800 font-semibold rounded outline-none transition-colors"
              />
            </div>
            
            <button 
              onClick={checkEligibility}
              className="w-full md:w-auto bg-[#000080] hover:bg-[#FF9933] text-white px-8 py-3 rounded font-bold transition-colors duration-300 shadow-md"
            >
              Verify Now
            </button>
          </div>

          {/* Feedback Animation */}
          <div className="h-16 mt-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'eligible' && (
                <motion.div 
                  key="eligible"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  className="bg-green-100 text-[#138808] border-2 border-[#138808] px-4 py-2 rounded font-bold flex items-center gap-2"
                >
                  <CheckCircle size={20} /> Congratulations! You are eligible to vote.
                </motion.div>
              )}
              {status === 'ineligible' && (
                <motion.div 
                  key="ineligible"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  className="bg-red-50 text-red-600 border-2 border-red-500 px-4 py-2 rounded font-bold flex items-center gap-2"
                >
                  <AlertTriangle size={20} /> You will not be 18 by April 1, 2026.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
