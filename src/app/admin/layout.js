'use client';

import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Admin sayfalarının layout'u
  return (
    <div className={styles.adminLayout}>
      {children}
    </div>
  );
}
