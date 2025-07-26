'use client';

import { useEffect } from 'react';
import { useLanguage, getText } from '@/context/LanguageContext';

export default function SeoHead({ seoData }) {
  const { language } = useLanguage();

  useEffect(() => {
    if (seoData) {
      // Update title
      document.title = getText(seoData.pageTitle, language, 'Latek Mimarlık');
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', getText(seoData.metaDescription, language, ''));
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.setAttribute('name', 'description');
        newMetaDescription.setAttribute('content', getText(seoData.metaDescription, language, ''));
        document.head.appendChild(newMetaDescription);
      }
      
      // Update keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', getText(seoData.keywords, language, ''));
      } else {
        const newMetaKeywords = document.createElement('meta');
        newMetaKeywords.setAttribute('name', 'keywords');
        newMetaKeywords.setAttribute('content', getText(seoData.keywords, language, ''));
        document.head.appendChild(newMetaKeywords);
      }
      
      // Add language direction for RTL support
      const htmlElement = document.documentElement;
      if (language === 'ar') {
        htmlElement.setAttribute('dir', 'rtl');
      } else {
        htmlElement.setAttribute('dir', 'ltr');
      }
      
      // Set language attribute on html tag
      htmlElement.setAttribute('lang', language);
    }
  }, [seoData, language]);

  return null;
}
