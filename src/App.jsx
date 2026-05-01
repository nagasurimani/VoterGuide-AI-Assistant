import React, { useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ActionCards from './components/ActionCards';
import CoreServices from './components/CoreServices';
import NewsTicker from './components/NewsTicker';
import VoterJourney from './components/VoterJourney';
import GeminiChat from './components/GeminiChat';
import MythFactAccordion from './components/MythFactAccordion';

/**
 * The root Application component.
 * 
 * @component
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <div className="min-h-screen relative font-sans text-[#000080] bg-white selection:bg-[#FF9933] selection:text-white flex flex-col">
      {/* Waving Flag Pure CSS Background */}
      <div className="waving-flag-bg" role="presentation">
        <div className="flag-shape"></div>
      </div>
      
      {/* Dynamic Background Watermark */}
      <img 
        src="/images.svg" 
        alt="" 
        role="presentation"
        style={{
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1, 
          opacity: 0.02, 
          filter: 'blur(10px)',
          objectFit: 'cover'
        }} 
      />
      
      <Header />
      <NewsTicker />
      
      <main id="main-content" className="pb-10 pt-6 relative z-10 flex-grow">
        <Hero />
        <CoreServices />
        <VoterJourney />
        <MythFactAccordion />
        <ActionCards />
      </main>
      
      <Footer />
      <GeminiChat />
    </div>
  );
};

export default App;
