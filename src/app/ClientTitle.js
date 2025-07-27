'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./providers/AuthProvider";
import Providers from "@/components/Providers";

export default function RootLayout({ children }) {
  const [platformName, setPlatformName] = useState("Latek Mimarlık");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const fetchPlatformName = async () => {
      try {
        // Tarayıcı dilini al veya varsayılan 'tr' kullan
        const browserLang = navigator.language?.split('-')[0] || 'tr';
        
        const response = await fetch(`/api/platform?lang=${browserLang}`);
        const result = await response.json();

        console.log('Platform API result:', result);
        
        if (result.success) {
          // platformName doğrudan kullanmak yerine doğru şekilde erişim sağla
          if (result.data?.name) {
            setPlatformName(result.data.name);
          } else if (result.data?.platformName && 
                    (result.data.platformName[browserLang] || 
                     result.data.platformName.tr || 
                     result.data.platformName.en)) {
            // platformName bir Map olabilir, doğru dil anahtarını kullan
            const name = result.data.platformName[browserLang] || 
                         result.data.platformName.tr || 
                         result.data.platformName.en;
            setPlatformName(name);
          }
        }
      } catch (error) {
        console.error("Platform bilgileri çekilemedi:", error);
      }
    };
    
    fetchPlatformName();
  }, []);

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Dinamik başlık */}
        {isClient && <title>{platformName}</title>}
        <meta name="description" content="Professional architecture and design services" />

        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=optional"
        />

        {/* CSS Files */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/swiper.min.css" />
        <link rel="stylesheet" href="/css/slick.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/et-line-font.css" />
        <link rel="stylesheet" href="/css/prague-icons.css" />
        <link rel="stylesheet" href="/css/simple-line-icons.css" />
        <link rel="stylesheet" href="/css/before-after.min.css" />
        <link rel="stylesheet" href="/css/unit-test.css" />
        <link rel="stylesheet" href="/css/google_map.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
