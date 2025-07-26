'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher({ mode = 'dropdown' }) {
  const { language, changeLanguage, languages, loading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  
  // Find the current language object for RTL detection
  const currentLang = languages.find(lang => lang.code === language) || { rtl: false };
  
  // Check if languages are available and have the required properties
  const availableLanguages = languages
    .filter(lang => lang && lang.code && (lang.isActive === undefined || lang.isActive === true))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // For dropdown mode
  if (mode === 'dropdown') {
    return (
      <div 
        className={styles.languageSwitcher}
        dir={currentLang.rtl ? 'rtl' : 'ltr'}
      >
        <button 
          className={styles.currentLanguage} 
          onClick={toggleDropdown}
          aria-label="Change language"
          disabled={loading}
        >
          {loading ? '...' : language.toUpperCase()}
          <span className={styles.arrow}>▼</span>
        </button>
        
        {isOpen && (
          <div className={styles.languageDropdown}>
            {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.languageOption} ${lang.code === language ? styles.active : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                  dir={lang.rtl ? 'rtl' : 'ltr'}
                >
                  <span>{lang.nativeName || lang.name}</span>
                  {lang.code !== lang.name && <span className={styles.langCode}>({lang.code})</span>}
                </button>
              ))
            }
          </div>
        )}
      </div>
    );
  }
  
  // For horizontal buttons mode
  return (
    <div className={styles.languageButtons}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.languageButton} ${lang.code === language ? styles.active : ''}`}
              onClick={() => changeLanguage(lang.code)}
              dir={lang.rtl ? 'rtl' : 'ltr'}
            >
              {lang.code.toUpperCase()}
            </button>
          ))
      )}
    </div>
  );
}
