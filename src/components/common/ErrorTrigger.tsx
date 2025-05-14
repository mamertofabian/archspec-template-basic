import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ErrorDisplay from './ErrorDisplay';

interface ErrorTriggerProps {
  throwOnRender?: boolean;
  children?: React.ReactNode;
}

/**
 * A component that can be used to trigger errors for testing error boundaries
 */
const ErrorTrigger = ({ throwOnRender = false, children }: ErrorTriggerProps) => {
  const [shouldThrow, setShouldThrow] = useState(throwOnRender);
  const [showError, setShowError] = useState(false);
  const [customError, setCustomError] = useState<Error | null>(null);

  if (shouldThrow) {
    // Deliberately throw an error for testing
    throw new Error('This is a test error triggered by ErrorTrigger component');
  }

  const triggerError = () => {
    setShouldThrow(true);
    setShowError(true);
    setCustomError(new Error('This is a custom error triggered by ErrorTrigger component'));
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Error Boundary Test
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This component allows you to test the error boundary by triggering an error.
      </p>
      {showError && <ErrorDisplay error={customError} />}
      {!showError && (
        <Button onClick={triggerError} variant="destructive">
          {children || 'Trigger Error'}
        </Button>
      )}
    </div>
  );
};

export default ErrorTrigger;
