"use client";

import React from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import {
  getBlogBySlug,
  getAllBlogs,
  generateSlug,
} from "../../../utils/mockData";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import { useHeaderNavigation } from "../../../hooks/useHeaderNavigation";

const BlogDetailPage = () => {
  const params = useParams();
  const {
    getNavigationTextUpperCase,
    getNavigationText,
    loading: navLoading,
  } = useHeaderNavigation();
  const blog = getBlogBySlug(params.slug);
  const allBlogs = getAllBlogs();
  const recentPosts = allBlogs.slice(0, 5); // Get first 5 blogs for recent posts

  if (!blog) {
    return (
      <MainLayout headerTheme="dark">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center" style={{ padding: "100px 0" }}>
                <h1>Blog Post Not Found</h1>
                <p>The blog post you&apos;re looking for doesn&apos;t exist.</p>
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

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  return (
    <MainLayout headerTheme="dark">
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
                      textAlign: "left",
                    }}
                  >
                    {navLoading
                      ? "BLOG"
                      : getNavigationTextUpperCase("blog", "BLOG")}
                  </div>
                  <AutoBreadcrumb
                    textColor="black"
                    justifyContent="left"
                    customBreadcrumbs={[
                      {
                        href: "/blog",
                        label: navLoading
                          ? "Blog"
                          : getNavigationText("blog", "Blog"),
                      },
                      {
                        href: `/blog/${params.slug}`,
                        label: blog.title,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container padd-only-xs">
        <div className="row">
          <div className="col-md-9 margin-lg-140t margin-sm-100t margin-lg-90b margin-sm-50b">
            {/* Post content */}
            <div className="post-detailed post-1443 post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized">
              <h2 className="prague-post-title">{blog.title}</h2>

              <div className="prague-post-date">{getTimeAgo(blog.date)}</div>

              <div className="prague-post-thumbnail">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={900}
                  height={400}
                  className="attachment-full size-full"
                />
              </div>

              <div className="prague-post-content-outer">
                <div className="prague-post-content">
                  <div className="pixfields_box">
                    <ul className="pixfields_list">
                      <li className="pixfield">
                        <strong>Category</strong> : {blog.category}
                      </li>
                      <li className="pixfield">
                        <strong>Reading Time</strong> : {blog.readTime}
                      </li>
                    </ul>
                  </div>

                  <p className="lead">{blog.excerpt}</p>

                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                <div className="prague-post-info">
                  <div className="prague-authot-info">
                    <div className="prague-authot-label">CREATED BY</div>
                    <div className="prague-authot-name">{blog.author}</div>
                  </div>

                  <div className="prague-share-icons">
                    <div className="prague-share-label">SHARE TO</div>
                    <button
                      className="icon fa fa-facebook"
                      onClick={() =>
                        window.open(
                          `http://www.facebook.com/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}&t=${encodeURIComponent(blog.title)}`,
                          "_blank"
                        )
                      }
                    ></button>
                    <button
                      className="icon fa fa-twitter"
                      onClick={() =>
                        window.open(
                          `http://twitter.com/home/?status=${encodeURIComponent(
                            blog.title
                          )} - ${encodeURIComponent(window.location.href)}`,
                          "_blank"
                        )
                      }
                      title="Tweet this!"
                    ></button>
                    <button
                      className="icon fa fa-pinterest-p"
                      onClick={() =>
                        window.open(
                          `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                            window.location.href
                          )}&media=${encodeURIComponent(blog.image)}`,
                          "_blank"
                        )
                      }
                    ></button>
                    <button
                      className="icon fa fa-linkedin"
                      onClick={() =>
                        window.open(
                          `http://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
                            blog.title
                          )}&url=${encodeURIComponent(window.location.href)}`,
                          "_blank"
                        )
                      }
                      title="Share on LinkedIn"
                    ></button>
                  </div>
                </div>

                <div className="post-navigation">
                  <ul className="pagination pagination_mod-a">
                    <li>
                      <Link href="/blog">BACK TO BLOG</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End post content */}
          </div>
          <div className="col-md-3 margin-lg-140t margin-sm-50t margin-lg-140b margin-sm-50b">
            <div className="prague-sidebar">
              <div className="prague-widget widget_recent_entries">
                <h3 className="prague-title-w">Recent Posts</h3>
                <ul>
                  {recentPosts.map((post) => (
                    <li key={generateSlug(post.title)}>
                      <Link href={`/blog/${generateSlug(post.title)}`}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogDetailPage;
