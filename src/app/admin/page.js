'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Yükleniyor durumu
  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Oturum yoksa boş göster (zaten yukarıdaki useEffect yönlendirecek)
  if (!session) {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/img/logo.png" alt="Latek Mimarlık" width={150} height={40} />
        </div>
        <div className={styles.userInfo}>
          <span>Hoş geldiniz, {session.user.name}</span>
          <button 
            className={styles.logoutButton}
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li>
                <a href="/admin" className={styles.active}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/admin/homepage">
                  Anasayfa İçeriği
                </a>
              </li>
              <li>
                <a href="/admin/projects">
                  Projeler
                </a>
              </li>
              <li>
                <a href="/admin/services">
                  Hizmetler
                </a>
              </li>
              <li>
                <a href="/admin/blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="/admin/settings">
                  Ayarlar
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className={styles.content}>
          <h1>Dashboard</h1>
          
          <div className={styles.dashboardCards}>
            <div className={styles.card}>
              <h3>Anasayfa İçeriği</h3>
              <div className={styles.cardValue}><i className="fa fa-home"></i></div>
              <a href="/admin/homepage" className={styles.cardLink}>
                Anasayfayı Düzenle
              </a>
            </div>
            
            <div className={styles.card}>
              <h3>Projeler</h3>
              <div className={styles.cardValue}>0</div>
              <a href="/admin/projects" className={styles.cardLink}>
                Projeleri Yönet
              </a>
            </div>
            
            <div className={styles.card}>
              <h3>Hizmetler</h3>
              <div className={styles.cardValue}>0</div>
              <a href="/admin/services" className={styles.cardLink}>
                Hizmetleri Yönet
              </a>
            </div>
            
            <div className={styles.card}>
              <h3>Blog Yazıları</h3>
              <div className={styles.cardValue}>0</div>
              <a href="/admin/blog" className={styles.cardLink}>
                Blog Yazılarını Yönet
              </a>
            </div>
          </div>
          
          <div className={styles.welcomeBox}>
            <h2>Latek Mimarlık CMS&apos;e Hoş Geldiniz</h2>
            <p>
              Bu panel üzerinden web sitenizin içeriklerini kolayca yönetebilirsiniz.
              Sol menüden ilgili bölüme giderek içerik ekleyebilir, düzenleyebilir veya silebilirsiniz.
            </p>
            <p>
              Yardıma ihtiyacınız olursa, site yöneticinizle iletişime geçebilirsiniz.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
