import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { VoterProvider } from './config/VoterContext';

describe('VoterGuide UI Components', () => {
  it('verifies "VoterGuide" is rendered in the header', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    expect(screen.getByText(/VOTER GUIDE AI/i)).toBeInTheDocument();
  });

  it('verifies "Plain Language" toggle is present', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    expect(screen.getByText(/Plain Language/i)).toBeInTheDocument();
  });

  it('verifies "Sahayak" is visible after opening the chat', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    
    const chatButton = screen.getByLabelText(/Open Chat/i);
    fireEvent.click(chatButton);
    
    expect(screen.getByText(/Sahayak/i)).toBeInTheDocument();
  });
});
