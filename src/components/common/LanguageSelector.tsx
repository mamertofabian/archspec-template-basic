import { useTranslation } from 'react-i18next';
import Select from './Select';

/**
 * LanguageSelector component - Allows users to change the application language
 *
 * @returns A Select component for changing the language
 */
export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  // List of available languages
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
  ];

  // Current language
  const currentLanguage = i18n.language || 'en';

  // Handle language change
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    // You could save the language preference to user profile here
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        {t('settings.language')}
      </label>
      <Select
        id="language-select"
        value={currentLanguage}
        onChange={handleLanguageChange}
        options={languages.map(lang => ({
          value: lang.value,
          label: lang.label,
        }))}
      />
    </div>
  );
};

export default LanguageSelector;
