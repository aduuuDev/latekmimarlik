"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export const useHeaderNavigation = () => {
  const [headerSettings, setHeaderSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  // Header ayarlarını çek
  useEffect(() => {
    const fetchHeaderSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/settings?type=header");
        const result = await response.json();

        if (result.success && result.data) {
          setHeaderSettings(result.data);
        }
      } catch (error) {
        console.error("Header ayarları çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderSettings();
  }, []);

  // getText fonksiyonu (fallback için)
  const getText = (textObj, currentLang, fallback) => {
    if (!textObj || typeof textObj !== "object") return fallback;
    return textObj[currentLang] || textObj["tr"] || textObj["en"] || fallback;
  };

  // Navigation metinlerini al
  const getNavigationText = (key, fallback) => {
    if (!headerSettings?.navigation) return fallback;
    return getText(headerSettings.navigation[key], language, fallback);
  };

  // Büyük harfli versiyon (subtitle'lar için)
  const getNavigationTextUpperCase = (key, fallback) => {
    return getNavigationText(key, fallback).toUpperCase();
  };

  return {
    headerSettings,
    loading,
    getNavigationText,
    getNavigationTextUpperCase,
  };
};
