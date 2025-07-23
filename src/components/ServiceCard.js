import React from "react";
import Link from "next/link";

const ServiceCard = ({ service, className = "" }) => {
  return (
    <div className={`portfolio-item-wrapp prague_filter_class ${className}`}>
      <div className="portfolio-item">
        <div
          className="prague-services-wrapper"
          style={{
            height: "350px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "50px",
            boxSizing: "border-box",
          }}
        >
          <h3
            className="services-item-title"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // max 2 satır başlık
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "70px",
            }}
          >
            {service.title}
          </h3>
          <div className="services-item-description">
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {service.description}
            </p>
          </div>
          <Link
            href={`/services/${service.slug}`}
            className="prague-services-link a-btn-2 creative anima"
            style={{
              width: "fit-content",
            }}
          >
            <span className="a-btn-line"></span>
            READ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
