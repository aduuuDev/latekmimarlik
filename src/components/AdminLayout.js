'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage, getText } from '@/context/LanguageContext';
import styles from '../app/admin/page.module.css';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, changeLanguage, languages } = useLanguage();
  const [platformName, setPlatformName] = useState('Latek Mimarlık');
  
  // Debug için görünmez elemanları oluşturan fonksiyon
  const createDebugElements = () => {
    if (typeof document !== 'undefined') {
      if (!document.getElementById('currentLang')) {
        try {
          const langEl = document.createElement('div');
          langEl.id = 'currentLang';
          langEl.style.display = 'none';
          document.body.appendChild(langEl);
        } catch (error) {
          console.error('Error creating currentLang element:', error);
        }
      }
      
      if (!document.getElementById('platformNameDebug')) {
        try {
          const nameEl = document.createElement('div');
          nameEl.id = 'platformNameDebug';
          nameEl.style.display = 'none';
          document.body.appendChild(nameEl);
        } catch (error) {
          console.error('Error creating platformNameDebug element:', error);
        }
      }
    }
  };

  // Debug için görünmez elemanlar ekleyelim
  useEffect(() => {
    createDebugElements();
  }, []);
  
  // Platform adını API'den çek
  useEffect(() => {
    console.log('Language changed to:', language);
    
    // Dil değiştiğinde platform adını yeniden çekmek için bir fonksiyon
    const fetchPlatformName = async () => {
      try {
        // Önce debug elementlerini oluşturalım
        createDebugElements();
        
        // Güvenli bir şekilde textContent değiştirme
        const langElement = document.getElementById('currentLang');
        if (langElement) {
          langElement.textContent = `Current lang: ${language}`;
        }
        
        // Önbelleği aşmak için timestamp ekleyelim
        const timestamp = new Date().getTime();
        // cache: 'no-store' ekleyerek önbelleğe almayı engelleyelim
        const response = await fetch(`/api/platform?lang=${language}&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        
        const result = await response.json();
        console.log('Platform API response:', result);
        
        if (result.success && result.data?.name) {
          console.log('Setting platform name to:', result.data.name);
          // Durum değişkenini güncelleyelim
          setPlatformName(result.data.name);
          
          // Güvenli bir şekilde textContent değiştirme
          const nameElement = document.getElementById('platformNameDebug');
          if (nameElement) {
            nameElement.textContent = `Platform name: ${result.data.name}`;
          }
        }
      } catch (error) {
        console.error("Platform bilgileri çekilemedi:", error);
      }
    };
    
    // Fonksiyonu çağıralım
    fetchPlatformName();
  }, [language]);

  // Session kontrolü
  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>{getText({tr: 'Yükleniyor...', en: 'Loading...'}, language || 'tr', 'Yükleniyor...')}</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    // Client side redirect to login page
    if (typeof window !== 'undefined') {
      router.push('/auth/login');
    }
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/img/logo.png" alt={platformName} width={150} height={40} />
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            {platformName} - {language}
          </div>
        </div>
        <div className={styles.userInfo}>
          <span>{getText({tr: 'Hoş geldiniz', en: 'Welcome'}, language, 'Hoş geldiniz')}, {session?.user?.name}</span>
           <select 
            className={styles.languageSelect}
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
           >
            {languages.filter(lang => lang.isActive !== false).map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName || lang.name}
              </option>
            ))}
            </select>
          <button 
            className={styles.logoutButton}
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
          >
            {getText({tr: 'Çıkış Yap', en: 'Logout'}, language, 'Çıkış Yap')}
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li>
                <Link href="/admin" className={styles.link}>
                  {getText({tr: 'Gösterge Paneli', en: 'Dashboard'}, language, 'Dashboard')}
                </Link>
              </li>
              <li>
                <Link href="/admin/homepage" className={styles.link}>
                  {getText({tr: 'Anasayfa İçeriği', en: 'Homepage Content'}, language, 'Anasayfa İçeriği')}
                </Link>
              </li>
              <li>
                <Link href="/admin/projects" className={styles.link}>
                  {getText({tr: 'Projeler', en: 'Projects'}, language, 'Projeler')}
                </Link>
              </li>
              <li>
                <Link href="/admin/services" className={styles.link}>
                  {getText({tr: 'Hizmetler', en: 'Services'}, language, 'Hizmetler')}
                </Link>
              </li>
              <li>
                <Link href="/admin/services-page" className={styles.link}>
                  {getText({tr: 'Hizmetler Sayfası', en: 'Services Page'}, language, 'Hizmetler Sayfası')}
                </Link>
              </li>
              <li>
                <Link href="/admin/service-detail" className={styles.link}>
                  {getText({tr: 'Servis Detayı', en: 'Service Detail'}, language, 'Servis Detayı')}
                </Link>
              </li>
              <li>
                <Link href="/admin/blog" className={styles.link}>
                  {getText({tr: 'Blog', en: 'Blog'}, language, 'Blog')}
                </Link>
              </li>
              <li>
                <Link href="/admin/languages" className={styles.link}>
                  {getText({tr: 'Dil Yönetimi', en: 'Language Management'}, language, 'Dil Yönetimi')}
                </Link>
              </li>
              <li>
                <Link href="/admin/seed" className={styles.link}>
                  {getText({tr: 'Örnek Veriler', en: 'Dummy Data'}, language, 'Örnek Veriler')}
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className={styles.link}>
                  {getText({tr: 'Site Ayarları', en: 'Site Settings'}, language, 'Site Ayarları')}
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
