import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-navy text-white py-16 px-6 shadow-xl mb-12 text-center border-b-[6px] border-saffron">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-widest text-[#FF9933] drop-shadow-sm">
          National Voter Services Portal
        </h2>
        <h3 className="text-xl md:text-2xl font-bold mb-10 opacity-90 text-white">
          2026 Revision Phase Active
        </h3>
        
        <div className="max-w-2xl mx-auto bg-white rounded-md flex items-center p-2 shadow-2xl border-2 border-transparent focus-within:border-saffron transition-colors">
          <input 
            type="text" 
            placeholder="Search Polling Stations by PIN code..." 
            className="flex-1 px-4 py-2 text-navy text-lg focus:outline-none placeholder-gray-500 font-semibold bg-transparent"
          />
          <button className="bg-navy hover:bg-[#000050] text-white p-3 rounded transition-colors duration-200" aria-label="Search">
            <Search size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
