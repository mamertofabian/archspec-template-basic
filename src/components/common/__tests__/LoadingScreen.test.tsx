import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingScreen from '../LoadingScreen';

describe('LoadingScreen Component', () => {
  it('renders the loading indicator correctly', () => {
    render(<LoadingScreen />);
    
    // Check for loading text
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('ml-4 text-xl font-medium text-indigo-700');
    
    // Check for spinner elements
    const container = loadingText.parentElement;
    expect(container).toHaveClass('flex items-center justify-center min-h-[50vh]');
    
    // Verify the existence of the spinners
    const spinnerContainer = container?.querySelector('.relative');
    expect(spinnerContainer).toBeInTheDocument();
    
    // Check primary spinner
    const primarySpinner = container?.querySelector('.border-indigo-600');
    expect(primarySpinner).toBeInTheDocument();
    expect(primarySpinner).toHaveClass('animate-spin');
    
    // Check secondary spinner
    const secondarySpinner = container?.querySelector('.border-indigo-200');
    expect(secondarySpinner).toBeInTheDocument();
    expect(secondarySpinner).toHaveClass('animate-spin');
    
    // Verify reverse animation style on secondary spinner
    expect(secondarySpinner).toHaveStyle({
      animationDirection: 'reverse',
      animationDuration: '1s'
    });
  });
});
