"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, getText } from "../context/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const [footerData, setFooterData] = useState({
    platformName: {},
    logo: {
      light: "/img/logo.png",
      dark: "/img/home/logo-white.png"
    },
    banner: {
      imageUrl: "/img/home/ffa51a33625455.56b20f01c3608.jpg",
      altText: {}
    },
    description: {},
    contact: {
      title: {},
      phone: "",
      email: "",
      address: {}
    },
    copyright: {},
    socialLinks: []
  });
  
  // API'dan footer verilerini çek
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/settings?type=footer');
        const result = await response.json();
        
        if (result.success && result.data) {
          // Settings modelindeki doğrudan değerleri alıyoruz, bir data nesnesi içinde değil
          setFooterData({
            platformName: result.data.platformName || {},
            logo: result.data.logo || {
              light: "/img/logo.png",
              dark: "/img/home/logo-white.png"
            },
            banner: result.data.banner || {
              imageUrl: "/img/home/ffa51a33625455.56b20f01c3608.jpg",
              altText: {}
            },
            description: result.data.description || {},
            contact: result.data.contact || {
              title: {},
              phone: "",
              email: "",
              address: {}
            },
            copyright: result.data.copyright || {},
            socialLinks: result.data.socialLinks || []
          });
          
          console.log('Footer verileri yüklendi:', result.data);
        } else {
          console.error('Footer verileri alınamadı:', result.message || 'Bilinmeyen hata');
        }
      } catch (error) {
        console.error('Footer verileri çekilirken hata:', error);
      }
    };
    
    fetchFooterData();
  }, []);
  
  return (
    <footer className="prague-footer default">
      <Image
        width={2500}
        height={1248}
        src={footerData.banner?.imageUrl || "/img/home/ffa51a33625455.56b20f01c3608.jpg"}
        className="s-img-switch"
        alt={getText(footerData.banner?.altText, language, "footer banner")}
      />
      <div className="footer-content-outer">
        <div className="footer-top-content">
          <div className="prague-footer-main-block">
            <div className="prague-logo">
              <Link href="/">
                <Image
                  width={145}
                  height={46}
                  src={footerData.logo?.dark || "/img/home/logo-white.png"}
                  className="attachment-full size-full"
                  alt={getText(footerData.platformName, language, "Latek Mimarlık")}
                />
              </Link>
            </div>

            <div className="footer-main-content">
              <p>
                {getText(
                  footerData.description, 
                  language,
                  "The company principle of Architecture-Studio is the collective conception. From the very beginning, the practice has believed in the virtues of exchange, crossing ideas, common effort, shared knowledge and enthusiasm."
                )}
              </p>
            </div>
          </div>

          <div className="prague-footer-info-block">
            <h6 className="footer-info-block-title">
              {getText(footerData.contact?.title, language, "GET IN TOUCH")}
            </h6>

            <div className="footer-info-block-content">
              <p>
                <a href={`tel:${footerData.contact?.phone || '+7(885)5896985'}`}>
                  {footerData.contact?.phone || '+7 (885) 589 69 85'}
                </a>
              </p>
              <p>
                <a href={`mailto:${footerData.contact?.email || 'prague-architects@info.com'}`}>
                  {footerData.contact?.email || 'prague-architects@info.com'}
                </a>
              </p>
              <p>
                {getText(footerData.contact?.address, language, "Litačka, Jungmannova 35/29, Nové Město,Czech Republic")}
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-content">
          {/* Footer copyright */}
          <div className="footer-copyright">
            <p>
              {footerData.copyright ? 
                getText(footerData.copyright, language, "PRAGUE (C) 2019 ALL RIGHTS RESERVED") :
                `${getText(footerData.platformName, language, "PRAGUE")} © ${new Date().getFullYear()} ${getText({tr: "TÜM HAKLARI SAKLIDIR", en: "ALL RIGHTS RESERVED"}, language, "ALL RIGHTS RESERVED")}`
              }
            </p>
          </div>

          <div className="prague-social-nav">
            <ul className="social-content">
              {footerData.socialLinks && footerData.socialLinks.length > 0 ? (
                footerData.socialLinks.map((link, index) => (
                  <li key={index}>
                    <a target="_blank" href={link.url}>
                      <i aria-hidden="true" className={`fa ${link.icon}`}></i>
                    </a>
                  </li>
                ))
              ) : (
                // Varsayılan sosyal medya linkleri
                <>
                  <li>
                    <a target="_blank" href="https://www.behance.net/foxthemes">
                      <i aria-hidden="true" className="fa fa-behance"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://twitter.com/foxthemes_offic">
                      <i aria-hidden="true" className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/foxthemes.page/"
                    >
                      <i aria-hidden="true" className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.pinterest.com/foxthemes/">
                      <i aria-hidden="true" className="fa fa-pinterest-p"></i>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
