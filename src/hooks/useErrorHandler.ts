import { useCallback } from 'react';
import { errorLoggingService, ErrorSeverity } from '../lib/errorLogging';

/**
 * Custom hook to handle and log errors in components
 *
 * @returns Object with error handling functions
 */
const useErrorHandler = () => {
  /**
   * Handle API or data fetching errors
   */
  const handleApiError = useCallback((error: Error, metadata?: Record<string, unknown>) => {
    errorLoggingService.logError(error, ErrorSeverity.ERROR, {
      type: 'api_error',
      ...metadata,
    });
  }, []);

  /**
   * Handle user interaction errors (e.g., form submission)
   */
  const handleUserActionError = useCallback(
    (error: Error, action: string, metadata?: Record<string, unknown>) => {
      errorLoggingService.logError(error, ErrorSeverity.WARNING, {
        type: 'user_action_error',
        action,
        ...metadata,
      });
    },
    []
  );

  /**
   * Log information events (not errors)
   */
  const logInfo = useCallback((message: string, metadata?: Record<string, unknown>) => {
    const infoError = new Error(message);
    errorLoggingService.logError(infoError, ErrorSeverity.INFO, {
      type: 'info',
      ...metadata,
    });
  }, []);

  /**
   * Handle critical errors that might require immediate attention
   */
  const handleCriticalError = useCallback((error: Error, metadata?: Record<string, unknown>) => {
    errorLoggingService.logError(error, ErrorSeverity.CRITICAL, {
      type: 'critical_error',
      ...metadata,
    });

    // For critical errors, you might want to take additional actions
    // For example, show a user-friendly error message or redirect to an error page
  }, []);

  return {
    handleApiError,
    handleUserActionError,
    logInfo,
    handleCriticalError,
  };
};

export default useErrorHandler;
