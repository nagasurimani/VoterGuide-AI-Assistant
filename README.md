# VoterGuide AI Assistant

A extremely lightweight, modern, accessible, government-styled Streamlit application designed to educate and assist Indian voters for the upcoming April 2026 state-level elections.

## Features

- **Government-Style UI**: Implements a highly professional user interface relying entirely on CSS. Features an authentic multi-colored Indian flag banner and legitimate styling. This keeps the deployment incredibly lightweight (well under the 1MB limit) since there is no reliance on bulky local images.
- **Dynamic Civic Education**: Powered by Gemini to dynamically check voting eligibility tailored to the April 2026 election criteria. Furthermore, the AI interacts with your PIN code seamlessly to give localized hints on locating your Polling Station with direct official linkage.
- **Special Intensive Revision (SIR) 2026 Tracker**: Explicitly delineates the standard process and timeline spanning Registration -> Verification -> EPIC Generation.
- **Document Requirements Tracker**: Interactive Form 6 essentials checklist containing precise criteria around Aadhaar, Photos, and Address validation.

## Running the app locally

1. Ensure requirements are installed:
   ```bash
   pip install -r requirements.txt
   ```
2. Include your API token in the environment: Add `GEMINI_API_KEY=your_api_key_here` to `.env`.
3. Launch Streamlit:
   ```bash
   streamlit run app.py
   ```