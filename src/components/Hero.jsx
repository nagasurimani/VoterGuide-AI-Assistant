import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Calendar, Vote, MapPin } from 'lucide-react';
import { useVoter } from '../config/VoterContext';

const onboardingOptions = [
  { id: 'how', label: 'How elections work', icon: <Compass size={18} />, content: 'Elections in India are conducted by the ECI using Electronic Voting Machines (EVMs) with VVPAT for transparency.' },
  { id: 'dates', label: 'Important dates', icon: <Calendar size={18} />, content: 'The next major state elections are scheduled for 2026. Keep an eye on local announcements for specific dates.' },
  { id: 'vote', label: 'How to vote', icon: <Vote size={18} />, content: 'To vote, find your name in the voter list, go to your booth with an ID, and press the button on the EVM.' },
  { id: 'local', label: 'My local info', icon: <MapPin size={18} />, content: 'Use your EPIC number to find your specific constituency and polling station details on the NVSP portal.' },
];

export default function Hero() {
  const { activeOnboarding, setActiveOnboarding } = useVoter();

  return (
    <section className="text-[#000080] py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black mb-10 tracking-tight"
        >
          What would you like help with today?
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {onboardingOptions.map((opt) => (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.05, backgroundColor: '#000080', color: '#FFFFFF' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveOnboarding(opt.id === activeOnboarding ? null : opt.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#000080] font-bold transition-colors ${
                activeOnboarding === opt.id ? 'bg-[#000080] text-white' : 'bg-transparent text-[#000080]'
              }`}
            >
              {opt.icon} {opt.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeOnboarding && (
            <motion.div
              key={activeOnboarding}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-blue-50 p-8 rounded-2xl border border-blue-100 max-w-2xl mx-auto"
            >
              <p className="text-xl font-medium leading-relaxed">
                {onboardingOptions.find(o => o.id === activeOnboarding)?.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
