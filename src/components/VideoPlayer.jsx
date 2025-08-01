"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({
  src,
  coverImage = "/img/about-us/beautiful-shot-oresund-bridge-sweden-enveloped-fog.jpg",
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.matchMedia("(max-width: 768px)").matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return; // Sadece mobil cihazlarda scroll listener çalışsın

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Video pop-up'ı
  if (showVideo) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            maxHeight: "80vh",
          }}
        >
          <button
            onClick={handleCloseVideo}
            style={{
              position: "absolute",
              top: "-40px",
              right: "0",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ✕
          </button>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="auto"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
            }}
          >
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      </div>
    );
  }

  // Scroll efekti için hesaplamalar
  const getParallaxOffset = () => {
    if (!isMobile) return 0;

    // Basit parallax: scroll pozisyonunun bir kısmını kullan
    return scrollY * 0.5; // 0.5 parallax hızı
  };

  // Arka plan görseli ve oynatma butonu (parallax efektli)
  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Desktop için parallax background */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            zIndex: 1,
          }}
        />
      )}

      {/* Mobil için scroll efektli background */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "130%", // Daha büyük yapıyoruz ki scroll efekti gözüksün
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: `translateY(${getParallaxOffset()}px)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Oynatma butonu */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80px",
          height: "80px",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          zIndex: 2,
        }}
        onClick={handlePlayClick}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "15px solid transparent",
            borderBottom: "15px solid transparent",
            borderLeft: "25px solid #333",
            marginLeft: "5px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default VideoPlayer;
