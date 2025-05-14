import { FunctionComponent, ReactNode } from 'react';

interface InlineErrorProps {
  message: string | ReactNode;
  id?: string;
}

/**
 * A component that displays error messages inline,
 * typically used with form fields
 */
const InlineError: FunctionComponent<InlineErrorProps> = ({ message, id }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-1 text-sm text-danger" id={id} role="alert">
      {message}
    </div>
  );
};

export default InlineError;
