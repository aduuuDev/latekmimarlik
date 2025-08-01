import { useEffect, useState } from "react";

export const useParallax = (speed = 0.2, maxOffset = 100) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const calculatedOffset = scrolled * speed;

      // Maksimum offset'i sınırla
      const limitedOffset = Math.min(
        Math.max(calculatedOffset, -maxOffset),
        maxOffset
      );

      setOffset(limitedOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, maxOffset]);

  return offset;
};
