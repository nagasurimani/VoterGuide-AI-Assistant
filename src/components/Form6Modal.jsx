import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Upload, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

/**
 * A multi-step modal for the Form 6 voter registration application.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {function} props.onClose - Handler called to close the modal
 * @returns {JSX.Element|null}
 */
const Form6Modal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, totalSteps + 1)), []);
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => setStep(1), 300); // Reset after animation
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
          <motion.div 
            className="h-full bg-[#000080]" 
            initial={{ width: '0%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <header className="p-6 flex justify-between items-center border-b border-gray-50 mt-1">
          <div>
            <h2 className="text-2xl font-black text-[#000080] tracking-tight">Form 6 - Application</h2>
            <p className="text-sm text-gray-500 font-bold uppercase">Step {Math.min(step, totalSteps)} of {totalSteps}</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#000080]"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </header>

        <div className="p-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#000080]">
                    <User size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#000080] outline-none font-medium" />
                  <input type="text" placeholder="Last Name" className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#000080] outline-none font-medium" />
                  <input type="email" placeholder="Email Address" className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#000080] outline-none font-medium md:col-span-2" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#000080]">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Residential Address</h3>
                </div>
                <textarea placeholder="Full Address" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-[#000080] outline-none font-medium h-32" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="State" className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#000080] outline-none font-medium" />
                  <input type="text" placeholder="PIN Code" className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#000080] outline-none font-medium" />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#000080]">
                    <Upload size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Document Upload</h3>
                </div>
                <div className="border-4 border-dashed border-gray-100 rounded-3xl p-10 text-center space-y-4 hover:border-[#000080]/30 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Upload size={32} />
                  </div>
                  <p className="text-gray-500 font-bold">Click or drag files to upload age & address proof</p>
                  <p className="text-xs text-gray-400 font-medium">Supported formats: PDF, JPG, PNG (Max 2MB)</p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-black text-[#000080]">Application Submitted</h3>
                <p className="text-gray-500 font-medium max-w-sm mx-auto">
                  Your mock Form 6 application has been received. In a real system, you would receive a tracking ID via SMS.
                </p>
                <button 
                  onClick={handleClose}
                  className="bg-[#000080] text-white px-10 py-4 rounded-2xl font-black shadow-xl"
                >
                  FINISH
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step <= 3 && (
          <footer className="p-6 bg-gray-50 flex justify-between items-center">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 font-bold text-[#000080] disabled:opacity-30 px-4 py-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 bg-[#000080] text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#000060] transition-all"
            >
              {step === totalSteps ? 'Submit Application' : 'Next Step'} <ArrowRight size={18} />
            </button>
          </footer>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(Form6Modal);
