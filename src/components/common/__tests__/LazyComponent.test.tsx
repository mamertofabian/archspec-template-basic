import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import LazyComponent from '../LazyComponent';

// Mock the React.Suspense component to directly render children
// This simplifies testing by removing the suspense behavior
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal() as object;
  return {
    ...actual,
    Suspense: ({ children }: { children?: React.ReactNode }) => children
  };
});

// Mock LoadingScreen for cleaner testing
vi.mock('./LoadingScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-screen">Loading Screen Mock</div>
}));

describe('LazyComponent', () => {
  // Create a test component to pass to LazyComponent
  const TestComponent = () => <div data-testid="test-component">Test Component Content</div>;
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be properly defined', () => {
    // Basic test to verify the component exists and is a function
    expect(LazyComponent).toBeDefined();
    expect(typeof LazyComponent).toBe('function');
  });

  it('should render the provided component', () => {
    // By mocking React.Suspense to render children directly, we can test
    // that LazyComponent correctly passes the component through
    const { container } = render(<LazyComponent component={TestComponent} />);
    
    // Verify the component structure is maintained
    expect(container.innerHTML).toContain('Test Component Content');
    expect(container.querySelector('[data-testid="test-component"]')).not.toBeNull();
  });

  it('should accept a component prop and render correctly', () => {
    // Testing the component's external behavior - a component goes in,
    // and we see its content rendered
    const CustomComponent = () => <span>Custom Content</span>;
    const { container } = render(<LazyComponent component={CustomComponent} />);
    
    expect(container.innerHTML).toContain('Custom Content');
  });
});
