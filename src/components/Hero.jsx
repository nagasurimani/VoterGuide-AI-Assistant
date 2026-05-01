import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, CheckCircle, AlertTriangle, Calendar, ArrowRight } from 'lucide-react';
import Form6Modal from './Form6Modal';

/**
 * The Hero component featuring the eligibility check and registration entry.
 * 
 * @component
 * @returns {JSX.Element}
 */
const Hero = () => {
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Checks if the user is 18+ by the next election date.
   * Logic: Must be 18 by April 1st, 2026.
   */
  const handleCheckEligibility = useCallback(() => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const electionDate = new Date('2026-04-01');
    
    let age = electionDate.getFullYear() - birthDate.getFullYear();
    const m = electionDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && electionDate.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setStatus(age >= 18 ? 'eligible' : 'ineligible');
  }, [dob]);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  return (
    <section className="py-16 px-6 text-center bg-white" aria-label="Welcome and Eligibility">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-widest text-[#000080]"
        >
          National Voter Services
        </motion.h1>
        
        <p className="text-xl text-gray-600 mb-12 font-medium">
          Secure your voice in the next major elections. Check your eligibility and register today.
        </p>

        {/* Eligibility Tool */}
        <div className="max-w-xl mx-auto bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-[#000080] mb-6">Am I Eligible to Vote?</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="date" 
                value={dob}
                onChange={(e) => { setDob(e.target.value); setStatus(null); }}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#000080] focus:outline-none font-bold text-[#000080]"
                aria-label="Enter your date of birth"
              />
            </div>
            <button 
              onClick={handleCheckEligibility}
              className="bg-[#000080] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#000060] transition-colors shadow-lg active:scale-95"
            >
              Verify
            </button>
          </div>

          <AnimatePresence mode="wait">
            {status === 'eligible' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <div className="bg-green-50 text-green-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-green-100 w-full justify-center">
                  <CheckCircle size={20} /> You are eligible to vote!
                </div>
                <button 
                  onClick={toggleModal}
                  className="flex items-center gap-2 bg-[#FF9933] text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#e68a2e] transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  <UserPlus size={24} /> START FORM 6 <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
            {status === 'ineligible' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-red-50 text-red-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-red-100 w-full justify-center"
              >
                <AlertTriangle size={20} /> You are not of voting age for 2026.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generic New Registration Button */}
        {!status && (
          <button 
            onClick={toggleModal}
            className="inline-flex items-center gap-2 bg-[#000080] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#000060] transition-transform hover:scale-105"
          >
            <UserPlus size={20} /> New Registration (Form 6)
          </button>
        )}
      </div>

      <Form6Modal isOpen={isModalOpen} onClose={toggleModal} />
    </section>
  );
};

export default React.memo(Hero);
