import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DateInput from '../DateInput';

describe('DateInput Component', () => {
  const defaultProps = {
    value: '2024-03-20',
    onChange: vi.fn(),
  };

  it('renders correctly with default props', () => {
    render(<DateInput {...defaultProps} />);
    const input = screen.getByDisplayValue('2024-03-20');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2024-03-20');
  });

  it('renders label when provided', () => {
    render(<DateInput {...defaultProps} label="Test Date" />);
    expect(screen.getByText('Test Date')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<DateInput {...defaultProps} label="Test Date" required />);
    const label = screen.getByText('*');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-red-500');
  });

  it('handles date changes correctly', () => {
    const handleChange = vi.fn();
    render(<DateInput value="2024-03-20" onChange={handleChange} />);

    const input = screen.getByDisplayValue('2024-03-20');
    fireEvent.change(input, { target: { value: '2024-03-21' } });

    expect(handleChange).toHaveBeenCalledWith('2024-03-21');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Invalid date';
    render(<DateInput {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const input = screen.getByDisplayValue('2024-03-20');
    expect(input).toHaveClass('border-red-300');
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<DateInput {...defaultProps} className={customClass} />);

    const input = screen.getByDisplayValue('2024-03-20');
    expect(input).toHaveClass(customClass);
  });

  it('forwards additional props to input element', () => {
    render(<DateInput {...defaultProps} data-testid="date-input" placeholder="Select date" />);

    const input = screen.getByTestId('date-input');
    expect(input).toHaveAttribute('placeholder', 'Select date');
    expect(input).toHaveAttribute('type', 'date');
  });
});
