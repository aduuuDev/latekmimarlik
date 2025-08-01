import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateSlug } from "../utils/mockData";

const BlogCard = ({ blog, className = "" }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`col-sm-6 col-md-3 no-padd-small ${className}`}>
      <div className="prague-clients-wrapper blog-card-wrapper">
        <Image
          className="prague-clients-logo blog-card-image"
          src={blog.image}
          alt={blog.title}
          width={400}
          height={400}
          loading="lazy"
          priority={false}
        />

        <div className="client-static-text blog-card-content">
          <div className="blog-category">{blog.category}</div>
          <h3 className="blog-title">{blog.title}</h3>
          <div className="blog-meta">
            <span className="blog-date">{formatDate(blog.date)}</span>
            <span className="blog-read-time">{blog.readTime}</span>
          </div>
        </div>

        <div className="prague-clients-overlay blog-card-overlay"></div>

        <div className="vertical-align prague-clients-link blog-card-link">
          <Link
            href={`/blog/${generateSlug(blog.title)}`}
            className="prague-clients-name a-btn-arrow"
          >
            READ MORE <span className="arrow-right grey"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
