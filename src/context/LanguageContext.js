'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Default languages (fallback if API fails)
export const defaultLanguages = [
  { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', rtl: false, isDefault: true },
  { code: 'en', name: 'English', nativeName: 'English', rtl: false, isDefault: false },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', rtl: false, isDefault: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, isDefault: false }
];

// Default language code
const defaultLanguageCode = 'tr';

// Create context
const LanguageContext = createContext();

// Language provider component
export function LanguageProvider({ children }) {
  // Initialize states
  const [language, setLanguage] = useState(defaultLanguageCode);
  const [languages, setLanguages] = useState(defaultLanguages);
  const [loading, setLoading] = useState(true);
  
  // Initial client-side check for stored language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedLanguage = localStorage.getItem('preferredLanguage');
        console.log('Initial localStorage check:', storedLanguage);
        
        if (storedLanguage) {
          setLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    }
  }, []);
  
  // Fetch available languages from API
  useEffect(() => {
    // Set default language or use stored preference
    const setDefaultLanguage = (defaultCode, availableLanguages) => {
      try {
        const storedLanguage = localStorage.getItem('preferredLanguage');
        console.log('Setting default language, stored preference:', storedLanguage);
        
        if (storedLanguage && availableLanguages.some(lang => lang.code === storedLanguage)) {
          console.log('Using stored language preference:', storedLanguage);
          setLanguage(storedLanguage);
        } else {
          // Try browser language
          const browserLang = navigator.language?.split('-')[0];
          if (browserLang && availableLanguages.some(lang => lang.code === browserLang)) {
            console.log('Using browser language:', browserLang);
            setLanguage(browserLang);
            localStorage.setItem('preferredLanguage', browserLang);
          } else {
            // Use default language from API or fallback
            console.log('Using default language:', defaultCode || defaultLanguageCode);
            setLanguage(defaultCode || defaultLanguageCode);
            localStorage.setItem('preferredLanguage', defaultCode || defaultLanguageCode);
          }
        }
      } catch (error) {
        console.error('Error in setDefaultLanguage:', error);
        setLanguage(defaultCode || defaultLanguageCode);
      }
    };
    
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await response.json();
        
        if (data.success && data.languages && data.languages.length > 0) {
          console.log('Languages fetched from API:', data.languages);
          setLanguages(data.languages);
          
          // Find default language
          const defaultLang = data.languages.find(lang => lang.isDefault);
          if (defaultLang) {
            setDefaultLanguage(defaultLang.code, data.languages);
          }
        }
      } catch (error) {
        console.error('Dil verileri çekilirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLanguages();
  }, []);
  
  // Apply language settings once languages are loaded
  const [languagesLoaded, setLanguagesLoaded] = useState(false);
  
  useEffect(() => {
    if (!loading && !languagesLoaded) {
      try {
        const storedLanguage = localStorage.getItem('preferredLanguage');
        console.log('Languages loaded check, stored preference:', storedLanguage);
        
        if (storedLanguage && languages.some(lang => lang.code === storedLanguage)) {
          console.log('Setting language from stored preference:', storedLanguage);
          setLanguage(storedLanguage);
        } else {
          // Find default language
          const defaultLang = languages.find(lang => lang.isDefault);
          if (defaultLang) {
            console.log('Setting default language from API:', defaultLang.code);
            setLanguage(defaultLang.code);
            localStorage.setItem('preferredLanguage', defaultLang.code);
          }
        }
      } catch (error) {
        console.error('Error in language loading effect:', error);
      } finally {
        setLanguagesLoaded(true);
      }
    }
  }, [loading, languages, languagesLoaded]);
  
  // Change language function
  const changeLanguage = (newLanguage) => {
    if (languages.some(lang => lang.code === newLanguage)) {
      console.log('Changing language to:', newLanguage);
      setLanguage(newLanguage);
      try {
        localStorage.setItem('preferredLanguage', newLanguage);
        console.log('Language saved to localStorage in changeLanguage:', newLanguage);
        
        // Debug: Verify immediately that the value was saved
        const verifyValue = localStorage.getItem('preferredLanguage');
        console.log('Verification - localStorage now contains:', verifyValue);
      } catch (error) {
        console.error('Error saving language to localStorage:', error);
      }
    } else {
      console.warn('Attempted to set invalid language:', newLanguage);
    }
  };
  
  // Context value
  const value = {
    language,
    changeLanguage,
    languages,
    loading
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper function to get text in current language
export function getText(textObject, language, fallback = '') {
  if (!textObject) return fallback;
  
  // If textObject has the current language, return it
  if (textObject[language]) return textObject[language];
  
  // If not, try English as a fallback (if the current language isn't English)
  if (language !== 'en' && textObject.en) return textObject.en;
  
  // If there's a default language in textObject, use it
  for (const lang of defaultLanguages.map(l => l.code)) {
    if (textObject[lang] && lang !== language) return textObject[lang];
  }
  
  // If all fails, return the first non-empty language value
  for (const lang in textObject) {
    if (textObject[lang]) return textObject[lang];
  }
  
  // If absolutely nothing works, return the fallback
  return fallback;
}

