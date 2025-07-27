'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export default function DatabaseSeedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState({
    services: false,
    serviceDetails: false,
    blogs: false,
    projects: false,
    all: false
  });
  const [results, setResults] = useState({});
  const [clearExisting, setClearExisting] = useState(false);
  
  // Oturum durumunu kontrol et
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Yükleniyor...</p>
        </div>
      </AdminLayout>
    );
  }
  
  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }
  
  const handleSeed = async (type) => {
    try {
      setLoading((prev) => ({ ...prev, [type]: true }));
      
      const response = await fetch(`/api/admin/seed/${type === 'all' ? '' : type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clearExisting }),
      });
      
      const data = await response.json();
      
      setResults((prev) => ({ ...prev, [type]: data }));
    } catch (error) {
      setResults((prev) => ({ ...prev, [type]: { success: false, message: error.message } }));
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <AdminLayout>
      <h1>Veritabanı Seed İşlemleri</h1>
      
      <div className={styles.infoAlert}>
        <p>Bu sayfada, mock verilerini veritabanına yükleyebilirsiniz. Bu işlem, örnek içerikleri veritabanına ekler ve sitenizde gerçek verilerle çalışmanızı sağlar.</p>
      </div>
      
      <div className={styles.card} style={{ marginBottom: '20px' }}>
        <h2>Ayarlar</h2>
        <div className={styles.cardContent}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={clearExisting}
              onChange={(e) => setClearExisting(e.target.checked)}
            />
            Mevcut verileri temizle (Bu seçenek işaretlenirse, seed işlemi öncesinde ilgili koleksiyondaki tüm veriler silinir)
          </label>
        </div>
      </div>
      
      <div className={styles.grid}>
        {/* Services Seed Card */}
        <div className={styles.card}>
          <h2>Hizmetler</h2>
          <div className={styles.cardContent}>
            <p>
              Hizmet içeriklerini veritabanına ekleyin. Bu işlem, mock service verilerini alıp veritabanına kaydeder.
            </p>
            
            <button 
              className={styles.button}
              onClick={() => handleSeed('services')} 
              disabled={loading.services || loading.all}
            >
              {loading.services ? 'Yükleniyor...' : 'Hizmetleri Seed Et'}
            </button>
            
            {results.services && (
              <div className={styles.resultBox}>
                <div className={results.services.success ? styles.successAlert : styles.errorAlert}>
                  {results.services.message}
                  {results.services.success && results.services.servicesCount && (
                    <p>
                      Eklenen hizmet sayısı: {results.services.servicesCount}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            <hr style={{ margin: '15px 0', borderTop: '1px solid #eee' }} />
            
            <p>
              <strong>Servis Detay İçerikleri: </strong>
              Mock data içindeki detay içeriklerini (HTML içerik, galeri görselleri, vb.) mevcut servislere ekleyin.
            </p>
            
            <button 
              className={`${styles.button}`}
              style={{ backgroundColor: '#13c2c2' }}
              disabled={loading.serviceDetails}
              onClick={() => {
                // Set loading state
                setLoading(prev => ({ ...prev, serviceDetails: true }));
                
                // Terminal command to run the seed-service-details.js script
                fetch('/api/admin/run-script', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ script: 'seed-service-details.js' })
                })
                .then(res => res.json())
                .then(data => {
                  setResults(prev => ({ 
                    ...prev, 
                    serviceDetails: { 
                      success: data.success, 
                      message: data.message || data.error || 'Servis detayları başarıyla güncellendi' 
                    } 
                  }));
                })
                .catch(err => {
                  setResults(prev => ({ 
                    ...prev, 
                    serviceDetails: { 
                      success: false, 
                      message: err.message || 'Bir hata oluştu' 
                    } 
                  }));
                })
                .finally(() => {
                  // Reset loading state
                  setLoading(prev => ({ ...prev, serviceDetails: false }));
                });
              }}
            >
              {loading.serviceDetails ? 'İşleniyor...' : 'Servis Detay İçeriklerini Ekle'}
            </button>
            
            {results.serviceDetails && (
              <div className={styles.resultBox}>
                <div className={results.serviceDetails.success ? styles.successAlert : styles.errorAlert}>
                  {results.serviceDetails.message}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Blogs Seed Card */}
        <div className={styles.card}>
          <h2>Blog Yazıları</h2>
          <div className={styles.cardContent}>
            <p>
              Blog yazılarını veritabanına ekleyin. Bu işlem, mock blog verilerini alıp veritabanına kaydeder.
            </p>
            
            <button 
              className={styles.button}
              onClick={() => handleSeed('blogs')} 
              disabled={loading.blogs || loading.all}
            >
              {loading.blogs ? 'Yükleniyor...' : 'Blog Yazılarını Seed Et'}
            </button>
            
            {results.blogs && (
              <div className={styles.resultBox}>
                <div className={results.blogs.success ? styles.successAlert : styles.errorAlert}>
                  {results.blogs.message}
                  {results.blogs.success && results.blogs.blogsCount && (
                    <p>
                      Eklenen blog yazısı sayısı: {results.blogs.blogsCount}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Projects Seed Card */}
        <div className={styles.card}>
          <h2>Projeler</h2>
          <div className={styles.cardContent}>
            <p>
              Proje içeriklerini veritabanına ekleyin. Bu işlem, mock proje verilerini alıp veritabanına kaydeder.
            </p>
            
            <button 
              className={styles.button}
              onClick={() => handleSeed('projects')} 
              disabled={loading.projects || loading.all}
            >
              {loading.projects ? 'Yükleniyor...' : 'Projeleri Seed Et'}
            </button>
            
            {results.projects && (
              <div className={styles.resultBox}>
                <div className={results.projects.success ? styles.successAlert : styles.errorAlert}>
                  {results.projects.message}
                  {results.projects.success && results.projects.projectsCount && (
                    <p>
                      Eklenen proje sayısı: {results.projects.projectsCount}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* All Content Seed Card */}
        <div className={styles.card}>
          <h2>Tüm İçerikleri Seed Et</h2>
          <div className={styles.cardContent}>
            <p>
              Tüm içerikleri (hizmetler, blog yazıları, projeler) tek seferde veritabanına ekleyin.
            </p>
            
            <button 
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => handleSeed('all')} 
              disabled={loading.all || loading.services || loading.blogs || loading.projects}
            >
              {loading.all ? 'Yükleniyor...' : 'Tüm İçerikleri Seed Et'}
            </button>
            
            {results.all && (
              <div className={styles.resultBox}>
                <div className={results.all.success ? styles.successAlert : styles.errorAlert}>
                  {results.all.message}
                </div>
                
                {results.all.results && (
                  <div className={styles.detailedResults}>
                    <h3>Detaylı sonuçlar:</h3>
                    
                    {Object.entries(results.all.results).map(([key, value]) => (
                      <div key={key} className={value.success ? styles.successAlert : styles.errorAlert}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
