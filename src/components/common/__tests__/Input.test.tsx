import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Input from '../Input';

describe('Input Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    value: 'test value',
    onChange: vi.fn(),
  };

  it('renders correctly with default props', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input {...defaultProps} label="Test Input" />);
    expect(screen.getByText('Test Input')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<Input {...defaultProps} label="Test Input" required />);
    const label = screen.getByText('*');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-red-500');
  });

  it('handles input changes correctly', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} value="" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const input = screen.getByDisplayValue('test value');
    expect(input).toHaveClass('border-red-300');
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<Input {...defaultProps} className={customClass} />);

    const input = screen.getByDisplayValue('test value');
    expect(input).toHaveClass(customClass);
  });

  it('forwards additional props to input element', () => {
    render(
      <Input {...defaultProps} data-testid="test-input" placeholder="Enter value" type="email" />
    );

    const input = screen.getByDisplayValue('test value');
    expect(input).toHaveAttribute('data-testid', 'test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('uses id from props or falls back to name', () => {
    render(<Input {...defaultProps} name="test-name" />);
    const input = screen.getByDisplayValue('test value');
    expect(input).toHaveAttribute('id', 'test-name');

    cleanup();

    render(<Input {...defaultProps} id="test-id" name="test-name" />);
    const inputWithId = screen.getByDisplayValue('test value');
    expect(inputWithId).toHaveAttribute('id', 'test-id');
  });
});
