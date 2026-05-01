import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * A component that renders an interactive checklist for voter steps.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.items - List of checklist items
 * @param {Array} props.completed - Array of completed item IDs
 * @param {function} props.onToggle - Handler called when an item is toggled
 * @param {number|null} props.expandedId - ID of the currently expanded item
 * @param {function} props.onExpand - Handler called when an item is expanded/collapsed
 * @param {boolean} [props.showOnboardingHint] - Whether to show special hints for new voters
 * @returns {JSX.Element}
 */
const Checklist = ({ 
  items, 
  completed, 
  onToggle, 
  expandedId, 
  onExpand, 
  showOnboardingHint 
}) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <section 
          key={item.id}
          className={`border-2 rounded-2xl transition-all duration-300 ${
            completed.includes(item.id) ? 'border-green-100 bg-green-50/30' : 'border-gray-100 bg-white shadow-sm'
          }`}
          aria-labelledby={`item-title-${item.id}`}
        >
          <div 
            className="p-5 flex items-center justify-between cursor-pointer"
            onClick={() => onExpand(expandedId === item.id ? null : item.id)}
            role="button"
            aria-expanded={expandedId === item.id}
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(item.id);
                }}
                aria-label={`Mark ${item.title} as ${completed.includes(item.id) ? 'incomplete' : 'complete'}`}
                className="transition-transform active:scale-90"
              >
                {completed.includes(item.id) ? (
                  <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="text-green-600" size={28} />
                  </motion.div>
                ) : (
                  <Circle className="text-gray-300 hover:text-[#000080]" size={28} />
                )}
              </button>
              <span 
                id={`item-title-${item.id}`}
                className={`text-xl font-bold ${completed.includes(item.id) ? 'text-gray-400 line-through' : 'text-[#000080]'}`}
              >
                {item.title}
              </span>
            </div>
            {expandedId === item.id ? <ChevronUp size={20} aria-hidden="true" /> : <ChevronDown size={20} aria-hidden="true" />}
          </div>

          <AnimatePresence>
            {expandedId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-14 pb-6">
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {item.detail}
                  </p>
                  {showOnboardingHint && item.id === 1 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm font-bold text-blue-700">
                      💡 Tip: You can apply online at voters.eci.gov.in or use the Voter Helpline App.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      ))}
    </div>
  );
};

export default React.memo(Checklist);
