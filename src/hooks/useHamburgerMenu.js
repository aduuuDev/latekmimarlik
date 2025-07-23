import { useState, useCallback } from "react";

export const useHamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu toggle fonksiyonu - Sadece state yönetimi
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Menu kapatma fonksiyonu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Menu açma fonksiyonu
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  };
};
