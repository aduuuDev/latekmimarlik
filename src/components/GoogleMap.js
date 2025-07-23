"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerIcon, setMarkerIcon] = useState(null);

  // Google Maps API'sini yükle
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDqH-YPOECxBBvFpBoeW3SMsGq2i4lG-kY",
    language: "en",
    preventGoogleFontsLoading: true,
    id: "google-maps-script",
  });

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = useMemo(
    () => ({
      lat: 50.091048,
      lng: 14.445807,
    }),
    []
  );

  const markers = useMemo(
    () => [
      {
        id: 1,
        position: {
          lat: 50.091048,
          lng: 14.445807,
        },
        title: "Prague",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet imperdiet est. Mauris posuere pulvinar scelerisque.",
      },
    ],
    []
  );

  const options = useMemo(
    () => ({
      zoom: 13,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            { saturation: 36 },
            { color: "#333333" },
            { lightness: 40 },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" },
            { lightness: 16 },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#fefefe" }, { lightness: 20 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && window.google?.maps) {
      setMarkerIcon({
        url: "/img/arrow-btn.png",
        scaledSize: new window.google.maps.Size(32, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 32),
      });
    }
  }, [isLoaded]);

  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Loading durumu
  if (loadError) {
    return (
      <div
        style={{
          height: "500px",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
        }}
      >
        <p style={{ color: "#e74c3c", fontSize: "16px" }}>
          Harita yüklenirken hata oluştu
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        style={{
          height: "500px",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #333",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 10px",
            }}
          />
          <p style={{ color: "#999", fontSize: "16px", margin: 0 }}>
            Harita yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="google-map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={options}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={() => onMarkerClick(marker)}
            icon={markerIcon || undefined}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={onInfoWindowClose}
          >
            <div style={{ padding: "10px", maxWidth: "200px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {selectedMarker.title}
              </h4>
              <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                {selectedMarker.description}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GoogleMapComponent;
