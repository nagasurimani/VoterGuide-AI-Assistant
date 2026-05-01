import { Search, UserPlus, MapPin, Download } from 'lucide-react';

export default function CoreServices() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-12 relative z-10 -mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#FF9933] flex flex-col items-center text-center hover:shadow-xl transition-shadow cursor-pointer">
          <Search className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Search Electoral Roll</h3>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#138808] flex flex-col items-center text-center hover:shadow-xl transition-shadow cursor-pointer">
          <UserPlus className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Register to Vote</h3>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#FF9933] flex flex-col items-center text-center hover:shadow-xl transition-shadow cursor-pointer">
          <MapPin className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Track Status</h3>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#138808] flex flex-col items-center text-center hover:shadow-xl transition-shadow cursor-pointer">
          <Download className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Download e-EPIC</h3>
        </div>
      </div>
    </section>
  );
}
