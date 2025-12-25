import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tk', name: 'Türkmençe', flag: '🇹🇲' },
];

export const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangDropdownOpen(false);
  };

  return (
    <div className="mt-5 pt-5 border-t border-gray-700">
      <div className="text-sm font-medium text-gray-400 mb-3">{t('common.language')}</div>
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLangDropdownOpen(!isLangDropdownOpen);
          }}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{currentLanguage.flag}</span>
            <span className="font-dm font-medium">{currentLanguage.name}</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
            isLangDropdownOpen
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage(lang.code);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                lang.code === i18n.language
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-dm font-medium">{lang.name}</span>
              {lang.code === i18n.language && (
                <svg
                  className="ml-auto w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};