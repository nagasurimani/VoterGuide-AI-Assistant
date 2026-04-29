# VoterGuide AI Assistant - 2026 Revision

A modern, highly optimized React + Vite web application built to guide Indian citizens through the 2026 Special Intensive Revision process.

## Architecture

- **Frontend:** React, TailwindCSS, Vite
- **AI Engine:** Google Gemini 1.5 Flash (Civic AI Chatbot)
- **Backend/Config:** Firebase Setup included

## Features

- **High-Fidelity Official Styling:** Uses Indian Government tricolor components natively in CSS.
- **Zero Local Images Constraint:** All complex graphics (like the waving background flag) are rendered programmatically via CSS SVGs to ensure the repository remains well under 1MB. Official ECI logos are fetched via CDN.
- **Form 6 Document Verification:** Built-in interactive checklists and birth year calculations to guarantee April 2026 Voter Registration eligibility.

## Setup

1. `npm install`
2. Create a `.env` file referencing `.env.template`.
3. Fill in your `VITE_GEMINI_API_KEY` and Firebase credentials.
4. Run `npm run dev` to preview the Civic Guide locally.
