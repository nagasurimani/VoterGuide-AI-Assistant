import Header from './components/Header';
import Hero from './components/Hero';
import VoterJourney from './components/VoterJourney';
import GeminiChat from './components/GeminiChat';

function App() {
  return (
    <div className="min-h-screen relative font-sans text-gray-900 bg-[#f8f9fa] selection:bg-saffron selection:text-white">
      {/* Waving Flag Pure CSS Background */}
      <div className="waving-flag-bg">
        <div className="flag-shape"></div>
      </div>
      
      <Header />
      <main className="pb-10 pt-6 relative z-10">
        <Hero />
        <VoterJourney />
      </main>
      
      <GeminiChat />
    </div>
  );
}

export default App;
