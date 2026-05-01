import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatSection from './ChatSection';

describe('ChatSection Component', () => {
  const mockMessages = [
    { role: 'model', content: 'Hello! I am your assistant.' },
    { role: 'user', content: 'How do I register?' }
  ];
  const mockOnSend = vi.fn();
  const mockOnInputChange = vi.fn();
  const mockOnClose = vi.fn();

  it('renders chat messages correctly', () => {
    render(
      <ChatSection 
        messages={mockMessages}
        input=""
        onInputChange={mockOnInputChange}
        onSend={mockOnSend}
        loading={false}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Hello! I am your assistant.')).toBeInTheDocument();
    expect(screen.getByText('How do I register?')).toBeInTheDocument();
  });

  it('calls onInputChange when user types', () => {
    render(
      <ChatSection 
        messages={[]}
        input=""
        onInputChange={mockOnInputChange}
        onSend={mockOnSend}
        loading={false}
        onClose={mockOnClose}
      />
    );

    const input = screen.getByPlaceholderText(/Type your query.../i);
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(mockOnInputChange).toHaveBeenCalledWith('test query');
  });

  it('calls onSend when send button is clicked', () => {
    render(
      <ChatSection 
        messages={[]}
        input="test message"
        onInputChange={mockOnInputChange}
        onSend={mockOnSend}
        loading={false}
        onClose={mockOnClose}
      />
    );

    const sendButton = screen.getByLabelText(/Send message/i);
    fireEvent.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalled();
  });

  it('shows typing indicator when loading is true', () => {
    render(
      <ChatSection 
        messages={[]}
        input=""
        onInputChange={mockOnInputChange}
        onSend={mockOnSend}
        loading={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/Officer is typing.../i)).toBeInTheDocument();
  });
});
