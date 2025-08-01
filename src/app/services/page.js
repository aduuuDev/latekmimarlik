"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import ServiceCard from "@/components/ServiceCard";
import { useLanguage, getText } from "@/context/LanguageContext";

const ServicesPage = () => {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sayfa verilerini ve servisleri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sayfa verilerini çek
        const pageResponse = await fetch('/api/services-page');
        const pageResult = await pageResponse.json();
        
        if (pageResult.success) {
          setPageData(pageResult.data);
        } else {
          console.error('Sayfa verileri alınamadı:', pageResult);
        }
        
        // Servisleri çek
        const servicesResponse = await fetch('/api/services');
        const servicesResult = await servicesResponse.json();
        
        if (servicesResult.success) {
          console.log('Servisler başarıyla alındı:', servicesResult.data);
          setServices(servicesResult.data || []);
        } else {
          console.error('Servisler alınamadı:', servicesResult);
          // Varsayılan dummy veri oluştur
          setServices([
            {
              _id: 'dummy1',
              title: { tr: 'Mimari Tasarım', en: 'Architectural Design' },
              slug: 'mimari-tasarim',
              description: { 
                tr: 'Uzman ekibimiz ile modern ve fonksiyonel mimari tasarım hizmeti sunuyoruz.', 
                en: 'We provide modern and functional architectural design services with our expert team.' 
              },
              detailContent: { featuredImage: '/img/services/service1.jpg' }
            },
            {
              _id: 'dummy2',
              title: { tr: 'İç Mimarlık', en: 'Interior Design' },
              slug: 'ic-mimarlik',
              description: { 
                tr: 'Mekanlarınıza özgün ve şık iç tasarım çözümleri.', 
                en: 'Unique and elegant interior design solutions for your spaces.' 
              },
              detailContent: { featuredImage: '/img/services/service2.jpg' }
            },
            {
              _id: 'dummy3',
              title: { tr: 'Proje Yönetimi', en: 'Project Management' },
              slug: 'proje-yonetimi',
              description: { 
                tr: 'Projelerinizin her aşamasında profesyonel yönetim desteği.', 
                en: 'Professional management support at every stage of your projects.' 
              },
              detailContent: { featuredImage: '/img/services/service3.jpg' }
            }
          ]);
        }
      } catch (error) {
        console.error('Veri çekilirken hata:', error);
        // Hata durumunda dummy data göster
        setServices([
          {
            _id: 'dummy1',
            title: { tr: 'Mimari Tasarım', en: 'Architectural Design' },
            slug: 'mimari-tasarim',
            description: { 
              tr: 'Uzman ekibimiz ile modern ve fonksiyonel mimari tasarım hizmeti sunuyoruz.', 
              en: 'We provide modern and functional architectural design services with our expert team.' 
            },
            detailContent: { featuredImage: '/img/services/service1.jpg' }
          },
          {
            _id: 'dummy2',
            title: { tr: 'İç Mimarlık', en: 'Interior Design' },
            slug: 'ic-mimarlik',
            description: { 
              tr: 'Mekanlarınıza özgün ve şık iç tasarım çözümleri.', 
              en: 'Unique and elegant interior design solutions for your spaces.' 
            },
            detailContent: { featuredImage: '/img/services/service2.jpg' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid rgba(0,0,0,0.1)', 
              borderRadius: '50%', 
              borderTopColor: '#1976d2', 
              animation: 'spin 1s ease-in-out infinite',
              margin: '0 auto 15px'
            }}></div>
            <p>Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout headerTheme="dark">
      {/* Top Banner Section */}
      <div
        className="container-fluid no-padd margin-lg-75t margin-sm-30t margin-md-50t"
        style={{
          backgroundImage: `url('${pageData?.heroBanner?.backgroundImage || "/img/bottom-view-building-facade.jpg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "300px",
        }}
      >
        <div className="container no-padd">
          <div className="row-fluid">
            <div className="col-sm-12 text-center">
              <div className="heading center dark margin-md-30b margin-sm-20b">
                <div className="content">
                  <div
                    className="subtitle"
                    style={{
                      fontSize: "24px",
                      padding: "50px 0 0 0",
                      fontWeight: "400",
                      textAlign: "left",
                    }}
                  >
                    {getText(pageData?.heroBanner?.title, language, "SERVICES")}
                  </div>
                  <AutoBreadcrumb textColor="black" justifyContent="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services List Section */}
      <div className="row-fluid row-no-padding">
        <div className="column-inner">
          <div className="prague-shortcode-parent">
            <div className="prague-shortcode-content-wrapp">
              <div className="prague-shortcode-heading light left">
                <h2 className="parent-title" style={{ color: "#111111" }}>
                  {getText(pageData?.contentSection?.title, language, "This is what we do.")}
                </h2>
              </div>

              <div className="js-load-more" style={{ paddingBottom: "40px" }}>
                {services.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <p>{getText({ 
                      tr: "Henüz hizmet bulunmuyor.", 
                      en: "No services found.", 
                      de: "Keine Dienstleistungen gefunden.",
                      ar: "لم يتم العثور على خدمات."
                    }, language)}</p>
                  </div>
                ) : (
                  <div
                    className="prague_services"
                    style={{
                      display: "grid",
                      gap: "30px",
                      gridTemplateColumns:
                        services.length === 2
                          ? "1fr 1fr"
                          : services.length === 3
                          ? "1fr 1fr 1fr"
                          : services.length === 4
                          ? "1fr 1fr"
                          : "repeat(auto-fill, minmax(300px, 1fr))", // 5 ve üstü
                    }}
                  >
                  {services.map((service, index) => (
                    <ServiceCard
                      key={service._id}
                      service={{
                        ...service,
                        title: getText(service.title, language, "Service"),
                        description: getText(service.description, language, ""),
                      }}
                      className={
                        index === 1
                          ? "p_f_f9e81a7 column_paralax"
                          : index === 2
                          ? "p_f_f9e81a7"
                          : ""
                      }
                    />
                  ))}
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
