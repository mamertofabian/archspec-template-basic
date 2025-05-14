import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  required,
  ...props
}) => {
  const id = props.id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Textarea
        {...props}
        id={id}
        className={`${error ? 'border-red-300 dark:border-red-700' : ''} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default TextArea;
