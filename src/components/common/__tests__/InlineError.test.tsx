import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InlineError from '../InlineError';

describe('InlineError Component', () => {
  it('renders error message correctly', () => {
    render(<InlineError message="This field is required" />);

    const errorContainer = screen.getByRole('alert');
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass('text-danger');
    expect(errorContainer).toHaveTextContent('This field is required');
  });

  it('applies the provided id attribute', () => {
    const testId = 'email-error';
    render(<InlineError message="Invalid input" id={testId} />);

    const errorContainer = screen.getByRole('alert');
    expect(errorContainer).toHaveAttribute('id', testId);
    expect(errorContainer).toHaveTextContent('Invalid input');
  });

  it('renders ReactNode content correctly', () => {
    const errorContent = (
      <span>
        <strong>Error:</strong> Please check your input
      </span>
    );

    render(<InlineError message={errorContent} />);

    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Please check your input')).toBeInTheDocument();
  });

  it('renders nothing when message is falsy', () => {
    // Tests for empty string
    const { container: emptyContainer } = render(<InlineError message="" />);
    expect(emptyContainer.firstChild).toBeNull();

    // We can create a variable to avoid directly passing null/undefined
    // which would violate type checking
    const nullMessage: string | null = null;
    const { container: nullContainer } = render(<InlineError message={nullMessage!} />);
    expect(nullContainer.firstChild).toBeNull();

    const undefinedMessage: string | undefined = undefined;
    const { container: undefinedContainer } = render(<InlineError message={undefinedMessage!} />);
    expect(undefinedContainer.firstChild).toBeNull();
  });
});
