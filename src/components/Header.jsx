import { useVoter } from '../config/VoterContext';

export default function Header() {
  const { plainLanguage, setPlainLanguage, firstTimeVoter, setFirstTimeVoter } = useVoter();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* 5px Tricolor strip */}
      <div className="flex h-[5px] w-full">
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
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="plain-mode" 
              checked={plainLanguage}
              onChange={() => setPlainLanguage(!plainLanguage)}
              className="w-4 h-4 accent-[#000080]"
            />
            <label htmlFor="plain-mode" className="text-sm font-bold text-[#000080] cursor-pointer">
              Plain Language
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="first-time" 
              checked={firstTimeVoter}
              onChange={() => setFirstTimeVoter(!firstTimeVoter)}
              className="w-4 h-4 accent-[#000080]"
            />
            <label htmlFor="first-time" className="text-sm font-bold text-[#000080] cursor-pointer">
              First-Time Voter
            </label>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden lg:flex space-x-8">
          <a href="#" className="font-semibold text-[#000080] hover:text-[#FF9933] transition-colors duration-300">Home</a>
          <a href="#" className="font-semibold text-[#000080] hover:text-[#138808] transition-colors duration-300">Elections</a>
          <a href="#" className="font-semibold text-[#000080] hover:text-[#FF9933] transition-colors duration-300">Support</a>
        </nav>
      </div>
    </header>
  );
}
