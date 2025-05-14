import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from './ConfirmationDialog';

type ButtonVariantType = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

interface NotImplementedDialogProps {
  /**
   * The button text to display
   */
  buttonText: string;

  /**
   * The button variant (style)
   */
  buttonVariant?: ButtonVariantType;

  /**
   * Size of the button
   */
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';

  /**
   * Additional class name for the button
   */
  className?: string;

  /**
   * Custom message to display in the dialog
   */
  message?: React.ReactNode;

  /**
   * Feature name to display in dialog title
   */
  featureName?: string;
}

/**
 * A component that shows a button which, when clicked, displays a dialog
 * informing the user that the feature is not yet implemented.
 */
const NotImplementedDialog: React.FC<NotImplementedDialogProps> = ({
  buttonText,
  buttonVariant = 'outline',
  buttonSize = 'default',
  className = '',
  message,
  featureName,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const defaultMessage = (
    <div>
      <p>This feature is not yet implemented in this template application.</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        This dialog demonstrates how to use the ConfirmationDialog component for features under
        development or placeholder functionality.
      </p>
    </div>
  );

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={className}
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title={`${featureName || buttonText} Feature`}
        message={message || defaultMessage}
        confirmLabel="Understood"
        cancelLabel="Close"
        confirmVariant="primary"
        onConfirm={handleCloseDialog}
        onCancel={handleCloseDialog}
      />
    </>
  );
};

export default NotImplementedDialog;
