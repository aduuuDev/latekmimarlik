'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import FileUploader from '@/components/FileUploader';
import styles from './settings.module.css';
import './loadingStyle.css'; // Loading stil dosyası
import { useLanguage, getText } from '@/context/LanguageContext';

export default function SettingsManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, languages } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeLang, setActiveLang] = useState(language);
  const [activeTab, setActiveTab] = useState('platform'); // Aktif sekme: platform, header, footer, seo, vb.
  
  // Form state
  const [formData, setFormData] = useState({
    platformLogo: {
      light: "/img/logo.png",
      dark: "/img/home/logo-white.png"
    },
    platform: {
      name: {},
      contactEmail: "",
      contactPhone: "",
      address: {},
      social: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: ""
      }
    },
    footer: {
      platformName: {},
      banner: {
        imageUrl: "/img/home/ffa51a33625455.56b20f01c3608.jpg",
        altText: {}
      },
      description: {},
      contact: {
        title: {},
        phone: "",
        email: "",
        address: {}
      },
      copyright: {},
      socialLinks: []
    },
    // Header ayarları
    header: {
      sticky: true,
      transparent: true,
      logoPosition: "left", // left, center, right
      menuPosition: "right", // left, center, right
      showSearchIcon: true,
      showLanguageSelector: true,
      backgroundColor: "",
      textColor: ""
    },
    // Diğer ayar kategorileri buraya eklenebilir
    seo: {
      title: {},
      description: {},
      keywords: {}
    }
  });

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

    // Ayarları çek
  const fetchSettings = useCallback(async () => {
    try {
      // Platform Logo'yu çek
      const platformLogoResponse = await fetch('/api/admin/settings?type=platformLogo');
      const platformLogoResult = await platformLogoResponse.json();
      
      if (platformLogoResult.success && platformLogoResult.data) {
        const { light, dark } = platformLogoResult.data;
        setFormData(prev => ({
          ...prev,
          platformLogo: {
            light: light || '/img/logo.png',
            dark: dark || '/img/home/logo-white.png'
          }
        }));
      }
      
      // Platform ayarlarını çek
      try {
        const platformResponse = await fetch('/api/admin/settings?type=platformSettings');
        const platformResult = await platformResponse.json();
        
        if (platformResult.success && platformResult.data) {
          // data'nın içinde type hariç tüm özellikleri al
          const { type, _id, createdAt, updatedAt, __v, ...platformData } = platformResult.data;
          
          setFormData(prev => ({
            ...prev,
            platform: {
              name: platformData.platformName || {},
              contactEmail: platformData.contactEmail || '',
              contactPhone: platformData.contactPhone || '',
              address: platformData.address || {},
              social: platformData.social || {
                facebook: '',
                twitter: '',
                instagram: '',
                linkedin: '',
                youtube: ''
              }
            }
          }));
        }
      } catch (error) {
        console.error('Platform ayarları çekilirken hata:', error);
      }
      
      // Footer ayarlarını çek
      const footerResponse = await fetch('/api/admin/settings?type=footer');
      const footerResult = await footerResponse.json();
      
      if (footerResult.success && footerResult.data) {
        // data'nın içinde type hariç tüm özellikleri al
        const { type, _id, createdAt, updatedAt, __v, logo, ...footerData } = footerResult.data;
        
        setFormData(prev => ({
          ...prev,
          footer: footerData
        }));
      }
      
      // Header ayarlarını çek
      try {
        const headerResponse = await fetch('/api/admin/settings?type=header');
        const headerResult = await headerResponse.json();
        
        if (headerResult.success && headerResult.data) {
          // data'nın içinde type hariç tüm özellikleri al
          const { type, _id, createdAt, updatedAt, __v, ...headerData } = headerResult.data;
          setFormData(prev => ({
            ...prev,
            header: headerData
          }));
        }
      } catch (error) {
        console.error('Header ayarları çekilirken hata:', error);
      }
      
      // SEO ayarlarını çek
      try {
        const seoResponse = await fetch('/api/admin/settings?type=seo');
        const seoResult = await seoResponse.json();
        
        if (seoResult.success && seoResult.data) {
          // data'nın içinde type hariç tüm özellikleri al
          const { type, _id, createdAt, updatedAt, __v, ...seoData } = seoResult.data;
          setFormData(prev => ({
            ...prev,
            seo: seoData
          }));
        }
      } catch (error) {
        console.error('SEO ayarları çekilirken hata:', error);
      }
      
      // Burada diğer ayar kategorilerini de çekebilirsiniz
      // Örnek: sosyal medya, iletişim, vb.
      
    } catch (error) {
      console.error('Ayarlar çekilirken hata:', error);
      const errorMsg = getText({
        tr: 'Ayarlar çekilirken bir hata oluştu', 
        en: 'An error occurred while fetching settings'
      }, language, 'Ayarlar çekilirken bir hata oluştu');
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [language]);
  // Ayarları çek
  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings();
    }
  }, [status, fetchSettings]);
  


  // Form input değişikliklerini işle
  const handleInputChange = (section, field, lang, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      
      // Aktif kategoriye göre form verisini güncelle (footer, seo, vb.)
      if (section && field) {
        // Eğer çoklu dil alanı ise
        if (lang) {
          if (!newData[activeTab][section][field]) {
            newData[activeTab][section][field] = {};
          }
          newData[activeTab][section][field][lang] = value;
        } else {
          // Normal alan
          newData[activeTab][section][field] = value;
        }
      } else if (section) {
        // Direkt üst seviye alan için
        if (lang) {
          if (!newData[activeTab][section]) {
            newData[activeTab][section] = {};
          }
          newData[activeTab][section][lang] = value;
        } else {
          newData[activeTab][section] = value;
        }
      }
      
      // Değişiklik mesajını sıfırla
      setMessage({ text: '', type: '' });
      
      return newData;
    });
  };

  // Sosyal medya linkleri için fonksiyonlar
  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        socialLinks: [...(prev.footer.socialLinks || []), { icon: 'fa-facebook', url: 'https://' }]
      }
    }));
  };

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        socialLinks: prev.footer.socialLinks.filter((_, i) => i !== index)
      }
    }));
  };

  const updateSocialLink = (index, field, value) => {
    setFormData(prev => {
      const newLinks = [...prev.footer.socialLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prev,
        footer: {
          ...prev.footer,
          socialLinks: newLinks
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      setMessage({ text: '', type: '' });
      
      // Platform Logo'yu ayrıca kaydet
      try {
        const platformLogoResponse = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'platformLogo',
            data: formData.platformLogo
          })
        });
        
        const platformLogoResult = await platformLogoResponse.json();
        
        if (!platformLogoResult.success) {
          console.error('Platform logo kaydedilemedi:', platformLogoResult.message);
        }
      } catch (error) {
        console.error('Platform logo kaydedilirken hata:', error);
      }
      
      // Aktif sekmeye göre doğru veriyi gönder
      if (activeTab === 'platform') {
        console.log('Saving platform settings:', formData.platform);
        
        // Platform ayarlarını kaydet
        const platformData = {
          platformName: formData.platform.name || {}, // Burada platformName objesi doğru şekilde kaydediliyor
          contactEmail: formData.platform.contactEmail,
          contactPhone: formData.platform.contactPhone,
          address: formData.platform.address,
          social: formData.platform.social
        };
        
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'platformSettings',
            data: platformData
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          const successMsg = getText({
            tr: 'Platform ayarları başarıyla kaydedildi', 
            en: 'Platform settings saved successfully'
          }, language, 'Platform ayarları başarıyla kaydedildi');
          
          setMessage({ text: successMsg, type: 'success' });
        } else {
          const errorPrefix = getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:');
          const errorDefault = getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu');
          setMessage({ text: `${errorPrefix} ${result.message || errorDefault}`, type: 'error' });
        }
      }
      else if (activeTab === 'footer') {
        // Footer verilerine logoyu dahil et
        const footerData = { 
          ...formData.footer, 
          logo: formData.platformLogo 
        };
        
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'footer',
            data: footerData
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          const successMsg = getText({
            tr: 'Footer ayarları başarıyla kaydedildi', 
            en: 'Footer settings saved successfully'
          }, language, 'Footer ayarları başarıyla kaydedildi');
          
          setMessage({ text: successMsg, type: 'success' });
        } else {
          const errorPrefix = getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:');
          const errorDefault = getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu');
          setMessage({ text: `${errorPrefix} ${result.message || errorDefault}`, type: 'error' });
        }
      }
      // SEO ayarları için
      else if (activeTab === 'seo') {
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'seo',
            data: formData.seo
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          const successMsg = getText({
            tr: 'SEO ayarları başarıyla kaydedildi', 
            en: 'SEO settings saved successfully'
          }, language, 'SEO ayarları başarıyla kaydedildi');
          
          setMessage({ text: successMsg, type: 'success' });
        } else {
          const errorPrefix = getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:');
          const errorDefault = getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu');
          setMessage({ text: `${errorPrefix} ${result.message || errorDefault}`, type: 'error' });
        }
      }
      // Header ayarları için
      else if (activeTab === 'header') {
        // Header verilerine logoyu dahil et
        const headerData = {
          ...formData.header,
          logo: formData.platformLogo
        };
        
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'header',
            data: headerData
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          const successMsg = getText({
            tr: 'Header ayarları başarıyla kaydedildi', 
            en: 'Header settings saved successfully'
          }, language, 'Header ayarları başarıyla kaydedildi');
          
          setMessage({ text: successMsg, type: 'success' });
        } else {
          const errorPrefix = getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:');
          const errorDefault = getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu');
          setMessage({ text: `${errorPrefix} ${result.message || errorDefault}`, type: 'error' });
        }
      }
      // Diğer sekmelerin kayıt işlemleri buraya eklenebilir
      
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
      const errorMsg = getText({
        tr: 'Ayarlar kaydedilirken bir hata oluştu', 
        en: 'An error occurred while saving settings'
      }, language, 'Ayarlar kaydedilirken bir hata oluştu');
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">
          <div className="spinner"></div>
          <p>{getText({tr: 'Yükleniyor...', en: 'Loading...'}, language, 'Yükleniyor...')}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.contentHeader}>
          <h1>{getText({tr: 'Site Ayarları', en: 'Site Settings'}, language, 'Site Ayarları')}</h1>
          <p className={styles.subtitle}>{getText({tr: 'Web sitenizin görünümünü ve özelliklerini bu sayfadan düzenleyebilirsiniz.', en: 'You can customize the appearance and features of your website from this page.'}, language, 'Web sitenizin görünümünü ve özelliklerini bu sayfadan düzenleyebilirsiniz.')}</p>
        </div>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'platform' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('platform')}
        >
          {getText({tr: 'Platform', en: 'Platform'}, language, 'Platform')}
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'header' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('header')}
        >
          {getText({tr: 'Header', en: 'Header'}, language, 'Header')}
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'footer' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('footer')}
        >
          {getText({tr: 'Footer', en: 'Footer'}, language, 'Footer')}
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'seo' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          {getText({tr: 'SEO', en: 'SEO'}, language, 'SEO')}
        </button>
        {/* Diğer sekmeler buraya eklenebilir */}
      </div>
      
      {/* PLATFORM LOGO - Her sayfada görünür */}
      <div className={styles.platformLogoSection}>
        <div className={styles.sectionHeader}>
          <h3>{getText({tr: 'Platform Logosu', en: 'Platform Logo'}, language, 'Platform Logosu')}</h3>
          <p className={styles.sectionSubtitle}>
            {getText({
              tr: 'Bu logolar tüm site genelinde kullanılacaktır (header ve footer dahil)', 
              en: 'These logos will be used across the entire site (including header and footer)'
            }, language, 'Bu logolar tüm site genelinde kullanılacaktır')}
          </p>
        </div>
        
        <div className={styles.logoControls}>
          <div className={styles.formGroup}>
            <label>{getText({tr: 'Açık Logo (Koyu Arka Plan İçin)', en: 'Light Logo (For Dark Background)'}, language, 'Açık Logo')}</label>
            <div className={styles.inputGroup}>
              <input 
                type="text"
                value={formData.platformLogo?.light || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  platformLogo: {
                    ...prev.platformLogo,
                    light: e.target.value
                  }
                }))}
                placeholder="/img/logo-white.png"
                className={styles.urlInput}
              />
              <button 
                type="button" 
                className={styles.browseButton}
                onClick={() => document.getElementById('platformLogoLightUploader').click()}
              >
                {getText({tr: 'Dosya Seç', en: 'Choose File'}, language, 'Dosya Seç')}
              </button>
            </div>
            <div className={styles.uploaderContainer}>
              <FileUploader
                id="platformLogoLightUploader"
                folder="img"
                label={getText({tr: 'Açık Logo Yükle', en: 'Upload Light Logo'}, language, 'Açık Logo Yükle')}
                onUpload={(data) => {
                  setFormData(prev => ({
                    ...prev,
                    platformLogo: {
                      ...prev.platformLogo,
                      light: data.filePath
                    }
                  }));
                }}
                maxSize={2} // Logo için 2MB limit
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>{getText({tr: 'Koyu Logo (Açık Arka Plan İçin)', en: 'Dark Logo (For Light Background)'}, language, 'Koyu Logo')}</label>
            <div className={styles.inputGroup}>
              <input 
                type="text"
                value={formData.platformLogo?.dark || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  platformLogo: {
                    ...prev.platformLogo,
                    dark: e.target.value
                  }
                }))}
                placeholder="/img/logo.png"
                className={styles.urlInput}
              />
              <button 
                type="button" 
                className={styles.browseButton}
                onClick={() => document.getElementById('platformLogoDarkUploader').click()}
              >
                {getText({tr: 'Dosya Seç', en: 'Choose File'}, language, 'Dosya Seç')}
              </button>
            </div>
            <div className={styles.uploaderContainer}>
              <FileUploader
                id="platformLogoDarkUploader"
                folder="img"
                label={getText({tr: 'Koyu Logo Yükle', en: 'Upload Dark Logo'}, language, 'Koyu Logo Yükle')}
                onUpload={(data) => {
                  setFormData(prev => ({
                    ...prev,
                    platformLogo: {
                      ...prev.platformLogo,
                      dark: data.filePath
                    }
                  }));
                }}
                maxSize={2} // Logo için 2MB limit
              />
            </div>
          </div>
        </div>
        
        {/* Logo Önizleme */}
        <div className={styles.previewSection}>
          <div className={styles.previewItem}>
            <h4>{getText({tr: 'Açık Logo Önizleme', en: 'Light Logo Preview'}, language, 'Açık Logo Önizleme')}</h4>
            {formData.platformLogo?.light && (
              <div className={styles.imagePreview} style={{ backgroundColor: '#333', padding: '10px' }}>
                <Image 
                  src={formData.platformLogo.light}
                  alt="Açık logo önizleme"
                  width={150}
                  height={50}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
          </div>
          <div className={styles.previewItem}>
            <h4>{getText({tr: 'Koyu Logo Önizleme', en: 'Dark Logo Preview'}, language, 'Koyu Logo Önizleme')}</h4>
            {formData.platformLogo?.dark && (
              <div className={styles.imagePreview}>
                <Image 
                  src={formData.platformLogo.dark}
                  alt="Koyu logo önizleme"
                  width={150}
                  height={50}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* PLATFORM AYARLARI */}
          {activeTab === 'platform' && (
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Platform Ayarları', en: 'Platform Settings'}, language, 'Platform Ayarları')}</h3>
              </div>
              
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Platform Adı', en: 'Platform Name'}, activeLang, 'Platform Adı')}</label>
                    <input 
                      type="text"
                      value={formData.platform.name?.[activeLang] || ''}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = { ...prev };
                          if (!newData.platform.name) {
                            newData.platform.name = {};
                          }
                          newData.platform.name[activeLang] = e.target.value;
                          return newData;
                        });
                      }}
                      placeholder={getText({tr: 'Platform Adı', en: 'Platform Name'}, activeLang, 'Platform Adı')}
                    />
                  </div>
                </div>
              </div>
              
              {/* Platform Logo görselleştirme */}
              <div className={styles.platformLogoSection}>
                <div className={styles.sectionHeader}>
                  <h3>{getText({tr: 'Platform Logosu', en: 'Platform Logo'}, language, 'Platform Logosu')}</h3>
                </div>
                
                <div className={styles.logoControls}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Açık Logo (Koyu Arka Plan İçin)', en: 'Light Logo (For Dark Background)'}, language, 'Açık Logo')}</label>
                    <div className={styles.inputGroup}>
                      <input 
                        type="text"
                        value={formData.platformLogo?.light || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          platformLogo: {
                            ...prev.platformLogo,
                            light: e.target.value
                          }
                        }))}
                        placeholder="/img/logo-white.png"
                        className={styles.urlInput}
                      />
                      <FileUploader
                        id="platformLogoLightUploader"
                        folder="img"
                        label={getText({tr: 'Dosya Seç', en: 'Choose File'}, language, 'Dosya Seç')}
                        onUpload={(data) => {
                          setFormData(prev => ({
                            ...prev,
                            platformLogo: {
                              ...prev.platformLogo,
                              light: data.filePath
                            }
                          }));
                        }}
                        maxSize={2} // Logo için 2MB limit
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Koyu Logo (Açık Arka Plan İçin)', en: 'Dark Logo (For Light Background)'}, language, 'Koyu Logo')}</label>
                    <div className={styles.inputGroup}>
                      <input 
                        type="text"
                        value={formData.platformLogo?.dark || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          platformLogo: {
                            ...prev.platformLogo,
                            dark: e.target.value
                          }
                        }))}
                        placeholder="/img/logo.png"
                        className={styles.urlInput}
                      />
                      <FileUploader
                        id="platformLogoDarkUploader"
                        folder="img"
                        label={getText({tr: 'Dosya Seç', en: 'Choose File'}, language, 'Dosya Seç')}
                        onUpload={(data) => {
                          setFormData(prev => ({
                            ...prev,
                            platformLogo: {
                              ...prev.platformLogo,
                              dark: data.filePath
                            }
                          }));
                        }}
                        maxSize={2} // Logo için 2MB limit
                      />
                    </div>
                  </div>
                </div>
                
                {/* Logo Önizleme */}
                <div className={styles.previewSection}>
                  <div className={styles.previewItem}>
                    <h4>{getText({tr: 'Açık Logo Önizleme', en: 'Light Logo Preview'}, language, 'Açık Logo Önizleme')}</h4>
                    {formData.platformLogo?.light && (
                      <div className={styles.imagePreview} style={{ backgroundColor: '#333', padding: '10px' }}>
                        <Image 
                          src={formData.platformLogo.light}
                          alt="Açık logo önizleme"
                          width={150}
                          height={50}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className={styles.previewItem}>
                    <h4>{getText({tr: 'Koyu Logo Önizleme', en: 'Dark Logo Preview'}, language, 'Koyu Logo Önizleme')}</h4>
                    {formData.platformLogo?.dark && (
                      <div className={styles.imagePreview}>
                        <Image 
                          src={formData.platformLogo.dark}
                          alt="Koyu logo önizleme"
                          width={150}
                          height={50}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* İletişim Bilgileri */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'İletişim Bilgileri', en: 'Contact Information'}, language, 'İletişim Bilgileri')}</h3>
              </div>
              
              <div className={styles.formGroup}>
                <label>{getText({tr: 'E-posta', en: 'Email'}, language, 'E-posta')}</label>
                <input 
                  type="email"
                  value={formData.platform.contactEmail || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        contactEmail: e.target.value
                      }
                    }));
                  }}
                  placeholder="info@latekmimarlik.com"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>{getText({tr: 'Telefon', en: 'Phone'}, language, 'Telefon')}</label>
                <input 
                  type="text"
                  value={formData.platform.contactPhone || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        contactPhone: e.target.value
                      }
                    }));
                  }}
                  placeholder="+90 212 345 67 89"
                />
              </div>
              
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Adres', en: 'Address'}, activeLang, 'Adres')}</label>
                    <textarea 
                      rows={3}
                      value={formData.platform.address?.[activeLang] || ''}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = { ...prev };
                          if (!newData.platform.address) {
                            newData.platform.address = {};
                          }
                          newData.platform.address[activeLang] = e.target.value;
                          return newData;
                        });
                      }}
                      placeholder={getText({tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey'}, activeLang, 'Adres')}
                    />
                  </div>
                </div>
              </div>
              
              {/* Sosyal Medya */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Sosyal Medya', en: 'Social Media'}, language, 'Sosyal Medya')}</h3>
              </div>
              
              <div className={styles.formGroup}>
                <label>Facebook</label>
                <input 
                  type="text"
                  value={formData.platform.social?.facebook || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        social: {
                          ...prev.platform.social,
                          facebook: e.target.value
                        }
                      }
                    }));
                  }}
                  placeholder="https://facebook.com/latekmimarlik"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Twitter</label>
                <input 
                  type="text"
                  value={formData.platform.social?.twitter || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        social: {
                          ...prev.platform.social,
                          twitter: e.target.value
                        }
                      }
                    }));
                  }}
                  placeholder="https://twitter.com/latekmimarlik"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Instagram</label>
                <input 
                  type="text"
                  value={formData.platform.social?.instagram || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        social: {
                          ...prev.platform.social,
                          instagram: e.target.value
                        }
                      }
                    }));
                  }}
                  placeholder="https://instagram.com/latekmimarlik"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>LinkedIn</label>
                <input 
                  type="text"
                  value={formData.platform.social?.linkedin || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        social: {
                          ...prev.platform.social,
                          linkedin: e.target.value
                        }
                      }
                    }));
                  }}
                  placeholder="https://linkedin.com/company/latekmimarlik"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>YouTube</label>
                <input 
                  type="text"
                  value={formData.platform.social?.youtube || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      platform: {
                        ...prev.platform,
                        social: {
                          ...prev.platform.social,
                          youtube: e.target.value
                        }
                      }
                    }));
                  }}
                  placeholder="https://youtube.com/latekmimarlik"
                />
              </div>
            </div>
          )}
          
          {/* HEADER AYARLARI */}
          {activeTab === 'header' && (
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Header Ayarları', en: 'Header Settings'}, language, 'Header Ayarları')}</h3>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={formData.header?.sticky || false}
                    onChange={(e) => handleInputChange('sticky', null, null, e.target.checked)}
                  />
                  <span>{getText({tr: 'Yapışkan Header', en: 'Sticky Header'}, language, 'Yapışkan Header')}</span>
                </label>
                <small className={styles.helpText}>
                  {getText({
                    tr: 'Sayfayı aşağı kaydırdığınızda header sabit kalır', 
                    en: 'Header stays fixed when scrolling down'
                  }, language, 'Sayfayı aşağı kaydırdığınızda header sabit kalır')}
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={formData.header?.showLanguageSelector || false}
                    onChange={(e) => handleInputChange('showLanguageSelector', null, null, e.target.checked)}
                  />
                  <span>{getText({tr: 'Dil Seçimini Göster', en: 'Show Language Selector'}, language, 'Dil Seçimini Göster')}</span>
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>{getText({tr: 'Arkaplan Rengi', en: 'Background Color'}, language, 'Arkaplan Rengi')}</label>
                <div className={styles.colorInputGroup}>
                  <input 
                    type="color"
                    value={formData.header?.backgroundColor || '#ffffff'}
                    onChange={(e) => handleInputChange('backgroundColor', null, null, e.target.value)}
                    className={styles.colorPicker}
                  />
                  <input 
                    type="text"
                    value={formData.header?.backgroundColor || '#ffffff'}
                    onChange={(e) => handleInputChange('backgroundColor', null, null, e.target.value)}
                    placeholder="#ffffff"
                    className={styles.colorText}
                  />
                </div>
                <small className={styles.helpText}>
                  {getText({tr: 'Boş bırakılırsa varsayılan renk kullanılır', en: 'If left empty, default color will be used'}, language, 'Boş bırakılırsa varsayılan renk kullanılır')}
                </small>
              </div>

              <div className={styles.formGroup}>
                <label>{getText({tr: 'Yazı Rengi', en: 'Text Color'}, language, 'Yazı Rengi')}</label>
                <div className={styles.colorInputGroup}>
                  <input 
                    type="color"
                    value={formData.header?.textColor || '#333333'}
                    onChange={(e) => handleInputChange('textColor', null, null, e.target.value)}
                    className={styles.colorPicker}
                  />
                  <input 
                    type="text"
                    value={formData.header?.textColor || '#333333'}
                    onChange={(e) => handleInputChange('textColor', null, null, e.target.value)}
                    placeholder="#333333"
                    className={styles.colorText}
                  />
                </div>
                <small className={styles.helpText}>
                  {getText({tr: 'Boş bırakılırsa varsayılan renk kullanılır', en: 'If left empty, default color will be used'}, language, 'Boş bırakılırsa varsayılan renk kullanılır')}
                </small>
              </div>
              
              <div className={styles.previewCard}>
                <h4>{getText({tr: 'Önizleme', en: 'Preview'}, language, 'Önizleme')}</h4>
                <div 
                  className={styles.headerPreview}
                  style={{
                    backgroundColor: formData.header?.backgroundColor || 'transparent',
                    color: formData.header?.textColor || '#333',
                    justifyContent: formData.header?.logoPosition === 'center' ? 'center' : 
                              formData.header?.logoPosition === 'right' ? 'flex-end' : 'flex-start',
                    position: formData.header?.sticky ? 'sticky' : 'relative',
                    opacity: formData.header?.transparent ? 0.8 : 1
                  }}
                >
                  <div className={styles.headerLogoPreview}>
                    <div className={styles.logoPlaceholder}>LOGO</div>
                  </div>
                  <div className={styles.headerMenuPreview}
                    style={{
                      justifyContent: formData.header?.menuPosition === 'center' ? 'center' : 
                                formData.header?.menuPosition === 'right' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div className={styles.menuItem}>Ana Sayfa</div>
                    <div className={styles.menuItem}>Hakkımızda</div>
                    <div className={styles.menuItem}>Projeler</div>
                    <div className={styles.menuItem}>İletişim</div>
                    {formData.header?.showSearchIcon && (
                      <div className={styles.menuIcon}>🔍</div>
                    )}
                    {formData.header?.showLanguageSelector && (
                      <div className={styles.menuIcon}>🌐</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOOTER AYARLARI */}
          {activeTab === 'footer' && (
            <div className={styles.sectionContent}>
              {/* Platform Bilgileri */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Platform Bilgileri', en: 'Platform Information'}, language, 'Platform Bilgileri')}</h3>
              </div>

              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Platform Adı', en: 'Platform Name'}, activeLang, 'Platform Adı')}</label>
                    <input 
                      type="text"
                      value={formData.footer.platformName?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('platformName', null, activeLang, e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Logo artık platformLogo bölümüne taşındı */}

              {/* Footer Banner */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Footer Banner', en: 'Footer Banner'}, language, 'Footer Banner')}</h3>
              </div>

              <div className={styles.formGroup}>
                <label>{getText({tr: 'Banner Resim URL', en: 'Banner Image URL'}, language, 'Banner Resim URL')}</label>
                <div className={styles.inputGroup}>
                  <input 
                    type="text"
                    value={formData.footer.banner?.imageUrl || ''}
                    onChange={(e) => handleInputChange('banner', 'imageUrl', null, e.target.value)}
                    placeholder="/img/home/footer-banner.jpg"
                    className={styles.urlInput}
                  />
                  <button 
                    type="button" 
                    className={styles.browseButton}
                    onClick={() => document.getElementById('bannerUploader').click()}
                  >
                    {getText({tr: 'Dosya Seç', en: 'Choose File'}, language, 'Dosya Seç')}
                  </button>
                </div>
                <div className={styles.uploaderContainer}>
                  <FileUploader
                    id="bannerUploader"
                    folder="img"
                    label={getText({tr: 'Banner Resmi Yükle', en: 'Upload Banner Image'}, language, 'Banner Resmi Yükle')}
                    onUpload={(data) => {
                      handleInputChange('banner', 'imageUrl', null, data.filePath);
                    }}
                    maxSize={5} // Banner için 5MB limit
                  />
                </div>
              </div>

              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Banner Alt Metni', en: 'Banner Alt Text'}, activeLang, 'Banner Alt Metni')}</label>
                    <input 
                      type="text"
                      value={formData.footer.banner?.altText?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('banner', 'altText', activeLang, e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Banner Önizleme */}
              {formData.footer.banner?.imageUrl && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={formData.footer.banner.imageUrl}
                    alt="Banner önizleme"
                    width={400}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Footer Açıklama */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Footer Açıklama', en: 'Footer Description'}, language, 'Footer Açıklama')}</h3>
              </div>

              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <textarea 
                      rows={5}
                      value={formData.footer.description?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('description', null, activeLang, e.target.value)}
                      placeholder={getText({
                        tr: 'Footer açıklaması buraya...', 
                        en: 'Footer description here...'
                      }, activeLang, 'Footer açıklaması...')}
                    />
                  </div>
                </div>
              </div>

              {/* İletişim Bilgileri */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'İletişim Bilgileri', en: 'Contact Information'}, language, 'İletişim Bilgileri')}</h3>
              </div>

              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'İletişim Başlık', en: 'Contact Title'}, activeLang, 'İletişim Başlık')}</label>
                    <input 
                      type="text"
                      value={formData.footer.contact?.title?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('contact', 'title', activeLang, e.target.value)}
                      placeholder={getText({tr: 'BİZE ULAŞIN', en: 'GET IN TOUCH'}, activeLang, 'BİZE ULAŞIN')}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{getText({tr: 'Telefon', en: 'Phone'}, language, 'Telefon')}</label>
                <input 
                  type="text"
                  value={formData.footer.contact?.phone || ''}
                  onChange={(e) => handleInputChange('contact', 'phone', null, e.target.value)}
                  placeholder="+90 212 345 67 89"
                />
              </div>

              <div className={styles.formGroup}>
                <label>{getText({tr: 'E-posta', en: 'Email'}, language, 'E-posta')}</label>
                <input 
                  type="email"
                  value={formData.footer.contact?.email || ''}
                  onChange={(e) => handleInputChange('contact', 'email', null, e.target.value)}
                  placeholder="info@example.com"
                />
              </div>

              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Adres', en: 'Address'}, activeLang, 'Adres')}</label>
                    <textarea 
                      rows={3}
                      value={formData.footer.contact?.address?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('contact', 'address', activeLang, e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Telif Hakkı */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Telif Hakkı', en: 'Copyright'}, language, 'Telif Hakkı')}</h3>
              </div>

              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Telif Hakkı Metni (boş bırakılırsa otomatik oluşturulur)', en: 'Copyright Text (will be generated automatically if left empty)'}, activeLang, 'Telif Hakkı Metni')}</label>
                    <input 
                      type="text"
                      value={formData.footer.copyright?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('copyright', null, activeLang, e.target.value)}
                      placeholder={`${formData.footer.platformName?.[activeLang] || 'LATEK'} © ${new Date().getFullYear()} ${activeLang === 'tr' ? 'TÜM HAKLARI SAKLIDIR' : 'ALL RIGHTS RESERVED'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Sosyal Medya Linkleri */}
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'Sosyal Medya Linkleri', en: 'Social Media Links'}, language, 'Sosyal Medya Linkleri')}</h3>
                <button 
                  type="button" 
                  className={styles.addButton}
                  onClick={addSocialLink}
                >
                  {getText({tr: 'Yeni Ekle', en: 'Add New'}, language, 'Yeni Ekle')}
                </button>
              </div>

              {formData.footer.socialLinks && formData.footer.socialLinks.length > 0 ? (
                <div className={styles.socialLinksContainer}>
                  {formData.footer.socialLinks.map((link, index) => (
                    <div key={index} className={styles.socialLinkItem}>
                      <div className={styles.formGroup}>
                        <label>{getText({tr: 'İkon Sınıfı', en: 'Icon Class'}, language, 'İkon Sınıfı')}</label>
                        <input 
                          type="text"
                          value={link.icon || ''}
                          onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                          placeholder="fa-facebook"
                        />
                        <small className={styles.helpText}>
                          {getText({
                            tr: 'Örnek: fa-facebook, fa-twitter, fa-instagram', 
                            en: 'Example: fa-facebook, fa-twitter, fa-instagram'
                          }, language, 'Örnek: fa-facebook')}
                        </small>
                      </div>
                      <div className={styles.formGroup}>
                        <label>{getText({tr: 'URL', en: 'URL'}, language, 'URL')}</label>
                        <input 
                          type="text"
                          value={link.url || ''}
                          onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                          placeholder="https://facebook.com/example"
                        />
                      </div>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => removeSocialLink(index)}
                      >
                        {getText({tr: 'Sil', en: 'Delete'}, language, 'Sil')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  {getText({
                    tr: 'Henüz sosyal medya linki eklenmemiş. "Yeni Ekle" butonuna tıklayarak ekleyebilirsiniz.', 
                    en: 'No social media links added yet. Click the "Add New" button to add one.'
                  }, language, 'Henüz sosyal medya linki eklenmemiş.')}
                </div>
              )}
            </div>
          )}

          {/* SEO AYARLARI */}
          {activeTab === 'seo' && (
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <h3>{getText({tr: 'SEO Ayarları', en: 'SEO Settings'}, language, 'SEO Ayarları')}</h3>
              </div>
              
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : ''}`}
                      onClick={() => setActiveLang(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Site Başlığı', en: 'Site Title'}, activeLang, 'Site Başlığı')}</label>
                    <input 
                      type="text"
                      value={formData.seo.title?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('title', null, activeLang, e.target.value)}
                      placeholder={getText({tr: 'Ana sayfa başlığı...', en: 'Homepage title...'}, activeLang, 'Ana sayfa başlığı...')}
                    />
                    <small className={styles.helpText}>
                      {getText({tr: 'Bu başlık, sayfanın browser sekmesinde ve arama sonuçlarında görünecektir.', en: 'This title will appear in the browser tab and search results.'}, language, 'Bu başlık, sayfanın browser sekmesinde ve arama sonuçlarında görünecektir.')}
                    </small>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Meta Açıklama', en: 'Meta Description'}, activeLang, 'Meta Açıklama')}</label>
                    <textarea 
                      rows={3}
                      value={formData.seo.description?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('description', null, activeLang, e.target.value)}
                      placeholder={getText({tr: 'Sitenizin kısa açıklaması...', en: 'Short description of your site...'}, activeLang, 'Sitenizin kısa açıklaması...')}
                    />
                    <small className={styles.helpText}>
                      {getText({tr: 'Bu açıklama arama motorlarında görünecektir. Maksimum 160 karakter olmalıdır.', en: 'This description will appear in search engines. It should be maximum 160 characters.'}, language, 'Bu açıklama arama motorlarında görünecektir. Maksimum 160 karakter olmalıdır.')}
                    </small>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Anahtar Kelimeler', en: 'Keywords'}, activeLang, 'Anahtar Kelimeler')}</label>
                    <input 
                      type="text"
                      value={formData.seo.keywords?.[activeLang] || ''}
                      onChange={(e) => handleInputChange('keywords', null, activeLang, e.target.value)}
                      placeholder={getText({tr: 'mimarlık, iç mimari, tasarım, proje', en: 'architecture, interior design, design, project'}, activeLang, 'mimarlık, iç mimari, tasarım, proje')}
                    />
                    <small className={styles.helpText}>
                      {getText({tr: 'Anahtar kelimeleri virgülle ayırın.', en: 'Separate keywords with commas.'}, language, 'Anahtar kelimeleri virgülle ayırın.')}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={saving}
            >
              {saving ? 
                getText({tr: 'Kaydediliyor...', en: 'Saving...'}, language, 'Kaydediliyor...') : 
                getText({tr: 'Kaydet', en: 'Save'}, language, 'Kaydet')}
            </button>
          </div>
        </form>
      </div>
      </div>
    </AdminLayout>
  );
}
