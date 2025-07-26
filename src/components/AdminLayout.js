'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../app/admin/page.module.css';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Session kontrolü
  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    // Client side redirect to login page
    if (typeof window !== 'undefined') {
      router.push('/auth/login');
    }
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/img/logo.png" alt="Latek Mimarlık" width={150} height={40} />
        </div>
        <div className={styles.userInfo}>
          <span>Hoş geldiniz, {session?.user?.name}</span>
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
                <Link href="/admin" className={styles.link}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/homepage" className={styles.link}>
                  Anasayfa İçeriği
                </Link>
              </li>
              <li>
                <Link href="/admin/projects" className={styles.link}>
                  Projeler
                </Link>
              </li>
              <li>
                <Link href="/admin/services" className={styles.link}>
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/admin/blog" className={styles.link}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/admin/languages" className={styles.link}>
                  Dil Yönetimi
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className={styles.link}>
                  Ayarlar
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
