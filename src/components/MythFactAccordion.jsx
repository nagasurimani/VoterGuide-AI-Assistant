import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const myths = [
  {
    myth: "My vote doesn't matter.",
    fact: "Local elections are often decided by fewer than 100 votes. Your individual vote is a critical part of the democratic process."
  },
  {
    myth: "I need my physical Voter ID card to vote.",
    fact: "If your name is on the electoral roll, you can vote using any of the 12 approved photo IDs, such as Aadhaar, PAN card, or Passport."
  },
  {
    myth: "I can't vote if I've moved to a new city.",
    fact: "You just need to submit Form 6 to transfer your registration to your new place of residence. You can do this online!"
  }
];

/**
 * An accordion component that displays common electoral myths and their factual corrections.
 * 
 * @component
 * @returns {JSX.Element}
 */
const MythFactAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-6 mb-24 font-sans" aria-labelledby="myth-fact-heading">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="text-[#000080]" size={32} aria-hidden="true" />
        <h2 id="myth-fact-heading" className="text-3xl font-black text-[#000080] uppercase tracking-tight">
          Myth vs. Fact
        </h2>
      </div>

      <div className="space-y-3">
        {myths.map((item, index) => (
          <div key={index} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`fact-content-${index}`}
              className="w-full p-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-red-600 font-bold">❌ Myth: <span className="text-gray-800">{item.myth}</span></span>
              <ChevronDown 
                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                size={20} 
                aria-hidden="true"
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`fact-content-${index}`}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden bg-green-50"
                  role="region"
                >
                  <div className="p-5 border-t border-green-100">
                    <p className="text-green-800 font-bold">
                      ✅ Fact: <span className="font-medium text-gray-700">{item.fact}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(MythFactAccordion);
