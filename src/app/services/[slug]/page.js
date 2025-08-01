"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import {
  getServiceBySlug,
  getAllServices,
  generateSlug,
} from "../../../utils/mockData";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import { useLanguage, getText } from "@/context/LanguageContext";

const ServiceDetailPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Servis verilerini çek
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services?slug=${params.slug}`);
        const result = await response.json();

        if (result.success) {
          setService(result.data);
        } else {
          setError("Servis bulunamadı");
        }
      } catch (error) {
        console.error("Servis detayı çekilirken hata:", error);
        setError("Servis detayı çekilirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    // Tüm servisleri çek
    const fetchAllServices = async () => {
      try {
        const response = await fetch("/api/services");
        const result = await response.json();

        if (result.success) {
          // Şu anki servisi hariç tut
          setRelatedServices(result.data.filter((s) => s.slug !== params.slug));
        }
      } catch (error) {
        console.error("Servisler çekilirken hata:", error);
      }
    };

    fetchService();
    fetchAllServices();
  }, [params.slug]);

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid rgba(0,0,0,0.1)",
                borderRadius: "50%",
                borderTopColor: "#1976d2",
                animation: "spin 1s ease-in-out infinite",
                margin: "0 auto 15px",
              }}
            ></div>
            <p>Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state or service not found
  if (error || !service) {
    return (
      <MainLayout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center" style={{ padding: "100px 0" }}>
                <h1>
                  {getText(
                    {
                      tr: "Servis Bulunamadı",
                      en: "Service Not Found",
                      de: "Service nicht gefunden",
                      ar: "الخدمة غير موجودة",
                    },
                    language
                  )}
                </h1>
                <p>
                  {getText(
                    {
                      tr: "Aradığınız servis bulunamadı veya kaldırılmış olabilir.",
                      en: "The service you&apos;re looking for doesn&apos;t exist or may have been removed.",
                      de: "Der gesuchte Service existiert nicht oder wurde möglicherweise entfernt.",
                      ar: "الخدمة التي تبحث عنها غير موجودة أو ربما تمت إزالتها.",
                    },
                    language
                  )}
                </p>
                <Link href="/" className="a-btn creative anima">
                  <span className="a-btn-line"></span>
                  {getText(
                    {
                      tr: "ANA SAYFA",
                      en: "GO HOME",
                      de: "ZUR STARTSEITE",
                      ar: "الذهاب إلى الصفحة الرئيسية",
                    },
                    language
                  )}
                </Link>
              </div>
            </div>
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
          backgroundImage: `url('${
            service.detailContent?.bannerImage ||
            service.detailContent?.featuredImage ||
            "/img/bottom-view-building-facade.jpg"
          }')`,
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
                    {getText(
                      {
                        tr: "HİZMETLERİMİZ",
                        en: "OUR SERVICES",
                        de: "UNSERE DIENSTLEISTUNGEN",
                        ar: "خدماتنا",
                      },
                      language
                    )}
                  </div>
                  <AutoBreadcrumb
                    textColor="black"
                    justifyContent="left"
                    customBreadcrumbs={[
                      {
                        href: "/services",
                        label: getText(
                          {
                            tr: "Hizmetler",
                            en: "Services",
                            de: "Dienstleistungen",
                            ar: "الخدمات",
                          },
                          language
                        ),
                      },
                      {
                        href: `/services/${params.slug}`,
                        label: getText(service.title, language, ""),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row">
          {/* SOL TARAFTA DETAY İÇERİK */}
          <div
            className="only-lg-pr col-lg-8 col-md-8 col-sm-12 col-xs-12 "
            style={{ paddingBottom: "30px" }}
          >
            <div className="service-content">
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                {getText(service.title, language, "")}
              </h1>
              {service.detailContent?.featuredImage && (
                <Image
                  src={service.detailContent.featuredImage}
                  alt={getText(service.title, language, "")}
                  width={800}
                  height={450}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "30px",
                    borderRadius: "8px",
                  }}
                />
              )}
              {service.detailContent?.description && (
                <div className="margin-lg-20b">
                  <p className="lead">
                    {getText(service.detailContent.description, language, "")}
                  </p>
                </div>
              )}
              {service.detailContent?.content && (
                <div
                  className="rich-content"
                  dangerouslySetInnerHTML={{
                    __html: getText(
                      service.detailContent.content,
                      language,
                      ""
                    ),
                  }}
                />
              )}
              Gallery Images
              {service.detailContent?.gallery &&
                service.detailContent.gallery.length > 0 && (
                  <div className="service-gallery margin-lg-30t margin-lg-30b">
                    <h3 style={{ marginBottom: "20px" }}>
                      {getText(
                        {
                          tr: "Galeri",
                          en: "Gallery",
                          de: "Galerie",
                          ar: "معرض الصور",
                        },
                        language
                      )}
                    </h3>
                    <div
                      className="gallery gallery-columns-2 gallery-size-full flex"
                      style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
                    >
                      {service.detailContent.gallery.map((image, index) => (
                        <figure
                          key={`gallery-${index}`}
                          className="gallery-item"
                          style={{
                            flex: "0 0 calc(50% - 15px)",
                            margin: 0,
                            overflow: "hidden",
                            borderRadius: "8px",
                          }}
                        >
                          <div className="gallery-icon landscape">
                            <Image
                              src={image}
                              alt={`${getText(
                                service.title,
                                language,
                                ""
                              )} image ${index + 1}`}
                              width={600}
                              height={400}
                              className="attachment-full size-full"
                              style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: "8px",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* SAĞ TARAFTA SIDEBAR */}
          <div
            className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={{ paddingBottom: "30px" }}
          >
            <div className="service-sidebar">
              <div className="service-info">
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  {getText(
                    {
                      tr: "Diğer Hizmetlerimiz",
                      en: "Other Services",
                      de: "Andere Dienstleistungen",
                      ar: "خدمات أخرى",
                    },
                    language
                  )}
                </h1>
                <ul style={{ paddingLeft: "30px", color: "#7e7d7d" }}>
                  {relatedServices.map((relService) => (
                    <li key={relService._id}>
                      <Link href={`/services/${relService.slug}`}>
                        {getText(relService.title, language, "")}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="service-contact" style={{ paddingTop: "20px" }}>
                  <h4>
                    {getText(
                      {
                        tr: "Bu Hizmete İhtiyacınız Var Mı?",
                        en: "Need This Service?",
                        de: "Brauchen Sie diesen Service?",
                        ar: "هل تحتاج هذه الخدمة؟",
                      },
                      language
                    )}
                  </h4>
                  <p>
                    {getText(
                      {
                        tr: "Proje gereksinimlerinizi görüşmek için bizimle iletişime geçin.",
                        en: "Contact us to discuss your project requirements.",
                        de: "Kontaktieren Sie uns, um Ihre Projektanforderungen zu besprechen.",
                        ar: "اتصل بنا لمناقشة متطلبات مشروعك.",
                      },
                      language
                    )}
                  </p>
                  <Link href="/contact-us" className="a-btn-2 creative anima">
                    <span className="a-btn-line"></span>
                    {getText(
                      {
                        tr: "BİZE ULAŞIN",
                        en: "CONTACT US",
                        de: "KONTAKTIERE UNS",
                        ar: "اتصل بنا",
                      },
                      language
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetailPage;
