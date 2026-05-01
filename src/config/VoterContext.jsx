import { createContext, useContext, useState } from 'react';

const VoterContext = createContext();

export function VoterProvider({ children }) {
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [firstTimeVoter, setFirstTimeVoter] = useState(false);
  const [activeOnboarding, setActiveOnboarding] = useState(null);

  const translate = (complex, simple) => (plainLanguage ? simple : complex);

  return (
    <VoterContext.Provider value={{ 
      plainLanguage, setPlainLanguage, 
      firstTimeVoter, setFirstTimeVoter,
      activeOnboarding, setActiveOnboarding,
      translate 
    }}>
      {children}
    </VoterContext.Provider>
  );
}

export const useVoter = () => useContext(VoterContext);
