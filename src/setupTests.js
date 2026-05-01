import '@testing-library/jest-dom';
import { vi } from 'vitest';

/**
 * Mock IntersectionObserver for Vitest/JSDOM environment.
 * Required for components using framer-motion's whileInView or similar features.
 */
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
