import React from 'react';
import { useVoter } from '../config/VoterContext';
import ToggleSwitch from './ToggleSwitch';

/**
 * The application header containing branding, toggles, and navigation.
 * 
 * @component
 * @returns {JSX.Element}
 */
const Header = () => {
  const { plainLanguage, setPlainLanguage, firstTimeVoter, setFirstTimeVoter } = useVoter();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200" aria-label="Main Header">
      {/* 5px Tricolor strip */}
      <div className="flex h-[5px] w-full" role="presentation">
        <div className="w-1/3 bg-[#FF9933] h-full"></div>
        <div className="w-1/3 bg-white h-full"></div>
        <div className="w-1/3 bg-[#138808] h-full"></div>
      </div>

      {/* Navigation */}
      <div className="bg-white py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-[#000080] font-black text-xl md:text-2xl tracking-tighter">VOTER GUIDE AI</span>
        </div>

        {/* Smart Toggles */}
        <div className="flex items-center space-x-6">
          <ToggleSwitch 
            id="plain-mode"
            label="Plain Language"
            checked={plainLanguage}
            onChange={() => setPlainLanguage(!plainLanguage)}
          />
          <ToggleSwitch 
            id="first-time"
            label="First-Time Voter"
            checked={firstTimeVoter}
            onChange={() => setFirstTimeVoter(!firstTimeVoter)}
          />
        </div>

        {/* Navigation Bar */}
        <nav className="hidden lg:flex space-x-8" aria-label="Main Navigation">
          <a href="#" className="font-semibold text-[#000080] hover:text-[#FF9933] transition-colors duration-300">Home</a>
          <a href="#" className="font-semibold text-[#000080] hover:text-[#138808] transition-colors duration-300">Elections</a>
          <a href="#" className="font-semibold text-[#000080] hover:text-[#FF9933] transition-colors duration-300">Support</a>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);
