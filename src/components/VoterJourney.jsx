import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function VoterJourney() {
  const [voterType, setVoterType] = useState('new');
  const [birthYear, setBirthYear] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const checkEligibility = () => {
    if (!birthYear) return;
    const year = parseInt(birthYear);
    if (2026 - year >= 18) {
      setEligibilityResult({ 
        status: 'eligible', 
        msg: 'You will be 18+ by the April 2026 state elections. You are eligible to register!' 
      });
    } else {
      setEligibilityResult({ 
        status: 'ineligible', 
        msg: `You will only be ${2026 - year} years old by 2026. You must be 18 to vote.` 
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-20 relative z-10">
      <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-navy">
        
        {/* Tab selection */}
        <div className="flex border-b-2 border-gray-200 mb-8">
          <button 
            className={`flex-1 py-4 text-base md:text-lg font-bold uppercase transition-colors duration-300 ${voterType === 'new' ? 'text-navy border-b-[5px] border-saffron' : 'text-gray-500 hover:text-navy border-b-[5px] border-transparent'}`}
            onClick={() => setVoterType('new')}
          >
            New Voter (Form 6)
          </button>
          <button 
            className={`flex-1 py-4 text-base md:text-lg font-bold uppercase transition-colors duration-300 ${voterType === 'existing' ? 'text-navy border-b-[5px] border-saffron' : 'text-gray-500 hover:text-navy border-b-[5px] border-transparent'}`}
            onClick={() => setVoterType('existing')}
          >
            Existing Voter Update
          </button>
        </div>

        {voterType === 'new' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-2xl text-navy font-bold mb-4">Are you eligible for 2026?</h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input 
                type="number" 
                placeholder="Enter Birth Year (e.g. 2005)" 
                className="border-2 border-navy focus:border-saffron outline-none rounded p-3 flex-1 font-bold text-navy bg-white transition-colors"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkEligibility()}
              />
              <button 
                onClick={checkEligibility}
                className="bg-navy text-white px-8 py-3 rounded font-bold hover:bg-[#000050] transition-colors focus:ring-4 ring-navy/20"
              >
                Check
              </button>
            </div>

            {eligibilityResult && (
              <div className={`p-4 mb-8 rounded-lg flex items-start gap-3 font-semibold ${eligibilityResult.status === 'eligible' ? 'bg-green/10 text-[#0d5906] border-l-4 border-green' : 'bg-red-100 text-red-800 border-l-4 border-red-600'}`}>
                {eligibilityResult.status === 'eligible' ? <CheckCircle2 className="text-[#0d5906] shrink-0 mt-0.5" /> : <AlertCircle className="text-red-600 shrink-0 mt-0.5" />}
                <p className="text-lg">{eligibilityResult.msg}</p>
              </div>
            )}

            <h3 className="text-xl text-navy font-bold mb-4 pb-2 border-b-2 border-saffron inline-block">Mandatory Form 6 Document Checklist</h3>
            <ul className="space-y-4 mt-2 bg-gray-50 border border-gray-100 p-6 rounded-lg text-lg text-gray-800 shadow-sm">
              <li className="flex items-center gap-4">
                <input type="checkbox" className="w-6 h-6 accent-navy cursor-pointer" id="chk1" /> 
                <label htmlFor="chk1" className="cursor-pointer"><b>Aadhaar Card</b> (or alternative robust age proof)</label>
              </li>
              <li className="flex items-center gap-4">
                <input type="checkbox" className="w-6 h-6 accent-navy cursor-pointer" id="chk2" /> 
                <label htmlFor="chk2" className="cursor-pointer"><b>Address Proof</b> (Utility bill, Indian Passport, Bank Passbook)</label>
              </li>
              <li className="flex items-center gap-4">
                <input type="checkbox" className="w-6 h-6 accent-navy cursor-pointer" id="chk3" /> 
                <label htmlFor="chk3" className="cursor-pointer"><b>Passport Size Photo</b> (Recent, White background)</label>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-2xl text-navy font-bold mb-4">Update your Roll Information</h3>
            <p className="text-lg text-gray-700 mb-8 font-medium max-w-2xl mx-auto">
              Have you moved? Does your name have a spelling error? It is critical to fix these before the 2026 Special Intensive Revision closes.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="border-[3px] border-[#FF9933]/50 p-6 rounded-xl hover:bg-[#FF9933]/5 transition-colors cursor-pointer group">
                <p className="font-bold text-saffron text-2xl mb-2 group-hover:text-[#e68a2e] transition-colors">Form 8</p>
                <p className="text-gray-700 font-medium leading-relaxed">Correction of Entries, Shifting of Residence within/outside Constituency.</p>
              </div>
              <div className="border-[3px] border-[#138808]/50 p-6 rounded-xl hover:bg-[#138808]/5 transition-colors cursor-pointer group">
                <p className="font-bold text-green text-2xl mb-2 group-hover:text-[#0d5906] transition-colors">Form 6B</p>
                <p className="text-gray-700 font-medium leading-relaxed">Letter of Information of Aadhaar number for electoral roll authentication.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
