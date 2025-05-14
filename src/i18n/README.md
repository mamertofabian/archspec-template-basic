# Internationalization (i18n) Guide

This project uses `react-i18next` for internationalization. This guide explains how to use and extend the i18n functionality.

## Project Structure

```
src/i18n/
├── i18n.ts          # Main i18n configuration
├── index.ts         # Export file for easy importing
├── locales/         # Translation files
│   ├── en.json      # English translations
│   ├── es.json      # Spanish translations
│   └── ...          # Additional language files
└── README.md        # This documentation file
```

## Available Languages

- English (en)
- Spanish (es)

## Adding a New Translation

1. Create a new JSON file in the `locales` directory with the language code as the filename (e.g., `fr.json` for French)
2. Copy the structure from an existing file like `en.json`
3. Translate all values but keep the keys the same
4. Register the new language in `i18n.ts`:

```typescript
// Import new locale file
import frTranslation from './locales/fr.json';

// Add to resources object
const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};
```

5. Add the new language option to the `LanguageSelector` component:

```typescript
const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
];
```

## Usage in Components

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t('page.title')}</h1>;
}
```

### Dynamic Values

```tsx
// With variable substitution
<p>{t('dashboard.welcome', { name: user.name })}</p>
```

### Fallback Values

```tsx
// When the key might be missing, provide a fallback
<span>{t('feature.new', 'New Feature')}</span>
```

### Changing Language

```tsx
const { i18n } = useTranslation();

// Change language
i18n.changeLanguage('es');
```

## Best Practices

1. **Use Namespaces**: Organize translations in logical categories (e.g., `common`, `navigation`, `settings`)
2. **Consistent Key Structure**: Follow a consistent naming pattern (`feature.element.attribute`)
3. **Avoid String Concatenation**: Use variable substitution instead of concatenating strings
4. **Include All Keys**: Ensure all languages have the same keys to avoid missing translations
5. **Descriptive Keys**: Use descriptive keys that indicate the content/purpose of the text

## Language Detection

The application automatically detects the user's preferred language using:

1. Previously selected language (stored in localStorage)
2. Browser language settings

You can modify the detection strategy in `i18n.ts` under the `detection` options.
