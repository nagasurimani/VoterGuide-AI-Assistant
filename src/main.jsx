import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VoterProvider } from './config/VoterContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VoterProvider>
      <App />
    </VoterProvider>
  </StrictMode>,
)
