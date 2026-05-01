export default function Footer() {
  return (
    <footer className="bg-[#000080] text-white mt-auto border-t border-gray-200">
      {/* Tricolor Bar */}
      <div className="flex h-[5px] w-full">
        <div className="w-1/3 bg-[#FF9933] h-full"></div>
        <div className="w-1/3 bg-white h-full"></div>
        <div className="w-1/3 bg-[#138808] h-full"></div>
      </div>
      
      <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm border-b border-[#000050] pb-6">
        <div className="mb-4 md:mb-0 flex items-center space-x-3">
          <span className="font-bold text-lg">ECI Copyright © 2026</span>
        </div>
        
        <div className="text-center md:text-right text-gray-300">
          <p className="text-base">Helpdesk Number: <span className="font-bold text-white">1950</span> | Follow us on Social Media</p>
        </div>
      </div>

      <div className="py-3 text-center text-xs text-gray-400 bg-[#000050]">
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <span className="mx-4">|</span>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
      </div>
    </footer>
  );
}
