"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHamburgerMenu } from "../hooks/useHamburgerMenu";
import { getAllServices } from "../utils/mockData";

const Header = ({ theme = "light" }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Global hamburger menu hook'u kullan
  const { isMenuOpen, toggleMenu, closeMenu } = useHamburgerMenu();

  // Get all services for dynamic menu
  const services = getAllServices();

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
                      Anasayfa
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/about-us" onClick={closeMenu}>
                      Hakkımızda
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/services" onClick={closeMenu}>
                      Hizmetlerimiz
                    </Link>
                    <ul className="sub-menu">
                      {services.map((service) => (
                        <li key={service.id}>
                          <Link
                            href={`/services/${service.slug}`}
                            onClick={closeMenu}
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <Link href="/projects" onClick={closeMenu}>
                      Projelerimiz
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <Link href="/products" onClick={closeMenu}>
                      Ürünlerimiz
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <Link href="/blog" onClick={closeMenu}>
                      Blog
                    </Link>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <Link href="/contact-us" onClick={closeMenu}>
                      İletişim
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

        {/* SOCIAL */}
        <div className="prague-social-nav">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <i className="fa fa-chain-broken" aria-hidden="true"></i>
          </a>

          <ul className="social-content">
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
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
