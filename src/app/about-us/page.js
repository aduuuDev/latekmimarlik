"use client";

import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";

const AboutUsPage = () => {
  useEffect(() => {
    // Swiper ve diğer JavaScript kütüphanelerini yükle
    const loadScripts = async () => {
      // Swiper
      const Swiper = (await import("swiper")).default;
      const { Navigation, Pagination, Autoplay } = await import(
        "swiper/modules"
      );

      // Testimonials slider
      const testimonialsSwiper = new Swiper(".testimonials-swiper", {
        modules: [Navigation, Pagination, Autoplay],
        speed: 2000,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        direction: "vertical",
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    };

    loadScripts();
  }, []);

  return (
    <MainLayout>
      {/* MAIN BODY */}
      <div className="container-fluid no-padd">
        <div className="row-fluid no-padd">
          <div className="col-sm-12 no-padd">
            <div className="top-banner no-padd simple fullheight light">
              <span className="overlay"></span>
              <Image
                src="/img/about-us/AdobeStock_101771536.jpg"
                alt="banner image"
                width={1920}
                height={1080}
                className="s-img-switch"
              />
              <div className="content">
                <div className="prague-svg-animation-text"></div>
                <div className="subtitle">ABOUT OUR ARCHITECTS</div>
                <h1 className="title">
                  We are based on collective work
                  <br />
                  and shared knowledge
                </h1>
              </div>
              <div className="top-banner-cursor"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container no-padd padd-only-xl">
        <div className="row-fluid margin-lg-70t">
          <div className="no-padd col-sm-10 col-lg-6 col-md-offset-0 col-md-6 col-sm-offset-1 col-xs-12 margin-lg-65t margin-sm-0t">
            <div className="no-padd-md">
              <div className="prague-counter multi_item no-figure">
                <div className="figures">{/* triangle */}</div>
                <div className="counter-outer" style={{ padding: "10px" }}>
                  <Image
                    src="/img/creative-banner/stock-photo-164383998.jpg"
                    alt="numbers photo"
                    width={600}
                    height={400}
                    className="prague-counter-img s-img-switch"
                  />
                  <div className="numbers">
                    <svg>
                      <defs>
                        <mask id="coming_mask_0" x="0" y="0">
                          <rect
                            className="coming-alpha"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                          ></rect>
                          <text
                            className="count number"
                            x="52%"
                            y="47%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            157
                          </text>
                          <text
                            className="count title"
                            x="54%"
                            y="80%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            PROJECTS DONE
                          </text>
                        </mask>
                      </defs>
                      <rect
                        style={{
                          WebkitMask: "url(#coming_mask_0)",
                          mask: "url(#coming_mask_0)",
                        }}
                        className="base"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                      ></rect>
                    </svg>
                    <svg>
                      <defs>
                        <mask id="coming_mask_1" x="0" y="0">
                          <rect
                            className="coming-alpha"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                          ></rect>
                          <text
                            className="count number"
                            x="46%"
                            y="47%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            86
                          </text>
                          <text
                            className="count title"
                            x="46%"
                            y="80%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            HAPPY CLIENTS
                          </text>
                        </mask>
                      </defs>
                      <rect
                        style={{
                          WebkitMask: "url(#coming_mask_1)",
                          mask: "url(#coming_mask_1)",
                        }}
                        className="base"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                      ></rect>
                    </svg>
                    <svg>
                      <defs>
                        <mask id="coming_mask_2" x="0" y="0">
                          <rect
                            className="coming-alpha"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                          ></rect>
                          <text
                            className="count number"
                            x="52%"
                            y="35%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            924
                          </text>
                          <text
                            className="count title"
                            x="54%"
                            y="68%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            WORKING HOURS
                          </text>
                        </mask>
                      </defs>
                      <rect
                        style={{
                          WebkitMask: "url(#coming_mask_2)",
                          mask: "url(#coming_mask_2)",
                        }}
                        className="base"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                      ></rect>
                    </svg>
                    <svg>
                      <defs>
                        <mask id="coming_mask_3" x="0" y="0">
                          <rect
                            className="coming-alpha"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                          ></rect>
                          <text
                            className="count number"
                            x="46%"
                            y="35%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            13
                          </text>
                          <text
                            className="count title"
                            x="46%"
                            y="68%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            AWARDS
                          </text>
                        </mask>
                      </defs>
                      <rect
                        style={{
                          WebkitMask: "url(#coming_mask_3)",
                          mask: "url(#coming_mask_3)",
                        }}
                        className="base"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                      ></rect>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="no-padd col-sm-12 col-lg-offset-1 col-lg-5 col-md-offset-0 col-md-6 col-xs-12 margin-sm-20t">
            <div className="no-padd-md">
              <div className="heading left dark">
                <div className="subtitle">NUMBERS</div>
                <h2 className="title">
                  Make with love
                  <br />
                  all what we do.
                </h2>
                <div className="content">
                  <p>
                    Our team takes over everything, from an idea and concept
                    development to realization. We believe in traditions and
                    incorporate them within our innovations. All our projects
                    incorporate a unique artistic image and functional
                    solutions.
                  </p>
                  <p>
                    Client is the soul of the project. Our main goal is to
                    illustrate his/hers values and individuality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container no-padd">
        <div className="row-fluid margin-lg-15t margin-sm-20t">
          <div className="col-sm-12 no-padd-md">
            <div className="heading left dark">
              <div className="subtitle">TEAM</div>
              <h2 className="title">Experts ready to serve.</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container no-padd margin-lg-60b">
        <div className="row-fluid margin-lg-35t margin-sm-20t">
          <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd-left">
            <div className="column-inner">
              <div className="team-wrapper no-figure">
                <div className="trans_figures enable_anima"></div>
                <div className="team-outer" style={{ height: "380px" }}>
                  <Image
                    src="/img/onepage-home/stock-photo-159782541.jpg"
                    alt="Marry picture"
                    width={400}
                    height={380}
                    className="prague-team-img s-img-switch"
                  />
                </div>
                <div className="position">Architectural Technician</div>
                <div className="name">
                  <h3>Marry Hopkins</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd">
            <div className="vc_column-inner">
              <div className="team-wrapper no-figure">
                <div className="trans_figures enable_anima"></div>
                <div className="team-outer" style={{ height: "380px" }}>
                  <Image
                    src="/img/onepage-home/stock-photo-104982541.jpg"
                    alt="Alfred picture"
                    width={400}
                    height={380}
                    className="prague-team-img s-img-switch"
                  />
                </div>
                <div className="position">Architectural Drafter</div>
                <div className="name">
                  <h3>Alfred Howard</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd">
            <div className="vc_column-inner no-padd-left">
              <div className="team-wrapper no-figure">
                <div className="trans_figures enable_anima"></div>
                <div className="team-outer" style={{ height: "380px" }}>
                  <Image
                    src="/img/onepage-home/stock-photo-173992343.jpg"
                    alt="Thomas picture"
                    width={400}
                    height={380}
                    className="prague-team-img s-img-switch"
                  />
                </div>
                <div className="position">Art Director</div>
                <div className="name">
                  <h3>Thomas Fress</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd">
            <div className="vc_column-inner">
              <div className="team-wrapper no-figure">
                <div className="trans_figures enable_anima"></div>
                <div className="team-outer" style={{ height: "380px" }}>
                  <Image
                    src="/img/onepage-home/stock-photo-75446585.jpg"
                    alt="Hank picture"
                    width={400}
                    height={380}
                    className="prague-team-img s-img-switch"
                  />
                </div>
                <div className="position">Art Director</div>
                <div className="name">
                  <h3>Hank Howard</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd">
            <div className="vc_column-inner no-padd-left">
              <div className="team-wrapper no-figure">
                <div className="trans_figures enable_anima"></div>
                <div className="team-outer" style={{ height: "380px" }}>
                  <Image
                    src="/img/onepage-home/stock-photo-58652792.jpg"
                    alt="Emily picture"
                    width={400}
                    height={380}
                    className="prague-team-img s-img-switch"
                  />
                </div>
                <div className="position">Architect</div>
                <div className="name">
                  <h3>Emily Ratajkovski</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd">
            <div className="vc_column-inner">
              <div className="team-wrapper no-figure">
                <div className="trans_figures enable_anima"></div>
                <div className="team-outer" style={{ height: "380px" }}>
                  <Image
                    src="/img/onepage-home/stock-photo-96254269.jpg"
                    alt="Julia picture"
                    width={400}
                    height={380}
                    className="prague-team-img s-img-switch"
                  />
                </div>
                <div className="position">Architectural Technician</div>
                <div className="name">
                  <h3>Julia Traplin</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="row-fluid no-padd">
        <div className="no-padd col-sm-12">
          <div className="column-inner">
            <div className="prague-shortcode-parent">
              <div className="prague-shortcode-parent-img">
                <span className="overlay"></span>
                <Image
                  src="/img/onepage-home/a6ec5612273735.56265d52bc52e-1.jpg"
                  alt="middle-banner image"
                  width={1920}
                  height={1080}
                  className="s-img-switch"
                />
              </div>

              <div className="prague-shortcode-content-wrapp no-padd-md no-padd-xs">
                <div className="prague-shortcode-heading light left">
                  <div className="parent-subtitle">SERVICES</div>
                  <h2 className="parent-title">This is what we do.</h2>
                </div>

                <div className="row prague_services prague_count_col3 prague_gap_col15 no-footer-content prague-load-wrapper">
                  <div className="portfolio-item-wrapp prague_filter_class">
                    <div className="portfolio-item">
                      <div className="prague-services-wrapper">
                        <span className="services-item-icon icon-circle-compass"></span>
                        <h3 className="services-item-title">Planning</h3>
                        <div className="services-item-description">
                          <p>
                            Our master plans provide a comprehensive look at
                            where an organization is today.
                          </p>
                        </div>
                        <Link
                          href="/planning"
                          className="prague-services-link a-btn-2 creative"
                        >
                          <span className="a-btn-line"></span>
                          READ
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item-wrapp prague_filter_class column_paralax">
                    <div className="portfolio-item">
                      <div className="prague-services-wrapper">
                        <span className="services-item-icon icon-lightbulb"></span>
                        <h3 className="services-item-title">Interior</h3>
                        <div className="services-item-description">
                          <p>
                            You may engage your architect to provide an interior
                            design service, advising on loose furniture.
                          </p>
                        </div>
                        <Link
                          href="/interior"
                          className="prague-services-link a-btn-2 creative"
                        >
                          <span className="a-btn-line"></span>
                          READ
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item-wrapp prague_filter_class">
                    <div className="portfolio-item">
                      <div className="prague-services-wrapper">
                        <span className="services-item-icon icon-layers"></span>
                        <h3 className="services-item-title">Exterior</h3>
                        <div className="services-item-description">
                          <p>
                            Working together with your architect, you will share
                            your project needs, dreams and goals.
                          </p>
                        </div>
                        <Link
                          href="/exterior"
                          className="prague-services-link a-btn-2 creative"
                        >
                          <span className="a-btn-line"></span>
                          READ
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="container no-padd">
        <div className="row-fluid margin-lg-0t margin-sm-20t">
          <div className="col-sm-12 padd-only-xs">
            <div className="no-padd-md">
              <div className="heading left dark">
                <div className="subtitle">TIMELINE</div>
                <h2 className="title">Awards that we have.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container no-padd">
        <div className="row-fluid">
          <div className="col-sm-12 col-md-6 no-padd">
            <div className="no-padd-md">
              <div className="awards-list">
                <div className="awards-item">
                  <div className="awards-date">2016</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/napoli-modern-photography-portfolio-responsive-html-template/18940331?s_rank=1"
                    >
                      <h4 className="awards-title">
                        University of Australia Innovation Quarter
                      </h4>
                    </a>
                    <div className="awards-subtitle">
                      Shortlist (3 Finalist among 400 entries)
                    </div>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-date">2014</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/melbourne-responsive-minimal-portfolio-theme/19120218?s_rank=2"
                    >
                      <h4 className="awards-title">
                        Park Design at Torrelodones
                      </h4>
                    </a>
                    <div className="awards-subtitle">
                      Special Prize of the Jury (2nd Prize)
                    </div>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-date">2013</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/odessa-personal-resume-cv-vcard-wordpress-theme/18318882?s_rank=3"
                    >
                      <h4 className="awards-title">
                        Taipei Museum of Art International Competition
                      </h4>
                    </a>
                    <div className="awards-subtitle">
                      Merit Award (among 590 entries)
                    </div>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-date">2010</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/miami-night-club-responsive-wordpress-theme/18519347?s_rank=4"
                    >
                      <h4 className="awards-title">Intermediae Prado Madrid</h4>
                    </a>
                    <div className="awards-subtitle">1st Accesit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 no-padd">
            <div className="no-padd-md">
              <div className="awards-list">
                <div className="awards-item">
                  <div className="awards-date">2009</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/atlanta-14-unique-creative-agency-portfolio-photography-homepages/16531047?s_rank=5"
                    >
                      <h4 className="awards-title">
                        Center for Professional Activities Competition
                      </h4>
                    </a>
                    <div className="awards-subtitle">Honourable Mention</div>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-date">2009</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/barcelona-premium-wordpress-theme-for-fitness-gym-and-fitness-centers/17602716?s_rank=6"
                    >
                      <h4 className="awards-title">Mediterranean House</h4>
                    </a>
                    <div className="awards-subtitle">1st Prize</div>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-date">2006</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/napoli-modern-photography-portfolio-theme/17963846?s_rank=7"
                    >
                      <h4 className="awards-title">
                        Bancadas Theater spaces, Dance and Music
                      </h4>
                    </a>
                    <div className="awards-subtitle">Honourable Mention</div>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-date">2005</div>
                  <span className="awards-separator"></span>
                  <div className="awards-info">
                    <a
                      className="awards-title-link"
                      href="https://themeforest.net/item/fullscreen-photography-photo-session-protected-gallery-wordpress-theme-marseille/17603025?s_rank=8"
                    >
                      <h4 className="awards-title">Construtec La Paloma</h4>
                    </a>
                    <div className="awards-subtitle">Construtec La Paloma</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container no-padd margin-lg-10b">
        <div className="row-fluid margin-lg-10t margin-sm-20t">
          <div className="col-sm-12 no-padd">
            <div className="no-padd-md">
              <div className="heading left dark">
                <div className="subtitle">TESTIMONIALS</div>
                <h2 className="title">They love us.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container margin-lg-140b">
        <div className="row row-fluid margin-lg-10t no-padd-md">
          <div className="testimonials-wrapper no-figure">
            <div className="testimonials-swiper swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonials-item">
                    <span className="testimonials-icon fa fa fa-quote-right"></span>
                    <blockquote className="testimonials-description">
                      <p>
                        Incredible as always. This guys have excellent
                        taste,modeling, texturing &amp; rendering skills. The
                        design fits in with what I would perceive as being
                        Icelandic, the high wooden roof design and linear
                        slatted interior elements and colours.
                      </p>
                    </blockquote>
                    <h4 className="testimonials-author">Mark Eganberg</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-item">
                    <span className="testimonials-icon fa fa fa-quote-right"></span>
                    <blockquote className="testimonials-description">
                      <p>
                        Incredible as always. This guys have excellent
                        taste,modeling, texturing &amp; rendering skills. The
                        design fits in with what I would perceive as being
                        Icelandic, the high wooden roof design and linear
                        slatted interior elements and colours.
                      </p>
                    </blockquote>
                    <h4 className="testimonials-author">Jennifer Hilbertson</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-item">
                    <span className="testimonials-icon fa fa fa-quote-right"></span>
                    <blockquote className="testimonials-description">
                      <p>
                        Incredible as always. This guys have excellent
                        taste,modeling, texturing &amp; rendering skills. The
                        design fits in with what I would perceive as being
                        Icelandic, the high wooden roof design and linear
                        slatted interior elements and colours.
                      </p>
                    </blockquote>
                    <h4 className="testimonials-author">Lesley Grand</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonials-item">
                    <span className="testimonials-icon fa fa fa-quote-right"></span>
                    <blockquote className="testimonials-description">
                      <p>
                        Incredible as always. This guys have excellent
                        taste,modeling, texturing &amp; rendering skills. The
                        design fits in with what I would perceive as being
                        Icelandic, the high wooden roof design and linear
                        slatted interior elements and colours.
                      </p>
                    </blockquote>
                    <h4 className="testimonials-author">John Frick</h4>
                  </div>
                </div>
              </div>
              <div className="testimonials-pagination-wrapper">
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
