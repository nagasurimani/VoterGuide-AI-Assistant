import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserCheck, Shield, Vote, X } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Enrollment (Form 6)",
    icon: <UserPlus size={30} />,
    color: "#FF9933",
    description: "Submit Form 6 to register as a new voter. Required documents include age proof and address proof. Apply online via NVSP portal."
  },
  {
    id: 2,
    title: "Verification (BLO)",
    icon: <UserCheck size={30} />,
    color: "#000080",
    description: "A Booth Level Officer (BLO) will verifying your details at your residence. Ensure your documents match the submitted information."
  },
  {
    id: 3,
    title: "Digital ID (e-EPIC)",
    icon: <Shield size={30} />,
    color: "#138808",
    description: "Once verified, you will be issued an EPIC number. You can download your electronic Electoral Photo Identity Card (e-EPIC)."
  },
  {
    id: 4,
    title: "Polling Day",
    icon: <Vote size={30} />,
    color: "#000080",
    description: "Find your polling station using your EPIC. Carry your original Voter ID or verified alternative ID to cast your vote."
  }
];

export default function VoterJourney() {
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <section className="max-w-3xl mx-auto px-6 mb-20 relative z-10 font-sans">
      <h2 className="text-3xl font-extrabold text-[#000080] mb-8 text-center uppercase tracking-wider relative inline-block left-1/2 -translate-x-1/2">
        Election Roadmap
        <div className="absolute -bottom-2 left-0 w-full h-[4px] bg-[#FF9933]"></div>
      </h2>
      
      <div className="relative border-l-4 border-gray-300 ml-6 md:ml-10">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, type: 'spring' }}
            className="mb-10 ml-8 relative cursor-pointer group"
            onClick={() => setSelectedStep(step)}
          >
            {/* Step Circle */}
            <div 
              className="absolute -left-[54px] bg-white border-4 rounded-full p-2 flex items-center justify-center transition-transform group-hover:scale-110 shadow-md"
              style={{ borderColor: step.color }}
            >
              <div style={{ color: step.color }}>{step.icon}</div>
            </div>
            
            {/* Step Card */}
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 hover:shadow-xl transition-all duration-300 transform group-hover:translate-x-2" style={{ borderLeftColor: step.color }}>
              <h3 className="text-xl font-bold" style={{ color: step.color }}>Step {step.id}: {step.title}</h3>
              <p className="text-gray-500 mt-1 font-medium">Click for details <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden border-t-8"
              style={{ borderTopColor: selectedStep.color }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div style={{ color: selectedStep.color }}>{selectedStep.icon}</div>
                    <h3 className="text-2xl font-bold" style={{ color: selectedStep.color }}>{selectedStep.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedStep(null)}
                    className="text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 p-2 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {selectedStep.description}
                </p>
                
                <div className="mt-8 pt-4 border-t text-right">
                  <button 
                    onClick={() => setSelectedStep(null)}
                    className="bg-[#000080] hover:bg-[#FF9933] text-white px-6 py-2 rounded font-bold transition-colors shadow-md"
                  >
                    Understood
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
