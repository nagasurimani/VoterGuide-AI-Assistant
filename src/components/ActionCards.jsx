import React, { useCallback } from 'react';

/**
 * A section containing cards for primary voter actions.
 * 
 * @component
 * @returns {JSX.Element}
 */
const ActionCards = () => {
  const handleOpenChat = useCallback(() => {
    const chatBtn = document.querySelector('[aria-label="Open Election Assistant Chat"]');
    if (chatBtn) chatBtn.click();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 mb-12 relative z-10 -mt-8" aria-label="Quick Actions">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#FF9933] hover:shadow-xl transition-shadow flex flex-col h-full">
          <h3 className="text-xl font-bold text-[#000080] mb-3">New Registration</h3>
          <p className="text-gray-600 mb-6 flex-grow">Register as a new voter using Form 6 if you are 18+ or will turn 18 soon.</p>
          <button 
            aria-label="Apply for new voter registration"
            className="w-full bg-[#000080] hover:bg-[#000050] text-white py-2 px-4 rounded font-semibold transition-colors duration-200 mt-auto"
            onClick={() => alert('Please use the Start Form 6 button in the Eligibility section.')}
          >
            Apply Now
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#138808] hover:shadow-xl transition-shadow flex flex-col h-full">
          <h3 className="text-xl font-bold text-[#000080] mb-3">Check Status</h3>
          <p className="text-gray-600 mb-6 flex-grow">Track your application status or check if your name is on the electoral roll.</p>
          <button 
            aria-label="Track your voter application status"
            className="w-full bg-[#000080] hover:bg-[#000050] text-white py-2 px-4 rounded font-semibold transition-colors duration-200 mt-auto"
            onClick={() => alert('Checking Voter ID Status...')}
          >
            Track Application
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#000080] hover:shadow-xl transition-shadow flex flex-col h-full">
          <h3 className="text-xl font-bold text-[#000080] mb-3">AI Helpdesk</h3>
          <p className="text-gray-600 mb-6 flex-grow">Have questions about the 2026 revision? Chat with our AI assistant instantly.</p>
          <button 
            aria-label="Open AI chat assistant"
            className="w-full bg-[#000080] hover:bg-[#000050] text-white py-2 px-4 rounded font-semibold transition-colors duration-200 mt-auto"
            onClick={handleOpenChat}
          >
            Chat Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ActionCards);
