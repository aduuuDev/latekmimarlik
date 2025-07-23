"use client";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import { getAllBlogs } from "../../utils/mockData";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

export default function Blog() {
  const blogPosts = getAllBlogs();

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
                    BLOG
                  </div>
                  <AutoBreadcrumb textColor="black" justifyContent="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog List Content */}
      <div className="container-fluid no-padd">
        <div className="row-fluid no-padd margin-xs-20t">
          <div className="col-sm-12 no-padd">
            <div className="no-padd">
              <div className="row prague_blog prague_count_col1 prague_gap_col10 no-footer-content">
                {blogPosts.map((post, index) => (
                  <div key={index} className="blog-post col-xs-12">
                    <div className="prague-blog-list-wrapper">
                      <div className="blog-list-img">
                        <Image
                          src={post.image}
                          alt="blog image"
                          width={1200}
                          height={800}
                          className="s-img-switch"
                        />
                      </div>
                      <div className="blog-list-content">
                        <div className="blog-list-post-date">{post.date}</div>
                        <h3 className="blog-list-post-title">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <div className="blog-list-post-excerpt">
                          <p>{post.excerpt}</p>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="blog-list-link a-btn-arrow-2"
                        >
                          <span className="arrow-right"></span>
                          READ
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
