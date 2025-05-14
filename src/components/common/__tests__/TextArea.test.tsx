import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import TextArea from '../TextArea';

describe('TextArea Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    value: 'test content',
    onChange: vi.fn(),
  };

  it('renders correctly with default props', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('test content');
  });

  it('renders label when provided', () => {
    render(<TextArea {...defaultProps} label="Test TextArea" />);
    expect(screen.getByText('Test TextArea')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<TextArea {...defaultProps} label="Test TextArea" required />);
    const label = screen.getByText('*');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-red-500');
  });

  it('handles text changes correctly', () => {
    const handleChange = vi.fn();
    render(<TextArea onChange={handleChange} value="" />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new content' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<TextArea {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-300');
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<TextArea {...defaultProps} className={customClass} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(customClass);
  });

  it('forwards additional props to textarea element', () => {
    render(
      <TextArea {...defaultProps} data-testid="test-textarea" placeholder="Enter text" rows={5} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('data-testid', 'test-textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('uses id from props or falls back to name', () => {
    render(<TextArea {...defaultProps} name="test-name" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'test-name');

    cleanup();

    render(<TextArea {...defaultProps} id="test-id" name="test-name" />);
    const textareaWithId = screen.getByRole('textbox');
    expect(textareaWithId).toHaveAttribute('id', 'test-id');
  });

  it('handles disabled state correctly', () => {
    render(<TextArea {...defaultProps} disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });
});
