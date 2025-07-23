"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children, headerTheme = "light" }) => {
  useEffect(() => {
    // Preloader'ı gizle - sadece loader animasyonu
    const loader = document.querySelector(".prague-loader");
    if (loader) {
      setTimeout(() => {
        loader.classList.add("loaded");
      }, 1000);
    }
  }, []);

  return (
    <>
      {/* Preloader */}
      <div className="prague-loader">
        <div className="prague-loader-wrapper">
          <div className="prague-loader-bar">PRAGUE</div>
        </div>
      </div>

      <Header theme={headerTheme} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
