'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import AdminLayout from '@/components/AdminLayout';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false);
    }, []);
  

  // Session kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

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

  // Oturum yoksa boş göster (zaten yukarıdaki useEffect yönlendirecek)
  if (!session) {
    return null;
  }

  return (
    <AdminLayout>
    <div className={styles.adminContainer}>
     

      <div className={styles.mainContent}>
    

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
            <h2>CMS Yönetim Paneline Hoş Geldiniz</h2>
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
    </AdminLayout>
  );
}
