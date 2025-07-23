"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getAllServices } from "../../../utils/mockData";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

const ServiceDetailPage = () => {
  const params = useParams();
  const service = getServiceBySlug(params.slug);
  const allServices = getAllServices();

  if (!service) {
    return (
      <MainLayout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center" style={{ padding: "100px 0" }}>
                <h1>Service Not Found</h1>
                <p>The service you're looking for doesn't exist.</p>
                <Link href="/" className="a-btn creative anima">
                  <span className="a-btn-line"></span>
                  GO HOME
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
          backgroundImage: "url('/img/bottom-view-building-facade.jpg')",
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
                    }}
                  >
                    SERVICES
                  </div>
                  <AutoBreadcrumb
                    textColor="black"
                    justifyContent="left"
                    customBreadcrumbs={[
                      {
                        href: "/services",
                        label: "Services",
                      },
                      {
                        href: `/services/${params.slug}`,
                        label: service.title,
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
                {service.title}
              </h1>
              <img
                src={service.detailContent.image}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: "30px",
                  borderRadius: "8px",
                }}
              />
              <div
                className="rich-content"
                dangerouslySetInnerHTML={{
                  __html: service.detailContent.content,
                }}
              />
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
                  Other Services
                </h1>
                <ul style={{ paddingLeft: "30px", color: "#7e7d7d" }}>
                  {allServices.map((service, index) => (
                    <li key={index}>
                      <Link href={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="service-contact" style={{ paddingTop: "20px" }}>
                  <h4>Need This Service?</h4>
                  <p>Contact us to discuss your project requirements.</p>
                  <Link href="/contact-us" className="a-btn-2 creative anima">
                    <span className="a-btn-line"></span>
                    CONTACT US
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
