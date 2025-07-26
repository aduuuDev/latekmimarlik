'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import styles from '../page.module.css';

export default function LanguageManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  
  const [newLanguage, setNewLanguage] = useState({
    code: '',
    name: '',
    nativeName: '',
    isActive: true,
    isDefault: false,
    rtl: false,
    order: 999
  });

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Dilleri çek
  useEffect(() => {
    if (status === 'authenticated') {
      fetchLanguages();
    }
  }, [status]);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/languages');
      const result = await response.json();
      
      if (result.success) {
        setLanguages(result.data);
      } else {
        setMessage({ text: result.message || 'Dil verileri alınamadı', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Dil verileri çekilirken bir hata oluştu', type: 'error' });
      console.error('Dil verisi çekilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Varsayılan dilleri yükle
  const seedDefaultLanguages = async () => {
    if (!window.confirm('Varsayılan dilleri (Türkçe, İngilizce, Almanca, Arapça) yüklemek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      setSeeding(true);
      setMessage({ text: 'Varsayılan diller yükleniyor...', type: 'info' });
      
      const response = await fetch('/api/admin/languages/seed');
      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: 'Varsayılan diller başarıyla yüklendi', type: 'success' });
        fetchLanguages(); // Dil listesini güncelle
      } else {
        setMessage({ 
          text: result.message || 'Varsayılan diller yüklenemedi. Muhtemelen zaten veritabanında bulunuyorlar.', 
          type: 'warning' 
        });
      }
    } catch (error) {
      setMessage({ text: 'Varsayılan dilleri yüklerken bir hata oluştu', type: 'error' });
      console.error('Dil seed hatası:', error);
    } finally {
      setSeeding(false);
    }
  };

  const handleNewLanguageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewLanguage(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditingLanguageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingLanguage(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addLanguage = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLanguage),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: 'Yeni dil başarıyla eklendi', type: 'success' });
        setNewLanguage({
          code: '',
          name: '',
          nativeName: '',
          isActive: true,
          isDefault: false,
          rtl: false,
          order: 999
        });
        setShowAddForm(false);
        fetchLanguages();
      } else {
        setMessage({ text: result.message || 'Dil eklenemedi', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Dil eklerken bir hata oluştu', type: 'error' });
      console.error('Dil ekleme hatası:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateLanguage = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/languages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingLanguage),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: 'Dil başarıyla güncellendi', type: 'success' });
        setEditingLanguage(null);
        fetchLanguages();
      } else {
        setMessage({ text: result.message || 'Dil güncellenemedi', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Dil güncellerken bir hata oluştu', type: 'error' });
      console.error('Dil güncelleme hatası:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteLanguage = async (id) => {
    if (!window.confirm('Bu dili silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/languages?id=${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: 'Dil başarıyla silindi', type: 'success' });
        fetchLanguages();
      } else {
        setMessage({ text: result.message || 'Dil silinemedi', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Dil silinirken bir hata oluştu', type: 'error' });
      console.error('Dil silme hatası:', error);
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
        <h1>Dil Yönetimi</h1>
        <div className={styles.headerButtons}>
          <button 
            onClick={seedDefaultLanguages} 
            className={styles.seedButton}
            disabled={seeding}
          >
            {seeding ? 'Yükleniyor...' : 'Varsayılan Dilleri Yükle'}
          </button>
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className={styles.addButton}
          >
            {showAddForm ? 'İptal' : 'Yeni Dil Ekle'}
          </button>
        </div>
      </div>
      
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {/* Yeni Dil Ekleme Formu */}
      {showAddForm && (
        <div className={styles.formContainer}>
          <h2>Yeni Dil Ekle</h2>
          <form onSubmit={addLanguage}>
            <div className={styles.formGroup}>
              <label>Dil Kodu (2-5 karakter):</label>
              <input 
                type="text" 
                name="code"
                value={newLanguage.code}
                onChange={handleNewLanguageChange}
                placeholder="tr, en, de, fr vb."
                required
                maxLength="5"
                minLength="2"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Dil Adı:</label>
              <input 
                type="text" 
                name="name"
                value={newLanguage.name}
                onChange={handleNewLanguageChange}
                placeholder="Türkçe, English, Deutsch vb."
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Yerel Dil Adı:</label>
              <input 
                type="text" 
                name="nativeName"
                value={newLanguage.nativeName}
                onChange={handleNewLanguageChange}
                placeholder="Türkçe, English, Deutsch vb."
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Sıra:</label>
              <input 
                type="number" 
                name="order"
                value={newLanguage.order}
                onChange={handleNewLanguageChange}
                min="1"
              />
            </div>
            
            <div className={styles.checkboxGroup}>
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="isActive" 
                  name="isActive"
                  checked={newLanguage.isActive}
                  onChange={handleNewLanguageChange}
                />
                <label htmlFor="isActive">Aktif</label>
              </div>
              
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="isDefault" 
                  name="isDefault"
                  checked={newLanguage.isDefault}
                  onChange={handleNewLanguageChange}
                />
                <label htmlFor="isDefault">Varsayılan Dil</label>
              </div>
              
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="rtl" 
                  name="rtl"
                  checked={newLanguage.rtl}
                  onChange={handleNewLanguageChange}
                />
                <label htmlFor="rtl">Sağdan Sola (RTL)</label>
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <button 
                type="submit"
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? 'Kaydediliyor...' : 'Ekle'}
              </button>
              <button 
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowAddForm(false)}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Dil Düzenleme Formu */}
      {editingLanguage && (
        <div className={styles.formContainer}>
          <h2>Dil Düzenle: {editingLanguage.name}</h2>
          <form onSubmit={updateLanguage}>
            <div className={styles.formGroup}>
              <label>Dil Kodu:</label>
              <input 
                type="text" 
                name="code"
                value={editingLanguage.code}
                onChange={handleEditingLanguageChange}
                required
                maxLength="5"
                minLength="2"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Dil Adı:</label>
              <input 
                type="text" 
                name="name"
                value={editingLanguage.name}
                onChange={handleEditingLanguageChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Yerel Dil Adı:</label>
              <input 
                type="text" 
                name="nativeName"
                value={editingLanguage.nativeName}
                onChange={handleEditingLanguageChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Sıra:</label>
              <input 
                type="number" 
                name="order"
                value={editingLanguage.order}
                onChange={handleEditingLanguageChange}
                min="1"
              />
            </div>
            
            <div className={styles.checkboxGroup}>
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="editIsActive" 
                  name="isActive"
                  checked={editingLanguage.isActive}
                  onChange={handleEditingLanguageChange}
                />
                <label htmlFor="editIsActive">Aktif</label>
              </div>
              
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="editIsDefault" 
                  name="isDefault"
                  checked={editingLanguage.isDefault}
                  onChange={handleEditingLanguageChange}
                />
                <label htmlFor="editIsDefault">Varsayılan Dil</label>
              </div>
              
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="editRtl" 
                  name="rtl"
                  checked={editingLanguage.rtl}
                  onChange={handleEditingLanguageChange}
                />
                <label htmlFor="editRtl">Sağdan Sola (RTL)</label>
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <button 
                type="submit"
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? 'Kaydediliyor...' : 'Güncelle'}
              </button>
              <button 
                type="button"
                className={styles.cancelButton}
                onClick={() => setEditingLanguage(null)}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Dil Listesi */}
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Kod</th>
              <th>Dil Adı</th>
              <th>Yerel İsim</th>
              <th>Durum</th>
              <th>Varsayılan</th>
              <th>RTL</th>
              <th>Sıra</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {languages.length > 0 ? (
              languages.map((lang) => (
                <tr key={lang._id}>
                  <td><code>{lang.code}</code></td>
                  <td>{lang.name}</td>
                  <td>{lang.nativeName}</td>
                  <td>
                    <span className={lang.isActive ? styles.statusActive : styles.statusInactive}>
                      {lang.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td>{lang.isDefault ? '✓' : ''}</td>
                  <td>{lang.rtl ? '✓' : ''}</td>
                  <td>{lang.order}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.editButton}
                        onClick={() => setEditingLanguage(lang)}
                      >
                        Düzenle
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => deleteLanguage(lang._id)}
                        disabled={lang.isDefault}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className={styles.noData}>
                  Henüz dil eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </AdminLayout>
  );
}
