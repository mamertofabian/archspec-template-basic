import { ErrorInfo } from 'react';

// Define severity levels for errors
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

// Define interface for error data
export interface ErrorData {
  message: string;
  stack?: string;
  componentStack?: string;
  userId?: string;
  timestamp: number;
  severity: ErrorSeverity;
  metadata?: Record<string, unknown>;
  url: string;
  userAgent: string;
}

/**
 * Error Logging Service
 *
 * A centralized service to handle error logging throughout the application.
 * Supports console logging and can be extended to log to external services.
 */
class ErrorLoggingService {
  /**
   * Log an error with additional context
   */
  public logError(
    error: Error,
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    metadata?: Record<string, unknown>,
    componentStack?: string
  ): void {
    const errorData = this.prepareErrorData(error, severity, metadata, componentStack);

    // Log to console in development
    this.logToConsole(errorData);

    // In a production environment, you would send this to an external service
    if (import.meta.env.PROD) {
      this.sendToExternalService(errorData);
    }
  }

  /**
   * Log a React error from error boundary
   */
  public logReactError(
    error: Error,
    errorInfo: ErrorInfo,
    metadata?: Record<string, unknown>
  ): void {
    this.logError(error, ErrorSeverity.ERROR, metadata, errorInfo.componentStack || undefined);
  }

  /**
   * Prepare error data with contextual information
   */
  private prepareErrorData(
    error: Error,
    severity: ErrorSeverity,
    metadata?: Record<string, unknown>,
    componentStack?: string
  ): ErrorData {

    return {
      message: error.message,
      stack: error.stack,
      componentStack,
      timestamp: Date.now(),
      severity,
      metadata,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
  }

  /**
   * Log error to console with formatting
   */
  private logToConsole(errorData: ErrorData): void {
    const { severity, message, stack, componentStack, userId, metadata } = errorData;

    // Use different console methods based on severity
    const logMethod =
      severity === ErrorSeverity.INFO
        ? console.info
        : severity === ErrorSeverity.WARNING
          ? console.warn
          : console.error;

    logMethod(`[${severity.toUpperCase()}] ${message}`, {
      stack,
      componentStack,
      userId,
      metadata,
      timestamp: new Date(errorData.timestamp).toISOString(),
      url: errorData.url,
    });
  }

  /**
   * Send error to external service
   * This is a placeholder for integration with services like Sentry, LogRocket, etc.
   */
  private sendToExternalService(errorData: ErrorData): void {
    // This would be implemented with your error monitoring service of choice
    // Example integration points:
    // - Sentry: Sentry.captureException(new Error(errorData.message), { extra: errorData })
    // - Custom API: fetch('/api/log-error', { method: 'POST', body: JSON.stringify(errorData) })

    console.log('Error would be sent to external service:', errorData);
  }
}

// Create singleton instance
const errorLoggingService = new ErrorLoggingService();

export default errorLoggingService;
