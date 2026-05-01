import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { VoterProvider } from './config/VoterContext';

describe('VoterGuide Application', () => {
  it('renders the main title "VOTER GUIDE AI"', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    expect(screen.getByText(/VOTER GUIDE AI/i)).toBeInTheDocument();
  });

  it('renders accessibility features like the main content area', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('verifies "Plain Language" toggle is present and accessible', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    expect(screen.getByLabelText(/Plain Language/i)).toBeInTheDocument();
  });

  it('opens the assistant chat when the chat button is clicked', () => {
    render(
      <VoterProvider>
        <App />
      </VoterProvider>
    );
    
    const chatButton = screen.getByLabelText(/Open Election Assistant Chat/i);
    fireEvent.click(chatButton);
    
    expect(screen.getByText(/Sahayak/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your query.../i)).toBeInTheDocument();
  });
});
