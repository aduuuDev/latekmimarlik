'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import styles from '../page.module.css';

export default function HomepageEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [homepageData, setHomepageData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeSection, setActiveSection] = useState('heroBanner');

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Anasayfa verilerini ve dilleri çek
  useEffect(() => {
    if (status === 'authenticated') {
      fetchHomepageData();
      fetchLanguages();
    }
  }, [status]);
  
  // Aktif dilleri getir
  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/admin/languages');
      const result = await response.json();
      
      if (result.success && result.data) {
        // Sadece aktif dilleri ve sıralı bir şekilde al
        const activeLanguages = result.data
          .filter(lang => lang.isActive)
          .sort((a, b) => a.order - b.order);
        
        setLanguages(activeLanguages);
      }
    } catch (error) {
      console.error('Dil verileri çekilirken hata:', error);
    }
  };

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/homepage');
      const result = await response.json();
      
      if (result.success) {
        setHomepageData(result.data);
      } else {
        setMessage({ text: result.message || 'Veriler alınamadı', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Veriler çekilirken bir hata oluştu', type: 'error' });
      console.error('Anasayfa verisi çekilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setHomepageData(prevData => {
      // Clone previous data to avoid direct mutation
      const newData = { ...prevData };
      
      // Make sure section exists
      if (!newData[section]) {
        newData[section] = {};
      }
      
      // Update the field within the section
      newData[section] = {
        ...newData[section],
        [field]: value
      };
      
      return newData;
    });
  };

  const handleArrayItemChange = (section, arrayName, index, field, value) => {
    setHomepageData(prevData => {
      const updatedArray = [...prevData[section][arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          [arrayName]: updatedArray
        }
      };
    });
  };

  const addArrayItem = (section, arrayName, emptyItem) => {
    setHomepageData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [arrayName]: [...(prevData[section][arrayName] || []), emptyItem]
      }
    }));
  };

  const removeArrayItem = (section, arrayName, index) => {
    setHomepageData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [arrayName]: prevData[section][arrayName].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homepageData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: 'Anasayfa içeriği başarıyla güncellendi', type: 'success' });
      } else {
        setMessage({ text: result.message || 'İçerik güncellenemedi', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'İçerik güncellenirken bir hata oluştu', type: 'error' });
      console.error('İçerik güncelleme hatası:', error);
    } finally {
      setSaving(false);
    }
  };

  // Yükleniyor durumu
  if (loading || status === 'loading') {
    return (
      <AdminLayout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }

  // Oturum yoksa boş göster
  if (!session) {
    return null;
  }

  return (
    <AdminLayout>
      <div className={styles.contentHeader}>
        <h1>Anasayfa İçerik Düzenleme</h1>
        <button 
          onClick={handleSubmit} 
          className={styles.saveButton} 
          disabled={saving}
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
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
            Hero Banner
          </button>
          <button
            className={activeSection === 'numbersSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('numbersSection')}
          >
            Numbers
          </button>
          <button
            className={activeSection === 'servicesSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('servicesSection')}
          >
            Services
          </button>
          <button
            className={activeSection === 'projectsSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('projectsSection')}
          >
            Projects
          </button>
          <button
            className={activeSection === 'blogSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('blogSection')}
          >
            Blog
          </button>
          <button
            className={activeSection === 'contactSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('contactSection')}
          >
            Contact
          </button>
          <button
            className={activeSection === 'seo' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('seo')}
          >
            SEO
          </button>
        </div>
        
        <div className={styles.sectionContent}>
          {/* Hero Banner Section */}
          {activeSection === 'heroBanner' && homepageData?.heroBanner && (
            <div>
              <h2>Hero Banner Section</h2>
              <div className={styles.formGroup}>
                <label>Subtitle:</label>
                <div className={styles.languageTabs}>
                  {languages.length > 0 ? (
                    languages.map((lang) => (
                      <div 
                        key={lang.code} 
                        className={`${styles.langTab} ${lang.rtl ? styles.rtlLangTab : ''}`}
                      >
                        <label>{lang.nativeName}:</label>
                        <input
                          type="text"
                          value={homepageData.heroBanner.subtitle?.[lang.code] || ''}
                          onChange={(e) => {
                            const newValue = {
                              ...(homepageData.heroBanner.subtitle || {}),
                              [lang.code]: e.target.value
                            };
                            handleInputChange('heroBanner', 'subtitle', newValue);
                          }}
                          placeholder={`${lang.nativeName} alt başlık`}
                          dir={lang.rtl ? 'rtl' : 'ltr'}
                        />
                      </div>
                    ))
                  ) : (
                    // Fallback - eğer dil verisi yüklenmediyse veya yoksa varsayılan dilleri göster
                    <>
                      <div className={styles.langTab}>
                        <label>Türkçe:</label>
                        <input
                          type="text"
                          value={homepageData.heroBanner.subtitle?.tr || ''}
                          onChange={(e) => {
                            const newValue = {...(homepageData.heroBanner.subtitle || {}), tr: e.target.value};
                            handleInputChange('heroBanner', 'subtitle', newValue);
                          }}
                          placeholder="Türkçe alt başlık"
                        />
                      </div>
                      <div className={styles.langTab}>
                        <label>English:</label>
                        <input
                          type="text"
                          value={homepageData.heroBanner.subtitle?.en || ''}
                          onChange={(e) => {
                            const newValue = {...(homepageData.heroBanner.subtitle || {}), en: e.target.value};
                            handleInputChange('heroBanner', 'subtitle', newValue);
                          }}
                          placeholder="English subtitle"
                        />
                      </div>
                      <div className={styles.langTab}>
                        <label>Deutsch:</label>
                        <input
                          type="text"
                          value={homepageData.heroBanner.subtitle?.de || ''}
                          onChange={(e) => {
                            const newValue = {...(homepageData.heroBanner.subtitle || {}), de: e.target.value};
                            handleInputChange('heroBanner', 'subtitle', newValue);
                          }}
                          placeholder="Deutsch Untertitel"
                        />
                      </div>
                      <div className={styles.langTab}>
                        <label>العربية:</label>
                        <input
                          type="text"
                          value={homepageData.heroBanner.subtitle?.ar || ''}
                          onChange={(e) => {
                            const newValue = {...(homepageData.heroBanner.subtitle || {}), ar: e.target.value};
                            handleInputChange('heroBanner', 'subtitle', newValue);
                          }}
                          placeholder="العنوان الفرعي بالعربية"
                          dir="rtl"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.title?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.title || {}), tr: e.target.value};
                        handleInputChange('heroBanner', 'title', newValue);
                      }}
                      placeholder="Türkçe başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.title?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.title || {}), en: e.target.value};
                        handleInputChange('heroBanner', 'title', newValue);
                      }}
                      placeholder="English title"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.title?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.title || {}), de: e.target.value};
                        handleInputChange('heroBanner', 'title', newValue);
                      }}
                      placeholder="Deutsch Titel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.title?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.title || {}), ar: e.target.value};
                        handleInputChange('heroBanner', 'title', newValue);
                      }}
                      placeholder="العنوان بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Button Text:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.buttonText?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.buttonText || {}), tr: e.target.value};
                        handleInputChange('heroBanner', 'buttonText', newValue);
                      }}
                      placeholder="Türkçe buton metni"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.buttonText?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.buttonText || {}), en: e.target.value};
                        handleInputChange('heroBanner', 'buttonText', newValue);
                      }}
                      placeholder="English button text"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.buttonText?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.buttonText || {}), de: e.target.value};
                        handleInputChange('heroBanner', 'buttonText', newValue);
                      }}
                      placeholder="Deutsch Schaltflächentext"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.heroBanner.buttonText?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.heroBanner.buttonText || {}), ar: e.target.value};
                        handleInputChange('heroBanner', 'buttonText', newValue);
                      }}
                      placeholder="نص الزر بالعربية"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Button Link:</label>
                <input
                  type="text"
                  value={homepageData.heroBanner.buttonLink || ''}
                  onChange={(e) => handleInputChange('heroBanner', 'buttonLink', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Background Image URL:</label>
                <input
                  type="text"
                  value={homepageData.heroBanner.backgroundImage || ''}
                  onChange={(e) => handleInputChange('heroBanner', 'backgroundImage', e.target.value)}
                />
              </div>
              {homepageData.heroBanner.backgroundImage && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={homepageData.heroBanner.backgroundImage} 
                    alt="Background Preview" 
                    width={600} 
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Numbers Section */}
          {activeSection === 'numbersSection' && homepageData?.numbersSection && (
            <div>
              <h2>Numbers Section</h2>
              <div className={styles.formGroup}>
                <label>Subtitle:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.numbersSection.subtitle?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.subtitle || {}), tr: e.target.value};
                        handleInputChange('numbersSection', 'subtitle', newValue);
                      }}
                      placeholder="Türkçe alt başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.numbersSection.subtitle?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.subtitle || {}), en: e.target.value};
                        handleInputChange('numbersSection', 'subtitle', newValue);
                      }}
                      placeholder="English subtitle"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.numbersSection.subtitle?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.subtitle || {}), de: e.target.value};
                        handleInputChange('numbersSection', 'subtitle', newValue);
                      }}
                      placeholder="Deutsch Untertitel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.numbersSection.subtitle?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.subtitle || {}), ar: e.target.value};
                        handleInputChange('numbersSection', 'subtitle', newValue);
                      }}
                      placeholder="العنوان الفرعي بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <textarea
                      value={homepageData.numbersSection.title?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.title || {}), tr: e.target.value};
                        handleInputChange('numbersSection', 'title', newValue);
                      }}
                      rows="3"
                      placeholder="Her satır için yeni bir satır ekleyin"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <textarea
                      value={homepageData.numbersSection.title?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.title || {}), en: e.target.value};
                        handleInputChange('numbersSection', 'title', newValue);
                      }}
                      rows="3"
                      placeholder="Add a new line for each line"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <textarea
                      value={homepageData.numbersSection.title?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.title || {}), de: e.target.value};
                        handleInputChange('numbersSection', 'title', newValue);
                      }}
                      rows="3"
                      placeholder="Fügen Sie für jede Zeile eine neue Zeile hinzu"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <textarea
                      value={homepageData.numbersSection.title?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.title || {}), ar: e.target.value};
                        handleInputChange('numbersSection', 'title', newValue);
                      }}
                      rows="3"
                      placeholder="أضف سطرًا جديدًا لكل سطر"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Content:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <textarea
                      value={homepageData.numbersSection.content?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.content || {}), tr: e.target.value};
                        handleInputChange('numbersSection', 'content', newValue);
                      }}
                      rows="6"
                      placeholder="Türkçe içerik"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <textarea
                      value={homepageData.numbersSection.content?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.content || {}), en: e.target.value};
                        handleInputChange('numbersSection', 'content', newValue);
                      }}
                      rows="6"
                      placeholder="English content"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <textarea
                      value={homepageData.numbersSection.content?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.content || {}), de: e.target.value};
                        handleInputChange('numbersSection', 'content', newValue);
                      }}
                      rows="6"
                      placeholder="Deutsch Inhalt"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <textarea
                      value={homepageData.numbersSection.content?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.numbersSection.content || {}), ar: e.target.value};
                        handleInputChange('numbersSection', 'content', newValue);
                      }}
                      rows="6"
                      placeholder="المحتوى العربي"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Image URL:</label>
                <input
                  type="text"
                  value={homepageData.numbersSection.image || ''}
                  onChange={(e) => handleInputChange('numbersSection', 'image', e.target.value)}
                />
              </div>
              {homepageData.numbersSection.image && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={homepageData.numbersSection.image} 
                    alt="Image Preview" 
                    width={600} 
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Services Section */}
          {activeSection === 'servicesSection' && homepageData?.servicesSection && (
            <div>
              <h2>Services Section</h2>
              <div className={styles.formGroup}>
                <label>Subtitle:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.subtitle?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.subtitle || {}), tr: e.target.value};
                        handleInputChange('servicesSection', 'subtitle', newValue);
                      }}
                      placeholder="Türkçe alt başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.subtitle?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.subtitle || {}), en: e.target.value};
                        handleInputChange('servicesSection', 'subtitle', newValue);
                      }}
                      placeholder="English subtitle"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.subtitle?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.subtitle || {}), de: e.target.value};
                        handleInputChange('servicesSection', 'subtitle', newValue);
                      }}
                      placeholder="Deutsch Untertitel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.subtitle?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.subtitle || {}), ar: e.target.value};
                        handleInputChange('servicesSection', 'subtitle', newValue);
                      }}
                      placeholder="العنوان الفرعي بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.title?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.title || {}), tr: e.target.value};
                        handleInputChange('servicesSection', 'title', newValue);
                      }}
                      placeholder="Türkçe başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.title?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.title || {}), en: e.target.value};
                        handleInputChange('servicesSection', 'title', newValue);
                      }}
                      placeholder="English title"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.title?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.title || {}), de: e.target.value};
                        handleInputChange('servicesSection', 'title', newValue);
                      }}
                      placeholder="Deutsch Titel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.title?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.title || {}), ar: e.target.value};
                        handleInputChange('servicesSection', 'title', newValue);
                      }}
                      placeholder="العنوان بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Button Text:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.buttonText?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.buttonText || {}), tr: e.target.value};
                        handleInputChange('servicesSection', 'buttonText', newValue);
                      }}
                      placeholder="Türkçe buton metni"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.buttonText?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.buttonText || {}), en: e.target.value};
                        handleInputChange('servicesSection', 'buttonText', newValue);
                      }}
                      placeholder="English button text"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.buttonText?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.buttonText || {}), de: e.target.value};
                        handleInputChange('servicesSection', 'buttonText', newValue);
                      }}
                      placeholder="Deutsch Schaltflächentext"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.servicesSection.buttonText?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.servicesSection.buttonText || {}), ar: e.target.value};
                        handleInputChange('servicesSection', 'buttonText', newValue);
                      }}
                      placeholder="نص الزر بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Button Link:</label>
                <input
                  type="text"
                  value={homepageData.servicesSection.buttonLink || ''}
                  onChange={(e) => handleInputChange('servicesSection', 'buttonLink', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Background Image URL:</label>
                <input
                  type="text"
                  value={homepageData.servicesSection.backgroundImage || ''}
                  onChange={(e) => handleInputChange('servicesSection', 'backgroundImage', e.target.value)}
                />
              </div>
              {homepageData.servicesSection.backgroundImage && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={homepageData.servicesSection.backgroundImage} 
                    alt="Background Preview" 
                    width={600} 
                    height={150}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Projects Section */}
          {activeSection === 'projectsSection' && homepageData?.projectsSection && (
            <div>
              <h2>Projects Section</h2>
              <div className={styles.formGroup}>
                <label>Subtitle:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.subtitle?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.subtitle || {}), tr: e.target.value};
                        handleInputChange('projectsSection', 'subtitle', newValue);
                      }}
                      placeholder="Türkçe alt başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.subtitle?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.subtitle || {}), en: e.target.value};
                        handleInputChange('projectsSection', 'subtitle', newValue);
                      }}
                      placeholder="English subtitle"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.subtitle?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.subtitle || {}), de: e.target.value};
                        handleInputChange('projectsSection', 'subtitle', newValue);
                      }}
                      placeholder="Deutsch Untertitel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.subtitle?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.subtitle || {}), ar: e.target.value};
                        handleInputChange('projectsSection', 'subtitle', newValue);
                      }}
                      placeholder="العنوان الفرعي بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.title?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.title || {}), tr: e.target.value};
                        handleInputChange('projectsSection', 'title', newValue);
                      }}
                      placeholder="Türkçe başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.title?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.title || {}), en: e.target.value};
                        handleInputChange('projectsSection', 'title', newValue);
                      }}
                      placeholder="English title"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.title?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.title || {}), de: e.target.value};
                        handleInputChange('projectsSection', 'title', newValue);
                      }}
                      placeholder="Deutsch Titel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.title?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.title || {}), ar: e.target.value};
                        handleInputChange('projectsSection', 'title', newValue);
                      }}
                      placeholder="العنوان بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Button Text:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.buttonText?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.buttonText || {}), tr: e.target.value};
                        handleInputChange('projectsSection', 'buttonText', newValue);
                      }}
                      placeholder="Türkçe buton metni"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.buttonText?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.buttonText || {}), en: e.target.value};
                        handleInputChange('projectsSection', 'buttonText', newValue);
                      }}
                      placeholder="English button text"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.buttonText?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.buttonText || {}), de: e.target.value};
                        handleInputChange('projectsSection', 'buttonText', newValue);
                      }}
                      placeholder="Deutsch Schaltflächentext"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.projectsSection.buttonText?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.projectsSection.buttonText || {}), ar: e.target.value};
                        handleInputChange('projectsSection', 'buttonText', newValue);
                      }}
                      placeholder="نص الزر بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Button Link:</label>
                <input
                  type="text"
                  value={homepageData.projectsSection.buttonLink || ''}
                  onChange={(e) => handleInputChange('projectsSection', 'buttonLink', e.target.value)}
                />
              </div>
            </div>
          )}
          
          {/* Blog Section */}
          {activeSection === 'blogSection' && homepageData?.blogSection && (
            <div>
              <h2>Blog Section</h2>
              <div className={styles.formGroup}>
                <label>Subtitle:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.subtitle?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.subtitle || {}), tr: e.target.value};
                        handleInputChange('blogSection', 'subtitle', newValue);
                      }}
                      placeholder="Türkçe alt başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.subtitle?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.subtitle || {}), en: e.target.value};
                        handleInputChange('blogSection', 'subtitle', newValue);
                      }}
                      placeholder="English subtitle"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.subtitle?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.subtitle || {}), de: e.target.value};
                        handleInputChange('blogSection', 'subtitle', newValue);
                      }}
                      placeholder="Deutsch Untertitel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.subtitle?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.subtitle || {}), ar: e.target.value};
                        handleInputChange('blogSection', 'subtitle', newValue);
                      }}
                      placeholder="العنوان الفرعي بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.title?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.title || {}), tr: e.target.value};
                        handleInputChange('blogSection', 'title', newValue);
                      }}
                      placeholder="Türkçe başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.title?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.title || {}), en: e.target.value};
                        handleInputChange('blogSection', 'title', newValue);
                      }}
                      placeholder="English title"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.title?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.title || {}), de: e.target.value};
                        handleInputChange('blogSection', 'title', newValue);
                      }}
                      placeholder="Deutsch Titel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.blogSection.title?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.blogSection.title || {}), ar: e.target.value};
                        handleInputChange('blogSection', 'title', newValue);
                      }}
                      placeholder="العنوان بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Background Image URL:</label>
                <input
                  type="text"
                  value={homepageData.blogSection.backgroundImage || ''}
                  onChange={(e) => handleInputChange('blogSection', 'backgroundImage', e.target.value)}
                />
              </div>
              {homepageData.blogSection.backgroundImage && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={homepageData.blogSection.backgroundImage} 
                    alt="Background Preview" 
                    width={600} 
                    height={150}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Contact Section */}
          {activeSection === 'contactSection' && homepageData?.contactSection && (
            <div>
              <h2>Contact Section</h2>
              <div className={styles.formGroup}>
                <label>Subtitle:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.subtitle?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.subtitle || {}), tr: e.target.value};
                        handleInputChange('contactSection', 'subtitle', newValue);
                      }}
                      placeholder="Türkçe alt başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.subtitle?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.subtitle || {}), en: e.target.value};
                        handleInputChange('contactSection', 'subtitle', newValue);
                      }}
                      placeholder="English subtitle"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.subtitle?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.subtitle || {}), de: e.target.value};
                        handleInputChange('contactSection', 'subtitle', newValue);
                      }}
                      placeholder="Deutsch Untertitel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.subtitle?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.subtitle || {}), ar: e.target.value};
                        handleInputChange('contactSection', 'subtitle', newValue);
                      }}
                      placeholder="العنوان الفرعي بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.title?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.title || {}), tr: e.target.value};
                        handleInputChange('contactSection', 'title', newValue);
                      }}
                      placeholder="Türkçe başlık"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.title?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.title || {}), en: e.target.value};
                        handleInputChange('contactSection', 'title', newValue);
                      }}
                      placeholder="English title"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.title?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.title || {}), de: e.target.value};
                        handleInputChange('contactSection', 'title', newValue);
                      }}
                      placeholder="Deutsch Titel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.contactSection.title?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.title || {}), ar: e.target.value};
                        handleInputChange('contactSection', 'title', newValue);
                      }}
                      placeholder="العنوان بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Description:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <textarea
                      value={homepageData.contactSection.description?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.description || {}), tr: e.target.value};
                        handleInputChange('contactSection', 'description', newValue);
                      }}
                      rows="4"
                      placeholder="Türkçe açıklama"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <textarea
                      value={homepageData.contactSection.description?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.description || {}), en: e.target.value};
                        handleInputChange('contactSection', 'description', newValue);
                      }}
                      rows="4"
                      placeholder="English description"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <textarea
                      value={homepageData.contactSection.description?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.description || {}), de: e.target.value};
                        handleInputChange('contactSection', 'description', newValue);
                      }}
                      rows="4"
                      placeholder="Deutsch Beschreibung"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <textarea
                      value={homepageData.contactSection.description?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.contactSection.description || {}), ar: e.target.value};
                        handleInputChange('contactSection', 'description', newValue);
                      }}
                      rows="4"
                      placeholder="الوصف بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              {/* Phone Section */}
              <div className={styles.subSection}>
                <div className={styles.subSectionHeader}>
                  <h3>Phone Information</h3>
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Title:</label>
                  <div className={styles.languageTabs}>
                    <div className={styles.langTab}>
                      <label>Türkçe:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.phoneTitle?.tr || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.phoneTitle || {}), tr: e.target.value};
                          handleInputChange('contactSection', 'phoneTitle', newValue);
                        }}
                        placeholder="Türkçe telefon başlığı"
                      />
                    </div>
                    <div className={styles.langTab}>
                      <label>English:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.phoneTitle?.en || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.phoneTitle || {}), en: e.target.value};
                          handleInputChange('contactSection', 'phoneTitle', newValue);
                        }}
                        placeholder="English phone title"
                      />
                    </div>
                    <div className={styles.langTab}>
                      <label>Deutsch:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.phoneTitle?.de || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.phoneTitle || {}), de: e.target.value};
                          handleInputChange('contactSection', 'phoneTitle', newValue);
                        }}
                        placeholder="Deutsch Telefontitel"
                      />
                    </div>
                    <div className={styles.langTab}>
                      <label>العربية:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.phoneTitle?.ar || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.phoneTitle || {}), ar: e.target.value};
                          handleInputChange('contactSection', 'phoneTitle', newValue);
                        }}
                        placeholder="عنوان الهاتف بالعربية"
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.arrayItems}>
                  <h4>Phone Numbers</h4>
                  {homepageData.contactSection.phones && homepageData.contactSection.phones.map((phone, index) => (
                    <div className={styles.arrayItem} key={index}>
                      <div className={styles.formGroup}>
                        <label>Phone Number:</label>
                        <input
                          type="text"
                          value={phone.number || ''}
                          onChange={(e) => handleArrayItemChange('contactSection', 'phones', index, 'number', e.target.value)}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Phone Link:</label>
                        <input
                          type="text"
                          value={phone.link || ''}
                          onChange={(e) => handleArrayItemChange('contactSection', 'phones', index, 'link', e.target.value)}
                        />
                      </div>
                      <button
                        className={styles.removeItemButton}
                        onClick={() => removeArrayItem('contactSection', 'phones', index)}
                      >
                        Kaldır
                      </button>
                    </div>
                  ))}
                  <button
                    className={styles.addItemButton}
                    onClick={() => addArrayItem('contactSection', 'phones', { number: '', link: '' })}
                  >
                    Telefon Ekle
                  </button>
                </div>
              </div>
              
              {/* Email Section */}
              <div className={styles.subSection}>
                <div className={styles.subSectionHeader}>
                  <h3>Email Information</h3>
                </div>
                <div className={styles.formGroup}>
                  <label>Email Title:</label>
                  <div className={styles.languageTabs}>
                    <div className={styles.langTab}>
                      <label>Türkçe:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.emailTitle?.tr || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.emailTitle || {}), tr: e.target.value};
                          handleInputChange('contactSection', 'emailTitle', newValue);
                        }}
                        placeholder="Türkçe e-posta başlığı"
                      />
                    </div>
                    <div className={styles.langTab}>
                      <label>English:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.emailTitle?.en || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.emailTitle || {}), en: e.target.value};
                          handleInputChange('contactSection', 'emailTitle', newValue);
                        }}
                        placeholder="English email title"
                      />
                    </div>
                    <div className={styles.langTab}>
                      <label>Deutsch:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.emailTitle?.de || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.emailTitle || {}), de: e.target.value};
                          handleInputChange('contactSection', 'emailTitle', newValue);
                        }}
                        placeholder="Deutsch E-Mail-Titel"
                      />
                    </div>
                    <div className={styles.langTab}>
                      <label>العربية:</label>
                      <input
                        type="text"
                        value={homepageData.contactSection.emailTitle?.ar || ''}
                        onChange={(e) => {
                          const newValue = {...(homepageData.contactSection.emailTitle || {}), ar: e.target.value};
                          handleInputChange('contactSection', 'emailTitle', newValue);
                        }}
                        placeholder="عنوان البريد الإلكتروني بالعربية"
                      />
                    </div>
                  </div>
                </div>
                
                <div className={styles.arrayItems}>
                  <h4>Email Addresses</h4>
                  {homepageData.contactSection.emails && homepageData.contactSection.emails.map((email, index) => (
                    <div className={styles.arrayItem} key={index}>
                      <div className={styles.formGroup}>
                        <label>Email Address:</label>
                        <input
                          type="email"
                          value={email.address || ''}
                          onChange={(e) => handleArrayItemChange('contactSection', 'emails', index, 'address', e.target.value)}
                        />
                      </div>
                      <button
                        className={styles.removeItemButton}
                        onClick={() => removeArrayItem('contactSection', 'emails', index)}
                      >
                        Kaldır
                      </button>
                    </div>
                  ))}
                  <button
                    className={styles.addItemButton}
                    onClick={() => addArrayItem('contactSection', 'emails', { address: '', link: '' })}
                  >
                    Email Ekle
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* SEO Section */}
          {activeSection === 'seo' && homepageData?.seo && (
            <div>
              <h2>SEO Settings</h2>
              <div className={styles.formGroup}>
                <label>Page Title:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.seo.pageTitle?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.pageTitle || {}), tr: e.target.value};
                        handleInputChange('seo', 'pageTitle', newValue);
                      }}
                      placeholder="Türkçe sayfa başlığı"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.seo.pageTitle?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.pageTitle || {}), en: e.target.value};
                        handleInputChange('seo', 'pageTitle', newValue);
                      }}
                      placeholder="English page title"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.seo.pageTitle?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.pageTitle || {}), de: e.target.value};
                        handleInputChange('seo', 'pageTitle', newValue);
                      }}
                      placeholder="Deutsch Seitentitel"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.seo.pageTitle?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.pageTitle || {}), ar: e.target.value};
                        handleInputChange('seo', 'pageTitle', newValue);
                      }}
                      placeholder="عنوان الصفحة بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Meta Description:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <textarea
                      value={homepageData.seo.metaDescription?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.metaDescription || {}), tr: e.target.value};
                        handleInputChange('seo', 'metaDescription', newValue);
                      }}
                      rows="3"
                      placeholder="Türkçe meta açıklaması"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <textarea
                      value={homepageData.seo.metaDescription?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.metaDescription || {}), en: e.target.value};
                        handleInputChange('seo', 'metaDescription', newValue);
                      }}
                      rows="3"
                      placeholder="English meta description"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <textarea
                      value={homepageData.seo.metaDescription?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.metaDescription || {}), de: e.target.value};
                        handleInputChange('seo', 'metaDescription', newValue);
                      }}
                      rows="3"
                      placeholder="Deutsch Meta-Beschreibung"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <textarea
                      value={homepageData.seo.metaDescription?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.metaDescription || {}), ar: e.target.value};
                        handleInputChange('seo', 'metaDescription', newValue);
                      }}
                      rows="3"
                      placeholder="وصف الميتا بالعربية"
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Keywords:</label>
                <div className={styles.languageTabs}>
                  <div className={styles.langTab}>
                    <label>Türkçe:</label>
                    <input
                      type="text"
                      value={homepageData.seo.keywords?.tr || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.keywords || {}), tr: e.target.value};
                        handleInputChange('seo', 'keywords', newValue);
                      }}
                      placeholder="Virgüllerle ayırarak girin"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>English:</label>
                    <input
                      type="text"
                      value={homepageData.seo.keywords?.en || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.keywords || {}), en: e.target.value};
                        handleInputChange('seo', 'keywords', newValue);
                      }}
                      placeholder="Separated by commas"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>Deutsch:</label>
                    <input
                      type="text"
                      value={homepageData.seo.keywords?.de || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.keywords || {}), de: e.target.value};
                        handleInputChange('seo', 'keywords', newValue);
                      }}
                      placeholder="Durch Kommas getrennt"
                    />
                  </div>
                  <div className={styles.langTab}>
                    <label>العربية:</label>
                    <input
                      type="text"
                      value={homepageData.seo.keywords?.ar || ''}
                      onChange={(e) => {
                        const newValue = {...(homepageData.seo.keywords || {}), ar: e.target.value};
                        handleInputChange('seo', 'keywords', newValue);
                      }}
                      placeholder="مفصولة بفواصل"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
