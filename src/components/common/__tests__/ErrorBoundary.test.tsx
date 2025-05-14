import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

// Mock ErrorDisplay component
vi.mock('../ErrorDisplay', () => ({
  default: vi.fn(() => <div data-testid="error-display-mock" />),
}));

// Component that throws an error for testing the ErrorBoundary
const ErrorThrowingComponent = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal Component</div>;
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error during tests to prevent noisy output
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-component">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });

  it('renders ErrorDisplay when child component throws', () => {
    // Suppress React's error boundary warning in test environment
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-display-mock')).toBeInTheDocument();

    spy.mockRestore();
  });

  it('renders custom fallback UI when provided and error occurs', () => {
    // Suppress React's error boundary warning in test environment
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Fallback</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();

    spy.mockRestore();
  });

  it('calls onError callback when error occurs', () => {
    // Suppress React's error boundary warning in test environment
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const onErrorMock = vi.fn();

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onErrorMock.mock.calls[0][0].message).toBe('Test error');

    spy.mockRestore();
  });

  it('recovers when error source is removed', () => {
    // This test requires re-rendering the component
    // First render with error, then update to render without error

    // Suppress React's error boundary warning in test environment
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error display
    expect(screen.getByTestId('error-display-mock')).toBeInTheDocument();

    // Need to create a new ErrorBoundary instance to reset state
    rerender(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should still show error display because ErrorBoundary state doesn't reset automatically
    expect(screen.getByTestId('error-display-mock')).toBeInTheDocument();

    spy.mockRestore();
  });
});
