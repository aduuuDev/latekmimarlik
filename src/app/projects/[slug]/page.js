"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../layouts/MainLayout";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "../../../utils/mockData";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

const ProjectDetailPage = () => {
  const params = useParams();
  const project = getProjectBySlug(params.slug);
  const allProjects = getAllProjects();

  if (!project) {
    return (
      <MainLayout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center" style={{ padding: "100px 0" }}>
                <h1>Project Not Found</h1>
                <p>The project you're looking for doesn't exist.</p>
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
                        href: "/projects",
                        label: "Projects",
                      },
                      {
                        href: `/projects/${params.slug}`,
                        label: project.title,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="container no-padd margin-lg-135t margin-xs-100t margin-lg-135b margin-sm-100b">
        <div className="row-fluid no-padd ">
          <div className="vc_column_container col-sm-5 no-padd">
            <div className="padd-right-only-lg">
              <div className="heading left dark no-padd-top">
                <div className="subtitle align-left">{project.category}</div>
                <h2 className="title align-left">{project.title}</h2>
                <div className="content align-left">
                  <p>{project.excerpt}</p>
                  {project.description && <p>{project.description}</p>}
                </div>
              </div>
              <div className="project-detail-splitted-info ">
                <div className="project-detail-block-outer">
                  <div className="project-detail-block-wrapper">
                    <div className="project-detail-block-item">
                      <div className="project-detail-block-title">
                        LOCATION{" "}
                      </div>
                      <div className="project-detail-block-descr">
                        <p>{project.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-detail-block-outer">
                  <div className="project-detail-block-wrapper">
                    <div className="project-detail-block-item">
                      <div className="project-detail-block-title">YEAR </div>
                      <div className="project-detail-block-descr">
                        <p>{project.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-detail-splitted-info">
                <div className="prague-share-icons ">
                  <div className="prague-share-label">SHARE PROJECT</div>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const title = encodeURIComponent(project.title);
                      window.open(
                        `http://www.facebook.com/sharer.php?u=${url}&t=${title}`,
                        "_blank"
                      );
                    }}
                    className="icon fa fa-facebook"
                  ></button>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const title = encodeURIComponent(project.title);
                      window.open(
                        `http://twitter.com/home/?status=${title} - ${url}`,
                        "_blank"
                      );
                    }}
                    className="icon fa fa-twitter"
                  ></button>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const title = encodeURIComponent(project.title);
                      window.open(
                        `http://www.linkedin.com/shareArticle?mini=true&title=${title}&url=${url}`,
                        "_blank"
                      );
                    }}
                    className="icon fa fa-linkedin"
                  ></button>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const media = encodeURIComponent(project.image);
                      window.open(
                        `http://pinterest.com/pin/create/button/?url=${url}&media=${media}`,
                        "_blank"
                      );
                    }}
                    className="icon fa fa-pinterest-p"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div className="vc_column_container col-sm-7  margin-xs-50t no-padd">
            <div className="no-padd-inner ">
              {project.gallery && project.gallery.length > 0
                ? project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="wpb_single_image wpb_content_element margin-bottom"
                    >
                      <figure>
                        <div className="vc_single_image-wrapper   vc_box_border_grey">
                          <img
                            src={image}
                            alt={`${project.title} image ${index + 1}`}
                            onError={(e) => {
                              e.target.src = project.image; // Fallback to main project image
                            }}
                          />
                        </div>
                      </figure>
                    </div>
                  ))
                : // Fallback images if no gallery
                  [1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="wpb_single_image wpb_content_element margin-bottom"
                    >
                      <figure>
                        <div className="vc_single_image-wrapper   vc_box_border_grey">
                          <img
                            src={project.image}
                            alt={`${project.title} image ${index}`}
                          />
                        </div>
                      </figure>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <div className="container margin-lg-120t margin-sm-80t margin-xs-20b margin-md-30b margin-lg-60b">
        <div className="row">
          <div className="col-12">
            <div className="heading center dark margin-md-30b margin-sm-20b">
              <h2 className="title">Other Projects</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {allProjects
            .filter((p) => p.slug !== project.slug)
            .slice(0, 3)
            .map((relatedProject) => (
              <div key={relatedProject.id} className="col-md-4 col-sm-6">
                <div className="project-list-outer">
                  <div className="project-list-wrapper">
                    <div className="project-list-img">
                      <img
                        src={relatedProject.image}
                        className="s-img-switch"
                        alt={`${relatedProject.title} image`}
                      />
                    </div>
                    <div className="project-list-content">
                      <div className="project-list-category">
                        {relatedProject.year}
                      </div>
                      <h3 className="project-list-title">
                        <Link
                          href={`/projects/${relatedProject.slug}`}
                          target="_self"
                        >
                          {relatedProject.title}
                        </Link>
                      </h3>
                      <div className="project-list-excerpt">
                        <p>{relatedProject.excerpt}</p>
                      </div>
                      <Link
                        href={`/projects/${relatedProject.slug}`}
                        className="project-list-link a-btn-arrow-2"
                        target="_self"
                      >
                        <span className="arrow-right"></span>
                        READ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetailPage;
