'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import styles from '../page.module.css';
import { useLanguage, getText } from '@/context/LanguageContext';

export default function ServicesManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language } = useLanguage();
  const [services, setServices] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    basicInfo: {
      title: {},
      slug: '',
      description: {},
      order: 0,
      isActive: true
    },
    detailContent: {
      description: {},
      content: {},
      featuredImage: ''
    },
    seo: {
      pageTitle: {},
      metaDescription: {},
      keywords: {}
    }
  });
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [activeLang, setActiveLang] = useState(language);

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

 // Aktif dilleri getir
  const fetchLanguages = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/languages');
      const result = await response.json();
      
      if (result.success && result.data) {
        setLanguages(result.data.filter(lang => lang.isActive !== false).sort((a, b) => a.order - b.order));
      } else {
        // Hata durumunda default diller ile devam et
        console.error('Dil verileri alınamadı:', result.message || 'Bilinmeyen hata');
      }
    } catch (error) {
      console.error('Dil verileri çekilirken hata:', error);
      // Hata durumunda da varsayılan bir dil ekleyerek UI'ın çalışmasını sağla
      setLanguages([{ 
        code: 'tr', 
        name: 'Türkçe', 
        nativeName: 'Türkçe', 
        rtl: false, 
        isDefault: true,
        order: 1
      }]);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/services');
      const result = await response.json();
      
      if (result.success) {
        setServices(result.data || []);
      } else {
        const errorMsg = getText({
          tr: 'Servisler yüklenirken bir hata oluştu', 
          en: 'An error occurred while loading services'
        }, language, 'Servisler yüklenirken bir hata oluştu');
        setMessage({ text: errorMsg, type: 'error' });
      }
    } catch (error) {
      console.error('Servis verileri çekilirken hata:', error);
      const errorMsg = getText({
        tr: 'Servis verileri çekilirken bir hata oluştu', 
        en: 'An error occurred while fetching service data'
      }, language, 'Servis verileri çekilirken bir hata oluştu');
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [language, setMessage, setServices, setLoading]);

  // Servisleri ve dilleri çek
  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices();
      fetchLanguages();
    }
  }, [status, fetchServices, fetchLanguages]);
  
 



  // Servis silme
  const deleteService = async (id) => {
    const confirmMessage = getText({
      tr: 'Bu servisi silmek istediğinizden emin misiniz?',
      en: 'Are you sure you want to delete this service?'
    }, language, 'Bu servisi silmek istediğinizden emin misiniz?');
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setDeleting(true);
      setMessage({ text: '', type: '' });
      
      const response = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        const successMsg = getText({
          tr: 'Servis başarıyla silindi', 
          en: 'Service deleted successfully'
        }, language, 'Servis başarıyla silindi');
        setMessage({ text: successMsg, type: 'success' });
        // Servisleri yeniden yükle
        fetchServices();
      } else {
        const errorPrefix = getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:');
        setMessage({ text: `${errorPrefix} ${result.message || getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu')}`, type: 'error' });
      }
    } catch (error) {
      console.error('Servis silinirken hata:', error);
      const errorMsg = getText({
        tr: 'Servis silinirken bir hata oluştu', 
        en: 'An error occurred while deleting the service'
      }, language, 'Servis silinirken bir hata oluştu');
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  // Form işlemleri
  const handleAddNew = () => {
    setEditingService(null);
    setFormData({
      basicInfo: {
        title: {},
        slug: '',
        description: {},
        order: services.length, // Yeni servis en sona eklensin
        isActive: true
      },
      detailContent: {
        description: {},
        content: {},
        featuredImage: ''
      },
      seo: {
        pageTitle: {},
        metaDescription: {},
        keywords: {}
      }
    });
    setActiveTab('basicInfo');
    setShowForm(true);
  };

  const handleEdit = (service) => {
    // Form verilerini düzenle
    const formattedData = {
      _id: service._id,
      basicInfo: {
        title: service.title || {},
        slug: service.slug || '',
        description: service.description || {},
        order: service.order || 0,
        isActive: service.isActive !== false
      },
      detailContent: {
        description: service.detailContent?.description || {},
        content: service.detailContent?.content || {},
        featuredImage: service.detailContent?.featuredImage || ''
      },
      seo: {
        pageTitle: service.seo?.pageTitle || {},
        metaDescription: service.seo?.metaDescription || {},
        keywords: service.seo?.keywords || {}
      }
    };

    setEditingService(service);
    setFormData(formattedData);
    setActiveTab('basicInfo');
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
  };

  const handleInputChange = (section, field, lang, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      
      // Eğer çoklu dil alanı ise
      if (lang) {
        if (!newData[section][field]) {
          newData[section][field] = {};
        }
        newData[section][field][lang] = value;
      } else {
        // Normal alan
        newData[section][field] = value;
      }
      
      return newData;
    });
  };

  const handleCheckboxChange = (section, field, checked) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData[section][field] = checked;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage({ text: '', type: '' });
      
      const method = editingService ? 'PUT' : 'POST';
      const url = '/api/admin/services';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        const successMsg = editingService ? 
          getText({tr: 'Servis başarıyla güncellendi', en: 'Service updated successfully'}, language, 'Servis başarıyla güncellendi') : 
          getText({tr: 'Servis başarıyla oluşturuldu', en: 'Service created successfully'}, language, 'Servis başarıyla oluşturuldu');
        
        setMessage({ 
          text: successMsg, 
          type: 'success' 
        });
        setShowForm(false);
        setEditingService(null);
        // Servisleri yeniden yükle
        fetchServices();
      } else {
        const errorPrefix = getText({tr: 'Hata:', en: 'Error:'}, language, 'Hata:');
        const errorDefault = getText({tr: 'Bir sorun oluştu', en: 'A problem occurred'}, language, 'Bir sorun oluştu');
        setMessage({ text: `${errorPrefix} ${result.message || errorDefault}`, type: 'error' });
      }
    } catch (error) {
      console.error('Servis kaydedilirken hata:', error);
      const errorMsg = getText({
        tr: 'Servis kaydedilirken bir hata oluştu', 
        en: 'An error occurred while saving the service'
      }, language, 'Servis kaydedilirken bir hata oluştu');
      setMessage({ text: errorMsg, type: 'error' });
    }
  };

  // Mevcut sayfa yapısını korumak için dil sekmelerini yeniden düzenleyeceğiz, 
  // ancak bu örnekte render helper fonksiyonlar yerine doğrudan UI içinde dil sekmelerini kullanacağız
  
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

  return (
    <AdminLayout>
      <div className={styles.contentHeader}>
        <h1>{getText({tr: 'Hizmetler Yönetimi', en: 'Services Management'}, language, 'Hizmetler Yönetimi')}</h1>
        {!showForm && (
          <div className={styles.headerButtons}>
            <button 
              className={styles.addButton}
              onClick={handleAddNew}
            >
              {getText({tr: 'Yeni Hizmet Ekle', en: 'Add New Service'}, language, 'Yeni Hizmet Ekle')}
            </button>
          </div>
        )}
      </div>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      {/* Servis Formu */}
      {showForm ? (
        <div className={styles.formContainer}>
          <h2>{editingService ? 
            getText({tr: 'Hizmet Düzenle', en: 'Edit Service'}, language, 'Hizmet Düzenle') : 
            getText({tr: 'Yeni Hizmet Ekle', en: 'Add New Service'}, language, 'Yeni Hizmet Ekle')}</h2>
          
          <div className={styles.sectionTabs}>
            <button 
              className={activeTab === 'basicInfo' ? styles.activeTab : styles.inactiveTab}
              onClick={() => setActiveTab('basicInfo')}
            >
              {getText({tr: 'Temel Bilgiler', en: 'Basic Information'}, language, 'Temel Bilgiler')}
            </button>
            <button 
              className={activeTab === 'detailContent' ? styles.activeTab : styles.inactiveTab}
              onClick={() => setActiveTab('detailContent')}
            >
              {getText({tr: 'Detay İçeriği', en: 'Detail Content'}, language, 'Detay İçeriği')}
            </button>
            <button 
              className={activeTab === 'seo' ? styles.activeTab : styles.inactiveTab}
              onClick={() => setActiveTab('seo')}
            >
              {getText({tr: 'SEO Ayarları', en: 'SEO Settings'}, language, 'SEO Ayarları')}
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.sectionContent}>
              {/* Temel Bilgiler */}
              {activeTab === 'basicInfo' && (
                <>
                  <div className={styles.langTabGroup}>
                    <div className={styles.langTabNav}>
                      {languages.map(lang => (
                        <button 
                          key={lang.code}
                          type="button"
                          className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : styles.inactive}`}
                          onClick={() => setActiveLang(lang.code)}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className={styles.langTabContent}>
                      <div className={styles.formGroup}>
                        <label>{getText({tr: 'Başlık *', en: 'Title *'}, activeLang, 'Başlık *')}</label>
                        <input 
                          type="text"
                          value={formData.basicInfo.title[activeLang] || ''}
                          onChange={(e) => handleInputChange('basicInfo', 'title', activeLang, e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label>{getText({tr: 'Açıklama', en: 'Description'}, activeLang, 'Açıklama')}</label>
                        <textarea 
                          value={formData.basicInfo.description[activeLang] || ''}
                          onChange={(e) => handleInputChange('basicInfo', 'description', activeLang, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'URL Slug (Boş bırakırsanız başlıktan otomatik oluşturulur)', en: 'URL Slug (Will be auto-generated from title if left empty)'}, activeLang, 'URL Slug')}</label>
                    <input 
                      type="text"
                      value={formData.basicInfo.slug || ''}
                      onChange={(e) => handleInputChange('basicInfo', 'slug', null, e.target.value)}
                      placeholder="ornek-hizmet-baslik"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Sıralama', en: 'Order'}, activeLang, 'Sıralama')}</label>
                    <input 
                      type="number"
                      value={formData.basicInfo.order || 0}
                      onChange={(e) => handleInputChange('basicInfo', 'order', null, parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <div className={styles.checkbox}>
                      <input 
                        type="checkbox"
                        id="isActive"
                        checked={formData.basicInfo.isActive}
                        onChange={(e) => handleCheckboxChange('basicInfo', 'isActive', e.target.checked)}
                      />
                      <label htmlFor="isActive">{getText({tr: 'Aktif', en: 'Active'}, activeLang, 'Aktif')}</label>
                    </div>
                  </div>
                </>
              )}
              
              {/* Detay İçeriği */}
              {activeTab === 'detailContent' && (
                <>
                  <div className={styles.langTabGroup}>
                    <div className={styles.langTabNav}>
                      {languages.map(lang => (
                        <button 
                          key={lang.code}
                          type="button"
                          className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : styles.inactive}`}
                          onClick={() => setActiveLang(lang.code)}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className={styles.langTabContent}>
                      <div className={styles.formGroup}>
                        <label>{getText({tr: 'Detay Açıklama', en: 'Detailed Description'}, activeLang, 'Detay Açıklama')}</label>
                        <textarea 
                          value={formData.detailContent.description[activeLang] || ''}
                          onChange={(e) => handleInputChange('detailContent', 'description', activeLang, e.target.value)}
                          rows={5}
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label>{getText({tr: 'İçerik (HTML destekler)', en: 'Content (HTML supported)'}, activeLang, 'İçerik (HTML destekler)')}</label>
                        <textarea 
                          value={formData.detailContent.content[activeLang] || ''}
                          onChange={(e) => handleInputChange('detailContent', 'content', activeLang, e.target.value)}
                          rows={10}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>{getText({tr: 'Öne Çıkan Görsel URL', en: 'Featured Image URL'}, activeLang, 'Öne Çıkan Görsel URL')}</label>
                    <input 
                      type="text"
                      value={formData.detailContent.featuredImage || ''}
                      onChange={(e) => handleInputChange('detailContent', 'featuredImage', null, e.target.value)}
                      placeholder="/img/services/service-image.jpg"
                    />
                  </div>
                  
                  {formData.detailContent.featuredImage && (
                    <div className={styles.imagePreview}>
                      <Image 
                        src={formData.detailContent.featuredImage}
                        alt="Görsel önizleme"
                        width={200}
                        height={150}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </>
              )}
              
              {/* SEO Ayarları */}
              {activeTab === 'seo' && (
                <div className={styles.langTabGroup}>
                  <div className={styles.langTabNav}>
                    {languages.map(lang => (
                      <button 
                        key={lang.code}
                        type="button"
                        className={`${styles.langTabButton} ${activeLang === lang.code ? styles.active : styles.inactive}`}
                        onClick={() => setActiveLang(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className={styles.langTabContent}>
                    <div className={styles.formGroup}>
                      <label>{getText({tr: 'Sayfa Başlığı (Title)', en: 'Page Title'}, activeLang, 'Sayfa Başlığı (Title)')}</label>
                      <input 
                        type="text"
                        value={formData.seo.pageTitle[activeLang] || ''}
                        onChange={(e) => handleInputChange('seo', 'pageTitle', activeLang, e.target.value)}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>{getText({tr: 'Meta Açıklama (Description)', en: 'Meta Description'}, activeLang, 'Meta Açıklama (Description)')}</label>
                      <textarea 
                        value={formData.seo.metaDescription[activeLang] || ''}
                        onChange={(e) => handleInputChange('seo', 'metaDescription', activeLang, e.target.value)}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>{getText({tr: 'Anahtar Kelimeler (Keywords - virgülle ayırın)', en: 'Keywords (separated by commas)'}, activeLang, 'Anahtar Kelimeler')}</label>
                      <textarea 
                        value={formData.seo.keywords[activeLang] || ''}
                        onChange={(e) => handleInputChange('seo', 'keywords', activeLang, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className={styles.buttonGroup}>
                <button 
                  type="submit" 
                  className={styles.saveButton}
                >
                  {editingService ? 
                    getText({tr: 'Güncelle', en: 'Update'}, language, 'Güncelle') : 
                    getText({tr: 'Kaydet', en: 'Save'}, language, 'Kaydet')}
                </button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  {getText({tr: 'İptal', en: 'Cancel'}, language, 'İptal')}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          {services.length === 0 ? (
            <div className={styles.noData}>
              <p>{getText(
                {tr: 'Henüz servis eklenmemiş. Yukarıdaki "Yeni Hizmet Ekle" butonuna tıklayarak servis ekleyebilirsiniz.', 
                 en: 'No services added yet. Click on the "Add New Service" button above to add a service.'}, 
                language, 
                'Henüz servis eklenmemiş.'
              )}</p>
            </div>
          ) : (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>{getText({tr: 'Başlık', en: 'Title'}, language, 'Başlık')}</th>
                  <th>{getText({tr: 'Slug', en: 'Slug'}, language, 'Slug')}</th>
                  <th>{getText({tr: 'Sıra', en: 'Order'}, language, 'Sıra')}</th>
                  <th>{getText({tr: 'Durum', en: 'Status'}, language, 'Durum')}</th>
                  <th>{getText({tr: 'İşlemler', en: 'Actions'}, language, 'İşlemler')}</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service._id}>
                    <td>{getText(service.title, language, 'İsimsiz')}</td>
                    <td>{service.slug}</td>
                    <td>{service.order || 0}</td>
                    <td>
                      <span className={service.isActive ? styles.statusActive : styles.statusInactive}>
                        {service.isActive ? 
                          getText({tr: 'Aktif', en: 'Active'}, language, 'Aktif') : 
                          getText({tr: 'Pasif', en: 'Inactive'}, language, 'Pasif')}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button 
                          className={styles.editButton}
                          onClick={() => handleEdit(service)}
                        >
                          {getText({tr: 'Düzenle', en: 'Edit'}, language, 'Düzenle')}
                        </button>
                        <button 
                          className={styles.detailButton}
                          onClick={() => router.push(`/admin/service-detail?id=${service._id}`)}
                        >
                          {getText({tr: 'Detay Düzenle', en: 'Edit Detail'}, language, 'Detay Düzenle')}
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => deleteService(service._id)}
                          disabled={deleting}
                        >
                          {getText({tr: 'Sil', en: 'Delete'}, language, 'Sil')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
