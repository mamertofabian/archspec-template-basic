import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorDisplay from '../ErrorDisplay';

// Mock Button component from ui/button
vi.mock('@/components/ui/button', () => ({
  Button: vi.fn(({ children, onClick, variant, className }) => (
    <button
      onClick={onClick}
      {...(variant ? { 'data-variant': variant } : {})}
      data-className={className}
      data-testid="button-mock"
    >
      {children}
    </button>
  )),
}));

describe('ErrorDisplay Component', () => {
  it('renders correctly with an error', () => {
    const error = new Error('Test error message');
    render(<ErrorDisplay error={error} />);

    // Check heading
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Check error message display
    expect(screen.getByText('We encountered an unexpected error.')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();

    // Check buttons
    const buttons = screen.getAllByTestId('button-mock');
    expect(buttons).toHaveLength(1); // Only homepage button when no resetError
    expect(buttons[0]).toHaveTextContent('Go to homepage');
    expect(buttons[0]).toHaveAttribute('data-variant', 'secondary');
  });

  it('renders without error message when error is null', () => {
    render(<ErrorDisplay error={null} />);

    // Check heading is still there
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Error message container should not be rendered
    expect(screen.getByText('We encountered an unexpected error.')).toBeInTheDocument();
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });

  it('renders Try Again button when resetError is provided', () => {
    const resetErrorMock = vi.fn();
    const error = new Error('Test error message');
    render(<ErrorDisplay error={error} resetError={resetErrorMock} />);

    // Check for Try Again button
    const buttons = screen.getAllByTestId('button-mock');
    expect(buttons).toHaveLength(2); // Both try again and homepage buttons
    expect(buttons[0]).toHaveTextContent('Try again');
    // The default variant button should not have a data-variant attribute
    expect(buttons[0].hasAttribute('data-variant')).toBe(false);
  });

  it('calls resetError when Try Again button is clicked', () => {
    const resetErrorMock = vi.fn();
    const error = new Error('Test error message');
    render(<ErrorDisplay error={error} resetError={resetErrorMock} />);

    // Find and click Try Again button
    const tryAgainButton = screen.getAllByTestId('button-mock')[0];
    fireEvent.click(tryAgainButton);

    // Check if resetError was called
    expect(resetErrorMock).toHaveBeenCalledTimes(1);
  });

  it('navigates to homepage when Go to homepage button is clicked', () => {
    // Mock window.location.href
    const originalHref = window.location.href;
    const mockLocation = { href: '' };

    // Use Object.defineProperty instead of direct assignment
    Object.defineProperty(window, 'location', {
      writable: true,
      value: mockLocation,
    });

    const error = new Error('Test error message');
    render(<ErrorDisplay error={error} />);

    // Find and click Go to homepage button
    const homeButton = screen.getByText('Go to homepage');
    fireEvent.click(homeButton);

    // Check if location.href was set correctly
    expect(window.location.href).toBe('/');

    // Restore window.location.href
    window.location.href = originalHref;
  });

  it('displays error icon correctly', () => {
    const error = new Error('Test error message');
    render(<ErrorDisplay error={error} />);

    // Check for error icon (SVG)
    const errorIcon = document.querySelector('svg');
    expect(errorIcon).toBeInTheDocument();
  });
});
