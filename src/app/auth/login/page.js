'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [setupData, setSetupData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const router = useRouter();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false
      });
      
      if (result.error) {
        setError('Kullanıcı adı veya şifre hatalı');
      } else {
        // Başarılı giriş
        router.push('/admin');
      }
    } catch (error) {
      setError('Giriş sırasında bir hata oluştu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Form doğrulaması
    if (!setupData.username || !setupData.password || !setupData.name) {
      setError('Tüm alanlar zorunludur');
      setLoading(false);
      return;
    }
    
    if (setupData.password !== setupData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/admin/create-first-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: setupData.username,
          password: setupData.password,
          name: setupData.name
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Kurulum başarılı, login formunu göster
        setShowSetup(false);
        setUsername(setupData.username);
        setPassword(setupData.password);
        // Otomatik giriş yap
        setTimeout(() => {
          handleLogin(new Event('submit'));
        }, 500);
      } else {
        setError(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      setError('İlk kullanıcıyı oluşturma sırasında bir hata oluştu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // İlk kullanıcı kontrolü - sadece gerektiğinde aktif et
  const checkFirstUser = async () => {
    // Bu kontrol şu an devre dışı - gerekirse aktif edilebilir
    return;

    // Client-side'da çalıştığından emin ol
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Absolute URL kullan
      const baseUrl = window.location.origin;
      const response = await fetch(`${baseUrl}/api/admin/users/count`);
      const data = await response.json();

      if (data.count === 0) {
        setShowSetup(true);
      }
    } catch (error) {
      console.error('Kullanıcı kontrolü sırasında bir hata oluştu:', error);
    }
  };

  // Component yüklendiğinde ilk kullanıcı var mı kontrol et
  useEffect(() => {
    // checkFirstUser(); // Şu an devre dışı
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.logo}>
          <Image src="/img/logo.png" alt="Admin Panel" width={160} height={50} />
        </div>
        
        {showSetup ? (
          <>
            <h1>İlk Kullanıcıyı Oluştur</h1>
            <p>CMS&apos;e giriş yapmak için bir admin kullanıcısı oluşturun.</p>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <form onSubmit={handleSetupSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="setup-name">İsim</label>
                <input
                  id="setup-name"
                  type="text"
                  value={setupData.name}
                  onChange={(e) => setSetupData({...setupData, name: e.target.value})}
                  placeholder="Adınız Soyadınız"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="setup-username">Kullanıcı Adı</label>
                <input
                  id="setup-username"
                  type="text"
                  value={setupData.username}
                  onChange={(e) => setSetupData({...setupData, username: e.target.value})}
                  placeholder="Kullanıcı adı"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="setup-password">Şifre</label>
                <input
                  id="setup-password"
                  type="password"
                  value={setupData.password}
                  onChange={(e) => setSetupData({...setupData, password: e.target.value})}
                  placeholder="Şifre"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="setup-confirm-password">Şifre (Tekrar)</label>
                <input
                  id="setup-confirm-password"
                  type="password"
                  value={setupData.confirmPassword}
                  onChange={(e) => setSetupData({...setupData, confirmPassword: e.target.value})}
                  placeholder="Şifrenizi tekrar girin"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={loading}
              >
                {loading ? 'İşleniyor...' : 'Kullanıcı Oluştur'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>Admin Girişi</h1>
            <p>Yönetim Paneline hoş geldiniz. Lütfen giriş yapın.</p>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Kullanıcı Adı</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password">Şifre</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={loading}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
