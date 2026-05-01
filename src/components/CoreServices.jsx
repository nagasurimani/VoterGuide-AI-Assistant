import { Search, UserPlus, MapPin, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoreServices() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 mb-12 relative z-10 -mt-8">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item} className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#FF9933] flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <Search className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Search Electoral Roll</h3>
        </motion.div>
        
        <motion.div variants={item} className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#138808] flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <UserPlus className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Register to Vote</h3>
        </motion.div>
        
        <motion.div variants={item} className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#FF9933] flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <MapPin className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Track Status</h3>
        </motion.div>
        
        <motion.div variants={item} className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#138808] flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <Download className="text-[#000080] mb-4" size={40} />
          <h3 className="font-bold text-[#000080]">Download e-EPIC</h3>
        </motion.div>
      </motion.div>
    </section>
  );
}
