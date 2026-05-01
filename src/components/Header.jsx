export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* 5px Tricolor strip */}
      <div className="flex h-[5px] w-full">
        <div className="w-1/3 bg-[#FF9933] h-full"></div>
        <div className="w-1/3 bg-white h-full"></div>
        <div className="w-1/3 bg-[#138808] h-full"></div>
      </div>
      
      {/* Logos and Navigation */}
      <div className="bg-[#FFFFFF] py-3 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="/ECINet-logo.svg" alt="ECI Logo" className="h-[55px] object-contain" />
          <span className="text-[#000080] font-bold text-2xl font-serif hidden lg:block">Election Commission of India</span>
        </div>
        
        {/* Navigation Bar styled with theme colors */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="font-semibold text-[#000080] hover:text-[#FF9933] transition-colors duration-300">Home</a>
          <a href="#" className="font-semibold text-[#000080] hover:text-[#138808] transition-colors duration-300">About 2026 Revision</a>
          <a href="#" className="font-semibold text-[#000080] hover:text-[#FF9933] transition-colors duration-300">Contact Us</a>
        </nav>
      </div>
    </header>
  );
}
