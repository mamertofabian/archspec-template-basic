import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Select from '../Select';

describe('Select Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const defaultProps = {
    options: defaultOptions,
    value: '1',
    onChange: vi.fn(),
  };

  it('renders correctly with default props', () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('1');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Option 1');
  });

  it('renders label when provided', () => {
    render(<Select {...defaultProps} label="Test Select" />);
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<Select {...defaultProps} label="Test Select" required />);
    const label = screen.getByText('*');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-red-500');
  });

  it('handles selection changes correctly', () => {
    const handleChange = vi.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });

    expect(handleChange).toHaveBeenCalledWith('2');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Please select an option';
    render(<Select {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-300');
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<Select {...defaultProps} className={customClass} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(customClass);
  });

  it('renders placeholder option when provided', () => {
    render(<Select {...defaultProps} placeholder="Select an option" value="" />);

    const placeholderOption = screen.getByText('Select an option');
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveAttribute('disabled');
  });

  it('disables the select when disabled prop is true', () => {
    render(<Select {...defaultProps} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass('bg-gray-50', 'text-gray-500', 'cursor-not-allowed');
  });

  it('uses id from props or falls back to name', () => {
    render(<Select {...defaultProps} name="test-name" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'test-name');

    cleanup();

    render(<Select {...defaultProps} id="test-id" name="test-name" />);
    const selectWithId = screen.getByRole('combobox');
    expect(selectWithId).toHaveAttribute('id', 'test-id');
  });
});
