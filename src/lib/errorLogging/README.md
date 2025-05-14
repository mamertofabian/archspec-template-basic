# Error Handling System

The Error Handling System provides a comprehensive approach to managing and logging errors throughout the application. It includes components for displaying errors to users, a service for logging errors, and utilities for integrating error handling into your components.

## Components

### ErrorBoundary

`ErrorBoundary` is a React class component that catches JavaScript errors in its child component tree. It prevents the entire application from crashing and displays a fallback UI.

```tsx
import { ErrorBoundary } from '../components/common';

const MyComponent = () => {
  return <ErrorBoundary>{/* Your component content */}</ErrorBoundary>;
};
```

### ErrorDisplay

`ErrorDisplay` provides a user-friendly way to display errors. It is used by `ErrorBoundary` as the default fallback UI, but can also be used directly.

```tsx
import { ErrorDisplay } from '../components/common';

const MyErrorComponent = ({ error }) => {
  return (
    <ErrorDisplay
      error={error}
      resetError={() => {
        /* Your reset logic */
      }}
    />
  );
};
```

### InlineError

`InlineError` is a component for displaying field-level validation errors in forms.

```tsx
import { InlineError } from '../components/common';

const MyFormField = ({ error }) => {
  return (
    <div>
      <input type="text" />
      <InlineError message={error} />
    </div>
  );
};
```

## Services

### ErrorLoggingService

`ErrorLoggingService` provides centralized error logging functionality. It logs errors to the console in development and can be configured to send errors to external services in production.

```tsx
import { errorLoggingService, ErrorSeverity } from '../lib/errorLogging';

try {
  // Some code that might throw
} catch (error) {
  errorLoggingService.logError(error, ErrorSeverity.ERROR, {
    additionalContext: 'Custom metadata',
  });
}
```

## Hooks

### useErrorHandler

`useErrorHandler` is a custom hook that provides convenient error handling functions for components.

```tsx
import { useErrorHandler } from '../hooks';

const MyComponent = () => {
  const { handleApiError, handleUserActionError } = useErrorHandler();

  const fetchData = async () => {
    try {
      // Fetch data
    } catch (error) {
      handleApiError(error, { endpoint: '/api/data' });
    }
  };

  return (
    // Component JSX
  );
};
```

## Best Practices

1. **Wrap Page Components with ErrorBoundary**

   The main Layout component already wraps children with an ErrorBoundary, but for nested components that need isolated error handling, add dedicated ErrorBoundaries.

2. **Use Appropriate Error Severity**

   - `INFO`: For logging information events that aren't errors
   - `WARNING`: For non-critical issues that don't break functionality
   - `ERROR`: For standard errors that affect a specific feature
   - `CRITICAL`: For severe errors that might require immediate attention

3. **Include Contextual Metadata**

   Always provide relevant context when logging errors:

   ```tsx
   errorLoggingService.logError(error, ErrorSeverity.ERROR, {
     component: 'UserProfile',
     action: 'updateProfile',
     userId: user.id,
   });
   ```

4. **Test Error Handling**

   Use the `ErrorTrigger` component to test how your application handles errors:

   ```tsx
   import { ErrorTrigger } from '../components/common';

   const TestPage = () => {
     return (
       <div>
         <h1>Error Testing</h1>
         <ErrorTrigger />
       </div>
     );
   };
   ```

## External Service Integration

For production applications, integrate with an error monitoring service by updating the `sendToExternalService` method in the `ErrorLoggingService`:

```tsx
private sendToExternalService(errorData: ErrorData): void {
  // Example Sentry integration
  Sentry.captureException(new Error(errorData.message), {
    extra: errorData
  });
}
```
