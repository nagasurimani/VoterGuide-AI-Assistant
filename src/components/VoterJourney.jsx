import React, { useState, useCallback } from 'react';
import { useVoter } from '../config/VoterContext';
import Checklist from './Checklist';

const checklistItems = [
  { id: 1, title: 'Register to vote', detail: 'Submit Form 6 on the NVSP portal. You will need age and address proof.' },
  { id: 2, title: 'Check eligibility', detail: 'Ensure you are 18+ by the qualifying date of the upcoming election.' },
  { id: 3, title: 'Find polling place', detail: 'Use the Voter Helpline App or NVSP to locate your designated booth.' },
  { id: 4, title: 'Bring required ID', detail: 'Carry your EPIC card or any of the 12 alternative photo IDs approved by ECI.' },
  { id: 5, title: 'Cast ballot', detail: 'Visit the booth between 7 AM and 6 PM, verify your identity, and vote.' },
];

/**
 * A container component for the voter checklist section.
 * 
 * @component
 * @returns {JSX.Element}
 */
const VoterJourney = () => {
  const [completed, setCompleted] = useState([]);
  const [expandedId, setExpandedId] = useState(1);
  const { firstTimeVoter } = useVoter();

  const handleToggle = useCallback((id) => {
    setCompleted(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        if (id < checklistItems.length) {
          setExpandedId(id + 1);
        }
        return [...prev, id];
      }
    });
  }, []);

  const handleExpand = useCallback((id) => {
    setExpandedId(id);
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-6 mb-24 font-sans" aria-labelledby="checklist-heading">
      <div className="flex items-center justify-between mb-8">
        <h2 id="checklist-heading" className="text-3xl font-black text-[#000080] uppercase tracking-tight">
          Voter Checklist
        </h2>
        {firstTimeVoter && (
          <span 
            className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse"
            role="status"
          >
            FIRST-TIME VOTER GUIDE ACTIVE
          </span>
        )}
      </div>
      
      <Checklist 
        items={checklistItems}
        completed={completed}
        onToggle={handleToggle}
        expandedId={expandedId}
        onExpand={handleExpand}
        showOnboardingHint={firstTimeVoter}
      />
    </section>
  );
};

export default React.memo(VoterJourney);
