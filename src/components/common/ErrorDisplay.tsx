import { FunctionComponent } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: Error | null;
  resetError?: () => void;
}

/**
 * A component that displays error information in a user-friendly way
 */
const ErrorDisplay: FunctionComponent<ErrorDisplayProps> = ({ error, resetError }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900">
            <svg
              className="h-10 w-10 text-red-600 dark:text-red-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Something went wrong
        </h2>

        <div className="mb-4 text-gray-600 dark:text-gray-300">
          <p className="mb-2">We encountered an unexpected error.</p>
          {error && (
            <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-left overflow-auto max-h-32">
              <p className="font-mono break-all">{error.message}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          {resetError && (
            <Button onClick={resetError} className="w-full">
              Try again
            </Button>
          )}
          <Button
            onClick={() => (window.location.href = '/')}
            variant="secondary"
            className="w-full"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
