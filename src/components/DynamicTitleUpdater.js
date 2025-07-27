'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const DynamicTitleUpdater = () => {
  const pathname = usePathname(); // URL path'ini Next.js ile takip edelim
  const { language } = useLanguage(); // Dil Context'inden dili alalım
  const [mounted, setMounted] = useState(false);
  
  // Sayfanın yoluna göre ek başlık ekleyelim - useCallback ile wrap edelim
  const getPageSuffix = useCallback((lang) => {
    if (typeof window === 'undefined') return '';
    
    // Next.js'in pathname hook'unu kullanalım
    const path = pathname;
    
    // Dile göre sayfa soneklerini belirle
    const suffixes = {
      tr: {
        admin: ' - Admin Panel',
        home: ' - Anasayfa',
        projects: ' - Projeler',
        services: ' - Hizmetler',
        blog: ' - Blog',
        contact: ' - İletişim'
      },
      en: {
        admin: ' - Admin Panel',
        home: ' - Homepage',
        projects: ' - Projects',
        services: ' - Services',
        blog: ' - Blog',
        contact: ' - Contact'
      },
      de: {
        admin: ' - Admin Panel',
        home: ' - Startseite',
        projects: ' - Projekte',
        services: ' - Dienstleistungen',
        blog: ' - Blog',
        contact: ' - Kontakt'
      }
    };
    
    // Kullanılacak dil için sonekleri al, yoksa İngilizce kullan
    const langSuffixes = suffixes[lang] || suffixes.en;
    
    if (path.includes('/admin')) return langSuffixes.admin;
    if (path === '/') return langSuffixes.home;
    if (path.includes('/projects')) return langSuffixes.projects;
    if (path.includes('/services')) return langSuffixes.services;
    if (path.includes('/blog')) return langSuffixes.blog;
    if (path.includes('/contact')) return langSuffixes.contact;
    return '';
  }, [pathname]);
  
  // Component mount durumunu takip et
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Platform adını çek ve başlığı güncelle
  useEffect(() => {
    // Component mount olmadan çalışmasın
    if (!mounted || !language) return;
    
    console.log('Updating title - Language:', language, 'Path:', pathname);
    
    const fetchPlatformName = async () => {
      try {
        // Önbelleği aşmak için timestamp ekleyelim
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/platform?lang=${language}&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        
        const result = await response.json();
        console.log('Title update API response:', result);
        
        if (result.success && result.data?.name) {
          try {
            // Title elementini dinamik olarak güncelle
            const suffix = getPageSuffix(language);
            document.title = `${result.data.name}${suffix}`;
            console.log('Title updated to:', document.title, 'Language:', language, 'Path:', pathname);
          } catch (error) {
            console.error('Error updating document title:', error);
          }
        }
      } catch (error) {
        console.error("Platform bilgileri çekilemedi:", error);
      }
    };
    
    // Başlığı hemen güncelle
    fetchPlatformName();
    
  }, [language, pathname, mounted, getPageSuffix]);

  // Bu bileşen hiçbir şey render etmez, sadece document.title'ı günceller
  return null;
};

export default DynamicTitleUpdater;
