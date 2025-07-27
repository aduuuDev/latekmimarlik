'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import FileUploader from '@/components/FileUploader';
import styles from '../page.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPageEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, languages } = useLanguage();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeSection, setActiveSection] = useState('heroBanner');
  const [activeLanguage, setActiveLanguage] = useState(language);

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Servisler sayfası verilerini çek
  useEffect(() => {
    if (status === 'authenticated') {
      fetchServicesPageData();
    }
  }, [status]);

  const fetchServicesPageData = async () => {
    try {
      const response = await fetch('/api/admin/services-page');
      const result = await response.json();
      
      if (result.success && result.data) {
        setPageData(result.data);
      } else {
        // Boş veri yapısı oluştur
        setPageData({
          heroBanner: {
            title: {},
            subtitle: {},
            backgroundImage: ''
          },
          contentSection: {
            title: {},
            subtitle: {},
            description: {}
          },
          seo: {
            pageTitle: {},
            metaDescription: {},
            keywords: {}
          }
        });
      }
    } catch (error) {
      console.error('Servisler sayfası verileri çekilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ text: '', type: '' });
      
      const response = await fetch('/api/admin/services-page', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: 'Değişiklikler başarıyla kaydedildi', type: 'success' });
      } else {
        setMessage({ text: `Hata: ${result.message || 'Bir sorun oluştu'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Kaydetme sırasında hata:', error);
      setMessage({ text: 'Kaydetme sırasında bir hata oluştu', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section, field, lang, value) => {
    setPageData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      
      // Eğer nested bir alan değilse
      if (!newData[section][field]) {
        newData[section][field] = {};
      }
      
      // Multi-language alan güncelleme
      if (lang) {
        if (!newData[section][field][lang]) {
          newData[section][field][lang] = '';
        }
        newData[section][field][lang] = value;
      } 
      // Normal alan güncelleme
      else {
        newData[section][field] = value;
      }
      
      return newData;
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.contentHeader}>
        <h1>Servisler Sayfası Düzenleme</h1>
        <div className={styles.headerButtons}>
          <button 
            className={styles.saveButton}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
      
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      <div className={styles.editorContainer}>
        <div className={styles.sectionTabs}>
          <button 
            className={activeSection === 'heroBanner' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('heroBanner')}
          >
            Banner Alanı
          </button>
          <button 
            className={activeSection === 'contentSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('contentSection')}
          >
            İçerik Alanı
          </button>
          <button 
            className={activeSection === 'seo' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('seo')}
          >
            SEO Ayarları
          </button>
        </div>
        
        <div className={styles.sectionContent}>
          {/* Banner Alanı */}
          {activeSection === 'heroBanner' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>Başlık</label>
                    <input 
                      type="text"
                      value={pageData?.heroBanner?.title?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('heroBanner', 'title', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Alt Başlık</label>
                    <input 
                      type="text"
                      value={pageData?.heroBanner?.subtitle?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('heroBanner', 'subtitle', activeLanguage, e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Arka Plan Görsel URL</label>
                <div className={styles.inputGroup}>
                  <input 
                    type="text"
                    value={pageData?.heroBanner?.backgroundImage || ''}
                    onChange={(e) => handleInputChange('heroBanner', 'backgroundImage', null, e.target.value)}
                    placeholder="/img/hero-bg.jpg"
                    className={styles.urlInput}
                  />
                  <button 
                    type="button" 
                    className={styles.browseButton}
                    onClick={() => document.getElementById('bannerImageUploader').click()}
                  >
                    Dosya Seç
                  </button>
                </div>
                <div className={styles.uploaderContainer}>
                  <FileUploader
                    id="bannerImageUploader"
                    folder="img/services"
                    label="Banner Görseli Yükle"
                    onUpload={(data) => {
                      handleInputChange('heroBanner', 'backgroundImage', null, data.filePath);
                    }}
                    maxSize={5}
                  />
                </div>
              </div>
              
              {pageData?.heroBanner?.backgroundImage && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={pageData.heroBanner.backgroundImage}
                    alt="Banner önizleme"
                    width={400}
                    height={200}
                    style={{ maxWidth: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </>
          )}
          
          {/* İçerik Alanı */}
          {activeSection === 'contentSection' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>Başlık</label>
                    <input 
                      type="text"
                      value={pageData?.contentSection?.title?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('contentSection', 'title', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Alt Başlık</label>
                    <input 
                      type="text"
                      value={pageData?.contentSection?.subtitle?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('contentSection', 'subtitle', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Açıklama</label>
                    <textarea 
                      value={pageData?.contentSection?.description?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('contentSection', 'description', activeLanguage, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* SEO Ayarları */}
          {activeSection === 'seo' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>Sayfa Başlığı</label>
                    <input 
                      type="text"
                      value={pageData?.seo?.pageTitle?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('seo', 'pageTitle', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Meta Açıklama</label>
                    <textarea 
                      value={pageData?.seo?.metaDescription?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('seo', 'metaDescription', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Anahtar Kelimeler (virgülle ayırın)</label>
                    <textarea 
                      value={pageData?.seo?.keywords?.[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('seo', 'keywords', activeLanguage, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
