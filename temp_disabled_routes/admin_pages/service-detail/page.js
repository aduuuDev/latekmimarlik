'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import FileUploader from '@/components/FileUploader';
import styles from '../page.module.css';
import { useLanguage, getText } from '@/context/LanguageContext';

export default function ServiceDetailEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, languages } = useLanguage();
  
  // URL parametrelerinden servis ID'sini al
  const serviceId = searchParams.get('id');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeSection, setActiveSection] = useState('bannerSection');
  const [activeLanguage, setActiveLanguage] = useState(language);
  const [serviceTitle, setServiceTitle] = useState({});
  
  // Form state
  const [serviceDetail, setServiceDetail] = useState({
    bannerSection: {
      title: {}, // Multi-language
      subtitle: {}, // Multi-language
      backgroundImage: '' // Image path
    },
    contentSections: [
      {
        id: 'section1',
        type: 'textContent',
        title: {}, // Multi-language
        content: {}, // Multi-language
        featuredImage: '' // Featured image for content section
      }
    ],
    gallerySection: {
      images: []
    },
    callToAction: {
      text: {}, // Multi-language
      buttonText: {}, // Multi-language
      buttonLink: ''
    },
    seo: {
      pageTitle: {}, // Multi-language
      metaDescription: {}, // Multi-language
      keywords: {} // Multi-language
    }
  });
  
  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);
  
  // Servis detayı verisini çek
  const fetchServiceDetail = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/admin/services?id=${serviceId}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const service = result.data;
        
        // Servis başlığını kaydet (UI için)
        setServiceTitle(service.title || {});
        
        // Detay verilerini hazırla
        // Eğer detay içeriği doluysa, o verileri kullan
        // Yoksa varsayılan yapıyı oluştur
        
        // Banner için mevcut verileri al
        const bannerSection = {
          title: service.title || {},
          subtitle: service.detailContent?.subtitle || {},
          backgroundImage: service.detailContent?.bannerImage || service.detailContent?.featuredImage || ''
        };
        
        // İçerik bölümleri için HTML içeriğini parse et
        const contentSections = [];
        
        // Eğer detaylı içerik varsa, onları işle
        if (service.detailContent?.content && Object.keys(service.detailContent.content).length > 0) {
          // İlk içerik bölümünü ekle
          contentSections.push({
            id: 'mainContent',
            type: 'textContent',
            title: {},
            content: service.detailContent.content || {},
            featuredImage: service.detailContent?.featuredImage || ''
          });
        } else {
          // Varsayılan içerik bölümü
          contentSections.push({
            id: 'section1',
            type: 'textContent',
            title: {},
            content: {},
            featuredImage: ''
          });
        }
        
        // Galeri bölümü
        const gallerySection = {
          images: service.detailContent?.gallery || []
        };
        
        // CTA (Call to Action) bölümü
        const callToAction = {
          text: {},
          buttonText: {},
          buttonLink: '/contact-us'
        };
        
        // SEO bilgileri
        const seo = service.seo || {
          pageTitle: {},
          metaDescription: {},
          keywords: {}
        };
        
        // Tüm verileri bir araya getir
        setServiceDetail({
          bannerSection,
          contentSections,
          gallerySection,
          callToAction,
          seo
        });
        
      } else {
        setMessage({ 
          text: getText({
            tr: 'Servis detayları yüklenemedi',
            en: 'Failed to load service details'
          }, language, 'Servis detayları yüklenemedi'), 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Servis detay verileri çekilirken hata:', error);
      setMessage({ 
        text: getText({
          tr: 'Servis detay verileri çekilirken bir hata oluştu',
          en: 'An error occurred while fetching service detail data'
        }, language, 'Servis detay verileri çekilirken bir hata oluştu'), 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  }, [serviceId, language, setServiceTitle, setServiceDetail, setMessage, setLoading]);

  // Service verisi çekme
  useEffect(() => {
    if (status === 'authenticated' && serviceId) {
      fetchServiceDetail();
    } else if (status === 'authenticated') {
      // ID yoksa servis sayfasına yönlendir
      setLoading(false);
      setMessage({ 
        text: getText({
          tr: 'Düzenlemek için bir servis seçilmedi',
          en: 'No service selected for editing'
        }, language, 'Düzenlemek için bir servis seçilmedi'), 
        type: 'warning' 
      });
    }
  }, [status, serviceId, language, fetchServiceDetail]);
  

  
  // Form değişikliklerini kaydetme
  const handleSave = async () => {
    if (!serviceId) {
      setMessage({ 
        text: getText({
          tr: 'Güncellenecek servis belirtilmedi',
          en: 'No service specified for update'
        }, language, 'Güncellenecek servis belirtilmedi'), 
        type: 'error' 
      });
      return;
    }
    
    try {
      setSaving(true);
      setMessage({ text: '', type: '' });
      
      // Detay verilerini API formatına dönüştür
      const updatedData = {
        _id: serviceId,
        detailContent: {
          subtitle: serviceDetail.bannerSection.subtitle,
          content: serviceDetail.contentSections[0].content,
          bannerImage: serviceDetail.bannerSection.backgroundImage,
          featuredImage: serviceDetail.contentSections[0].featuredImage || '',
          gallery: serviceDetail.gallerySection.images
        },
        seo: serviceDetail.seo
      };
      
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ 
          text: getText({
            tr: 'Servis detayları başarıyla güncellendi',
            en: 'Service details updated successfully'
          }, language, 'Servis detayları başarıyla güncellendi'), 
          type: 'success' 
        });
      } else {
        setMessage({ 
          text: `${getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:')} ${result.message || getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu')}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Servis detayları güncellenirken hata:', error);
      setMessage({ 
        text: getText({
          tr: 'Servis detayları güncellenirken bir hata oluştu',
          en: 'An error occurred while updating service details'
        }, language, 'Servis detayları güncellenirken bir hata oluştu'), 
        type: 'error' 
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Sekmeye göre içerik değişikliği işleyicileri
  const handleInputChange = (section, field, lang, value) => {
    setServiceDetail(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      
      if (section === 'contentSections') {
        // Handle featuredImage field differently as it's a direct string, not a language object
        if (field === 'featuredImage') {
          newData.contentSections[0][field] = value;
        } else {
          if (!newData.contentSections[0][field]) {
            newData.contentSections[0][field] = {};
          }
          newData.contentSections[0][field][lang] = value;
        }
      } else {
        // Dil değeri varsa çoklu dil alanı
        if (lang) {
          if (!newData[section][field]) {
            newData[section][field] = {};
          }
          newData[section][field][lang] = value;
        } else {
          // Normal alan
          newData[section][field] = value;
        }
      }
      
      return newData;
    });
  };
  
  // Galeri görselini ekle
  const handleAddGalleryImage = (imagePath) => {
    setServiceDetail(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.gallerySection.images.push(imagePath);
      return newData;
    });
  };
  
  // Galeri görselini kaldır
  const handleRemoveGalleryImage = (index) => {
    setServiceDetail(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.gallerySection.images.splice(index, 1);
      return newData;
    });
  };
  
  // Galeri görsellerinin sıralamasını değiştir
  const handleReorderGalleryImages = (oldIndex, newIndex) => {
    setServiceDetail(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const [movedItem] = newData.gallerySection.images.splice(oldIndex, 1);
      newData.gallerySection.images.splice(newIndex, 0, movedItem);
      return newData;
    });
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>{getText({tr: 'Yükleniyor...', en: 'Loading...'}, language, 'Yükleniyor...')}</p>
        </div>
      </AdminLayout>
    );
  }
  
  // Servis seçilmemişse
  if (!serviceId) {
    return (
      <AdminLayout>
        <div className={styles.contentHeader}>
          <h1>{getText({tr: 'Servis Detayı Düzenleme', en: 'Edit Service Detail'}, language, 'Servis Detayı Düzenleme')}</h1>
        </div>
        
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
        
        <div className={styles.noData}>
          <p>
            {getText(
              {tr: 'Düzenlemek için bir servis seçilmedi. Servisler listesine dönüp bir servis seçebilirsiniz.', 
               en: 'No service selected for editing. You can return to the services list and select a service.'}, 
              language, 
              'Düzenlemek için bir servis seçilmedi.'
            )}
          </p>
          <button 
            className={styles.primaryButton}
            onClick={() => router.push('/admin/services')}
          >
            {getText({tr: 'Servisler Listesine Dön', en: 'Back to Services List'}, language, 'Servisler Listesine Dön')}
          </button>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className={styles.contentHeader}>
        <h1>
          {getText({tr: 'Servis Detayı Düzenleme:', en: 'Edit Service Detail:'}, language, 'Servis Detayı Düzenleme:')} {' '}
          <span className={styles.serviceTitle}>{getText(serviceTitle, language, 'Seçilen Servis')}</span>
        </h1>
        <div className={styles.headerButtons}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/admin/services')}
          >
            {getText({tr: 'Servislere Dön', en: 'Back to Services'}, language, 'Servislere Dön')}
          </button>
          <button 
            className={styles.saveButton}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 
              getText({tr: 'Kaydediliyor...', en: 'Saving...'}, language, 'Kaydediliyor...') : 
              getText({tr: 'Değişiklikleri Kaydet', en: 'Save Changes'}, language, 'Değişiklikleri Kaydet')}
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
            className={activeSection === 'bannerSection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('bannerSection')}
          >
            {getText({tr: 'Banner Alanı', en: 'Banner Section'}, language, 'Banner Alanı')}
          </button>
          <button 
            className={activeSection === 'contentSections' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('contentSections')}
          >
            {getText({tr: 'İçerik Bölümü', en: 'Content Section'}, language, 'İçerik Bölümü')}
          </button>
          <button 
            className={activeSection === 'gallerySection' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('gallerySection')}
          >
            {getText({tr: 'Galeri', en: 'Gallery'}, language, 'Galeri')}
          </button>
          <button 
            className={activeSection === 'callToAction' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('callToAction')}
          >
            {getText({tr: 'CTA', en: 'Call to Action'}, language, 'CTA')}
          </button>
          <button 
            className={activeSection === 'seo' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveSection('seo')}
          >
            {getText({tr: 'SEO', en: 'SEO'}, language, 'SEO')}
          </button>
        </div>
        
        <div className={styles.sectionContent}>
          {/* Banner Alanı */}
          {activeSection === 'bannerSection' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Başlık', en: 'Title'}, activeLanguage, 'Başlık')}</label>
                    <input 
                      type="text"
                      value={serviceDetail.bannerSection.title[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('bannerSection', 'title', activeLanguage, e.target.value)}
                      placeholder={getText({tr: 'Servis Başlığı', en: 'Service Title'}, activeLanguage, 'Servis Başlığı')}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Alt Başlık', en: 'Subtitle'}, activeLanguage, 'Alt Başlık')}</label>
                    <input 
                      type="text"
                      value={serviceDetail.bannerSection.subtitle[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('bannerSection', 'subtitle', activeLanguage, e.target.value)}
                      placeholder={getText({tr: 'Servis Alt Başlığı', en: 'Service Subtitle'}, activeLanguage, 'Servis Alt Başlığı')}
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>{getText({tr: 'Üst Banner Görsel URL (Sayfa Başlığı Arkaplanı)', en: 'Top Banner Image URL (Page Title Background)'}, language, 'Üst Banner Görsel URL')}</label>
                <div className={styles.inputGroup}>
                  <input 
                    type="text"
                    value={serviceDetail.bannerSection.backgroundImage || ''}
                    onChange={(e) => handleInputChange('bannerSection', 'backgroundImage', null, e.target.value)}
                    placeholder="/img/services/example-banner.jpg"
                    className={styles.urlInput}
                  />
                  <div className={styles.uploaderContainer}>
                    <FileUploader
                      id="bannerImageUploader"
                      folder={`img/${serviceTitle.en ? serviceTitle.en.toLowerCase().replace(/\s+/g, "-") : 'services'}`}
                      label={getText({tr: 'Banner Görseli Yükle', en: 'Upload Banner Image'}, language, 'Banner Görseli Yükle')}
                      onUpload={(data) => {
                        handleInputChange('bannerSection', 'backgroundImage', null, data.filePath);
                      }}
                      maxSize={5}
                    />
                  </div>
                </div>
              </div>
              
              {serviceDetail.bannerSection.backgroundImage && (
                <div className={styles.imagePreview}>
                  <Image 
                    src={serviceDetail.bannerSection.backgroundImage}
                    alt="Banner önizleme"
                    width={400}
                    height={200}
                    style={{ maxWidth: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </>
          )}
          
          {/* İçerik Bölümü */}
          {activeSection === 'contentSections' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Bölüm Başlığı', en: 'Section Title'}, activeLanguage, 'Bölüm Başlığı')}</label>
                    <input 
                      type="text"
                      value={serviceDetail.contentSections[0].title[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('contentSections', 'title', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'İçerik (HTML destekler)', en: 'Content (HTML supported)'}, activeLanguage, 'İçerik (HTML destekler)')}</label>
                    <textarea 
                      value={serviceDetail.contentSections[0].content[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('contentSections', 'content', activeLanguage, e.target.value)}
                      rows={15}
                      className={styles.htmlTextarea}
                      placeholder={`<h3>Başlık</h3>
                        <p>Paragraf metni buraya gelecek...</p>
                        <p>İkinci paragraf metni...</p>

                        <div class="gallery galleryid-915 gallery-columns-2 gallery-size-full flex">
                        <figure class="gallery-item">
                            <div class="gallery-icon landscape">
                            <img src="/img/services/image1.jpg" alt="Açıklama" class="attachment-full size-full" />
                            </div>
                        </figure>
                        <figure class="gallery-item">
                            <div class="gallery-icon landscape">
                            <img src="/img/services/image2.jpg" alt="Açıklama" class="attachment-full size-full" />
                            </div>
                        </figure>
                        </div>

                        <h3>İkinci Başlık</h3>
                        <p>Daha fazla içerik...</p>`}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'İçerik Görseli', en: 'Content Featured Image'}, language, 'İçerik Görseli')}</label>
                    <div className={styles.inputGroup}>
                      <input 
                        type="text"
                        value={serviceDetail.contentSections[0].featuredImage || ''}
                        onChange={(e) => handleInputChange('contentSections', 'featuredImage', null, e.target.value)}
                        placeholder="/img/services/example-content.jpg"
                        className={styles.urlInput}
                      />
                      <div className={styles.uploaderContainer}>
                        <FileUploader
                          id="contentImageUploader"
                          folder={`img/${serviceTitle.en ? serviceTitle.en.toLowerCase().replace(/\s+/g, "-") : 'services'}`}
                          label={getText({tr: 'İçerik Görseli Yükle', en: 'Upload Content Image'}, language, 'İçerik Görseli Yükle')}
                          onUpload={(data) => {
                            handleInputChange('contentSections', 'featuredImage', null, data.filePath);
                          }}
                          maxSize={5}
                        />
                      </div>
                    </div>
                    
                    {serviceDetail.contentSections[0].featuredImage && (
                      <div className={styles.imagePreview}>
                        <Image 
                          src={serviceDetail.contentSections[0].featuredImage}
                          alt="Content image preview"
                          width={400}
                          height={200}
                          style={{ maxWidth: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className={styles.tipBox}>
                    <h4>{getText({tr: 'HTML İpuçları', en: 'HTML Tips'}, activeLanguage, 'HTML İpuçları')}</h4>
                    <ul>
                      <li><code>&lt;h3&gt;Başlık&lt;/h3&gt;</code> - {getText({tr: 'Alt başlık', en: 'Subtitle'}, activeLanguage, 'Alt başlık')}</li>
                      <li><code>&lt;p&gt;Metin&lt;/p&gt;</code> - {getText({tr: 'Paragraf', en: 'Paragraph'}, activeLanguage, 'Paragraf')}</li>
                      <li><code>&lt;strong&gt;Kalın&lt;/strong&gt;</code> - {getText({tr: 'Kalın yazı', en: 'Bold text'}, activeLanguage, 'Kalın yazı')}</li>
                      <li><code>&lt;em&gt;İtalik&lt;/em&gt;</code> - {getText({tr: 'İtalik yazı', en: 'Italic text'}, activeLanguage, 'İtalik yazı')}</li>
                      <li><code>&lt;ul&gt;&lt;li&gt;Madde&lt;/li&gt;&lt;/ul&gt;</code> - {getText({tr: 'Madde işaretli liste', en: 'Bullet list'}, activeLanguage, 'Madde işaretli liste')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Galeri */}
          {activeSection === 'gallerySection' && (
            <>
              <div className={styles.formGroup}>
                <label>{getText({tr: 'Galeri Görselleri', en: 'Gallery Images'}, language, 'Galeri Görselleri')}</label>
                <div className={styles.galleryUploader}>
                  <FileUploader
                    id="galleryImageUploader"
                    folder={`img/${serviceTitle.en ? serviceTitle.en.toLowerCase().replace(/\s+/g, "-") : 'services'}`}
                    label={getText({tr: 'Galeri Görseli Yükle', en: 'Upload Gallery Image'}, language, 'Galeri Görseli Yükle')}
                    onUpload={(data) => {
                      handleAddGalleryImage(data.filePath);
                    }}
                    maxSize={5}
                  />
                </div>
              </div>
              
              <div className={styles.galleryPreview}>
                {serviceDetail.gallerySection.images.length > 0 ? (
                  <div className={styles.galleryGrid}>
                    {serviceDetail.gallerySection.images.map((image, index) => (
                      <div key={`gallery-${index}`} className={styles.galleryItem}>
                        <div className={styles.galleryImageContainer}>
                          <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            width={200}
                            height={150}
                            className={styles.galleryImage}
                          />
                          <div className={styles.galleryControls}>
                            <button
                              type="button"
                              className={styles.galleryControlButton}
                              onClick={() => handleRemoveGalleryImage(index)}
                              title={getText({tr: 'Görseli Kaldır', en: 'Remove Image'}, language, 'Görseli Kaldır')}
                            >
                              ❌
                            </button>
                            {index > 0 && (
                              <button
                                type="button"
                                className={styles.galleryControlButton}
                                onClick={() => handleReorderGalleryImages(index, index - 1)}
                                title={getText({tr: 'Yukarı Taşı', en: 'Move Up'}, language, 'Yukarı Taşı')}
                              >
                                ⬆️
                              </button>
                            )}
                            {index < serviceDetail.gallerySection.images.length - 1 && (
                              <button
                                type="button"
                                className={styles.galleryControlButton}
                                onClick={() => handleReorderGalleryImages(index, index + 1)}
                                title={getText({tr: 'Aşağı Taşı', en: 'Move Down'}, language, 'Aşağı Taşı')}
                              >
                                ⬇️
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="text"
                          className={styles.galleryImagePath}
                          value={image}
                          onChange={(e) => {
                            const newImages = [...serviceDetail.gallerySection.images];
                            newImages[index] = e.target.value;
                            setServiceDetail(prev => ({
                              ...prev,
                              gallerySection: {
                                ...prev.gallerySection,
                                images: newImages
                              }
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noGalleryImages}>
                    {getText({tr: 'Henüz galeri görseli eklenmedi.', en: 'No gallery images added yet.'}, language, 'Henüz galeri görseli eklenmedi.')}
                  </div>
                )}
              </div>
              
              <div className={styles.tipBox}>
                <h4>{getText({tr: 'Galeri İpuçları', en: 'Gallery Tips'}, language, 'Galeri İpuçları')}</h4>
                <p>
                  {getText(
                    {tr: 'Yüklediğiniz görseller otomatik olarak galeriye eklenir. İçerik alanında HTML kodu içinde kullanmak için yukarıdaki görsel yollarını kopyalayabilirsiniz.',
                     en: 'The images you upload are automatically added to the gallery. You can copy the image paths above to use in HTML code in the content area.'},
                    language, 
                    'Yüklediğiniz görseller otomatik olarak galeriye eklenir.'
                  )}
                </p>
              </div>
            </>
          )}
          
          {/* Call to Action */}
          {activeSection === 'callToAction' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'CTA Metni', en: 'CTA Text'}, activeLanguage, 'CTA Metni')}</label>
                    <input 
                      type="text"
                      value={serviceDetail.callToAction.text[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('callToAction', 'text', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Buton Metni', en: 'Button Text'}, activeLanguage, 'Buton Metni')}</label>
                    <input 
                      type="text"
                      value={serviceDetail.callToAction.buttonText[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('callToAction', 'buttonText', activeLanguage, e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>{getText({tr: 'Buton Bağlantısı', en: 'Button Link'}, language, 'Buton Bağlantısı')}</label>
                <input 
                  type="text"
                  value={serviceDetail.callToAction.buttonLink || ''}
                  onChange={(e) => handleInputChange('callToAction', 'buttonLink', null, e.target.value)}
                  placeholder="/contact-us"
                />
              </div>
            </>
          )}
          
          {/* SEO Settings */}
          {activeSection === 'seo' && (
            <>
              <div className={styles.langTabGroup}>
                <div className={styles.langTabNav}>
                  {languages.filter(l => l.isActive).map(lang => (
                    <button 
                      key={lang.code}
                      type="button"
                      className={`${styles.langTabButton} ${activeLanguage === lang.code ? styles.active : styles.inactive}`}
                      onClick={() => setActiveLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className={styles.langTabContent}>
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Sayfa Başlığı (Title)', en: 'Page Title'}, activeLanguage, 'Sayfa Başlığı')}</label>
                    <input 
                      type="text"
                      value={serviceDetail.seo.pageTitle[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('seo', 'pageTitle', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Meta Açıklama', en: 'Meta Description'}, activeLanguage, 'Meta Açıklama')}</label>
                    <textarea 
                      value={serviceDetail.seo.metaDescription[activeLanguage] || ''}
                      onChange={(e) => handleInputChange('seo', 'metaDescription', activeLanguage, e.target.value)}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Anahtar Kelimeler (virgülle ayırın)', en: 'Keywords (separate with commas)'}, activeLanguage, 'Anahtar Kelimeler')}</label>
                    <textarea 
                      value={serviceDetail.seo.keywords[activeLanguage] || ''}
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
