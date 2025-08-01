"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHamburgerMenu } from "../hooks/useHamburgerMenu";
import { getAllServices, generateSlug } from "../utils/mockData";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage, getText } from "../context/LanguageContext";

const Header = ({ theme = "light" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [headerSettings, setHeaderSettings] = useState(null);

  // Global hamburger menu hook'u kullan
  const { isMenuOpen, toggleMenu, closeMenu } = useHamburgerMenu();

  // Get current language
  const { language, changeLanguage, languages } = useLanguage();

  // Get all services for dynamic menu
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Servisleri API'den çek
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const response = await fetch("/api/services");
        const result = await response.json();

        if (result.success && result.data) {
          setServices(result.data);
        } else {
          // Fallback to mockData if API fails
          setServices(getAllServices());
        }
      } catch (error) {
        console.error("Services çekilirken hata:", error);
        // Fallback to mockData
        setServices(getAllServices());
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [language]); // Dil değiştiğinde servisleri yeniden çek

  // Header ayarlarını çek
  useEffect(() => {
    const fetchHeaderSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings?type=header");
        const result = await response.json();

        if (result.success && result.data) {
          setHeaderSettings(result.data);
        }
      } catch (error) {
        console.error("Header ayarları çekilirken hata:", error);
      }
    };

    fetchHeaderSettings();
  }, []);

  // getText fonksiyonu (fallback için)
  const getText = (textObj, currentLang, fallback) => {
    if (!textObj || typeof textObj !== "object") return fallback;
    return textObj[currentLang] || textObj["tr"] || textObj["en"] || fallback;
  };

  // Navigation metinlerini al (language değiştiğinde yeniden hesaplanır)
  const getNavigationText = (key, fallback) => {
    if (!headerSettings?.navigation) return fallback;
    return getText(headerSettings.navigation[key], language, fallback);
  };

  // Scroll davranışı için useEffect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile menu açıkken body scroll'unu engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }

    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  // Click outside to close social nav
  useEffect(() => {
    const handleClickOutside = (event) => {
      const socialNav = document.querySelector(".prague-social-nav");
      if (socialNav && !socialNav.contains(event.target) && showSocial) {
        setShowSocial(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSocial]);

  return (
    <header
      className={`prague-header simple sticky-menu sticky-mobile-menu ${theme} ${
        isScrolled ? "scroll" : ""
      } ${isMenuOpen ? "open-menu light" : ""}`}
      style={{
        backgroundColor: isMenuOpen
          ? "black"
          : theme === "dark"
          ? "white"
          : isScrolled
          ? "black"
          : "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* LOGO */}
      <div className="prague-logo">
        <Link href="/">
          <Image
            src={
              isMenuOpen
                ? "/img/home/logo-white.png"
                : theme === "dark"
                ? "/img/logo.png"
                : "/img/home/logo-white.png"
            }
            alt="logo"
            width={150}
            height={50}
            className="image_logo"
          />
        </Link>
      </div>

      <div className="prague-header-wrapper">
        {/* NAVIGATION */}
        <div
          className={`prague-navigation ${isMenuOpen ? "active" : ""}`}
          style={{
            color: isMenuOpen ? "white" : theme === "dark" ? "black" : "white",
          }}
        >
          <div className="pargue-navigation-wrapper">
            <div className="prague-navigation-inner">
              <nav>
                <ul className={`main-menu ${isMenuOpen ? "active" : ""}`}>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/" onClick={closeMenu}>
                      {getNavigationText("home", "Anasayfa")}
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/about-us" onClick={closeMenu}>
                      {getNavigationText("about", "Hakkımızda")}
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/services" onClick={closeMenu}>
                      {getNavigationText("services", "Hizmetlerimiz")}
                    </Link>
                    <ul className="sub-menu">
                      {servicesLoading ? (
                        <li>
                          <span style={{ padding: "10px 20px", color: "#666" }}>
                            Loading...
                          </span>
                        </li>
                      ) : services.length > 0 ? (
                        services.map((service) => (
                          <li key={service.id || service._id}>
                            <Link
                              href={`/services/${
                                service.slug || generateSlug(service.title)
                              }`}
                              onClick={closeMenu}
                            >
                              {getText(
                                service.title,
                                language,
                                service.title?.tr ||
                                  service.title?.en ||
                                  "Service"
                              )}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <span style={{ padding: "10px 20px", color: "#666" }}>
                            No services available
                          </span>
                        </li>
                      )}
                    </ul>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/projects" onClick={closeMenu}>
                      {getNavigationText("projects", "Projelerimiz")}
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <Link href="/products" onClick={closeMenu}>
                      {getNavigationText("products", "Ürünlerimiz")}
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <Link href="/blog" onClick={closeMenu}>
                      {getNavigationText("blog", "Blog")}
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <Link href="/contact-us" onClick={closeMenu}>
                      {getNavigationText("contact", "İletişim")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* mobile icon */}
        <div
          className={`prague-nav-menu-icon ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          style={{
            color: isMenuOpen ? "white" : theme === "dark" ? "black" : "white",
          }}
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <i></i>
          </a>
        </div>

        {/* LANGUAGE SWITCHER */}
        <div className="prague-social-nav">
          <a
            className="language-icon"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowSocial(!showSocial);
            }}
          >
            <i className="fa fa-globe" aria-hidden="true"></i>
          </a>

          <ul className={`social-content ${showSocial ? "visible" : ""}`}>
            {languages
              .filter(
                (lang) =>
                  lang &&
                  lang.code &&
                  (lang.isActive === undefined || lang.isActive === true)
              )
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((lang) => (
                <li key={lang.code}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      changeLanguage(lang.code);
                      setShowSocial(false);
                    }}
                    className={lang.code === language ? "active" : ""}
                  >
                    <span>{lang.code || lang.name}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
