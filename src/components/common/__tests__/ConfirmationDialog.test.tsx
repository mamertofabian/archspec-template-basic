import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ConfirmationDialog from '../ConfirmationDialog';

describe('ConfirmationDialog Component', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    isOpen: true,
    title: 'Test Title',
    message: 'Test message',
    confirmLabel: 'Confirm',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(<ConfirmationDialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('disables confirm button when isLoading is true', () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={true} />);
    const confirmButton = screen.getByText('Processing...');
    expect(confirmButton).toBeDisabled();
  });

  it('shows custom loading text when isLoading is true', () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={true} confirmLabel="Save" />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders custom cancel label when provided', () => {
    render(<ConfirmationDialog {...defaultProps} cancelLabel="Go Back" />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('renders complex JSX in message', () => {
    const complexMessage = (
      <div>
        <p>Complex message</p>
        <strong>With formatting</strong>
      </div>
    );

    render(<ConfirmationDialog {...defaultProps} message={complexMessage} />);
    expect(screen.getByText('Complex message')).toBeInTheDocument();
    expect(screen.getByText('With formatting')).toBeInTheDocument();
  });
});
