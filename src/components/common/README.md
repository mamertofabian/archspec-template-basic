# Common Components

This directory contains reusable components used throughout the application.

## Available Components

- `Button` - Customizable button component
- `Card` - Card container component
- `Input` - Form input component
- `TextArea` - Multiline text input component
- `Select` - Dropdown select component
- `DateInput` - Date picker component
- `ConfirmationDialog` - Reusable confirmation dialog
- `NotImplementedDialog` - Dialog for placeholder features

## ConfirmationDialog

A reusable dialog for prompting users to confirm actions such as deletion or other potentially destructive operations.

### Props

| Prop           | Type                                                                        | Required | Default   | Description                                        |
| -------------- | --------------------------------------------------------------------------- | -------- | --------- | -------------------------------------------------- |
| isOpen         | boolean                                                                     | Yes      | -         | Controls whether the dialog is visible             |
| title          | string                                                                      | Yes      | -         | The title of the dialog                            |
| message        | ReactNode                                                                   | Yes      | -         | Message or content to display (can be text or JSX) |
| confirmLabel   | string                                                                      | Yes      | -         | Text for the confirm button                        |
| cancelLabel    | string                                                                      | No       | 'Cancel'  | Text for the cancel button                         |
| confirmVariant | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'outline' | No       | 'primary' | Button style for the confirm button                |
| isLoading      | boolean                                                                     | No       | false     | Shows loading state for the confirm button         |
| onConfirm      | () => void                                                                  | Yes      | -         | Function called when confirm is clicked            |
| onCancel       | () => void                                                                  | Yes      | -         | Function called when cancel is clicked             |

### Example Usage

```tsx
import { useState } from 'react';
import { ConfirmationDialog } from '@/components/common';

const ExampleComponent = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Perform delete operation
      await deleteItem(itemId);
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    } finally {
      setIsDeleting(false);
      setShowDialog(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>Delete Item</button>

      <ConfirmationDialog
        isOpen={showDialog}
        title="Delete Item"
        message={
          <p>
            Are you sure you want to delete this item?
            <strong>This action cannot be undone.</strong>
          </p>
        }
        confirmLabel="Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  );
};
```

### Best Practices

1. Use for any destructive or important actions that require confirmation
2. Customize the message with appropriate warnings for the action
3. Use the appropriate `confirmVariant` to match the severity of the action:
   - `danger` for destructive actions like delete
   - `warning` for potentially risky actions
   - `primary` or `secondary` for standard confirmations
4. Always include clear, specific messaging about what will happen

## NotImplementedDialog

A component that displays a button which, when clicked, shows a dialog informing users that the feature is not yet implemented. Useful for template applications or showcasing planned functionality.

### Props

| Prop          | Type                                                                        | Required | Default         | Description                             |
| ------------- | --------------------------------------------------------------------------- | -------- | --------------- | --------------------------------------- |
| buttonText    | string                                                                      | Yes      | -               | The text to display on the button       |
| buttonVariant | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'outline' | No       | 'outline'       | Button style                            |
| buttonSize    | 'sm' \| 'md' \| 'lg'                                                        | No       | 'md'            | Size of the button                      |
| className     | string                                                                      | No       | ''              | Additional CSS classes for the button   |
| message       | ReactNode                                                                   | No       | default message | Custom message to display in the dialog |
| featureName   | string                                                                      | No       | buttonText      | Feature name to display in dialog title |

### Example Usage

```tsx
import { NotImplementedDialog } from '@/components/common';

const FeaturePage = () => {
  return (
    <div>
      <h1>Feature Page</h1>

      {/* Basic usage */}
      <NotImplementedDialog buttonText="Export Data" />

      {/* Custom message and styling */}
      <NotImplementedDialog
        buttonText="Advanced Search"
        buttonVariant="primary"
        buttonSize="lg"
        featureName="Advanced Search"
        message={
          <div>
            <p>The advanced search feature is planned for the next release.</p>
            <p className="mt-2 text-sm">
              This feature will include filtering by multiple criteria, saved searches, and export
              options.
            </p>
          </div>
        }
      />
    </div>
  );
};
```

### Best Practices

1. Use for placeholder features in template applications
2. Provide helpful information about what the feature will do when implemented
3. Consider using different button variants to match the UI context
4. Use custom messages to explain the planned functionality in detail
