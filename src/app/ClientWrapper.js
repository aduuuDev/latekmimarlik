'use client';

import { useState, useEffect } from 'react';
import DynamicTitleUpdater from '@/components/DynamicTitleUpdater';
import { useLanguage } from '@/context/LanguageContext';

const ClientWrapper = ({ children }) => {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Component mount durumunu takip et
  useEffect(() => {
    console.log('ClientWrapper mounted');
    setIsMounted(true);
    
    // Debug: Check if localStorage has a language value on mount
    if (typeof window !== 'undefined') {
      try {
        const storedLang = localStorage.getItem('preferredLanguage');
        console.log('ClientWrapper mount - localStorage language value:', storedLang);
      } catch (error) {
        console.error('Error checking localStorage on mount:', error);
      }
    }
    
    return () => {
      console.log('ClientWrapper unmounting');
      setIsMounted(false);
    };
  }, []);
  
  // Only write to localStorage on explicit language changes, not on initial load
  useEffect(() => {
    // Skip the first render/effect to avoid overriding the value from LanguageContext
    if (initialLoad) {
      console.log('ClientWrapper: Skipping initial localStorage write');
      setInitialLoad(false);
      return;
    }
    
    // Client tarafında olduğumuzdan ve component mount olduktan sonra çalış
    if (!isMounted || typeof window === 'undefined') return;
    
    if (language) {
      console.log('ClientWrapper: Language changed to', language);
      // We're not writing to localStorage here anymore, as it's handled in LanguageContext
    }
  }, [language, isMounted, initialLoad]);
  
  return (
    <>
      <DynamicTitleUpdater />
      <div style={{ display: 'none', 'data-debug': 'true' }}>
        Current language: {language} | Mounted: {isMounted.toString()}
      </div>
      {children}
    </>
  );
};

export default ClientWrapper;
