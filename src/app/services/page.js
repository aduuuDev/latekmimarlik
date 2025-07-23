"use client";

import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import ServiceCard from "@/components/ServiceCard";
import { getAllServices } from "../../utils/mockData";

const ServicesPage = () => {
  const services = getAllServices();
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
                  This is what we do.
                </h2>
              </div>

              <div className="js-load-more" style={{ paddingBottom: "40px" }}>
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
                      key={service.id}
                      service={service}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
