'use client';

import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import GoogleMapComponent from "../components/GoogleMap";
import TestimonialsSlider from "../components/TestimonialsSlider";
import ServiceCard from "../components/ServiceCard";
import BlogCard from "../components/BlogCard";
import SeoHead from "../components/SeoHead";
import { getRecentServices, getRecentBlogs } from "../utils/mockData";
import { useLanguage, getText } from "../context/LanguageContext";

const HomePage = () => {
  const services = getRecentServices(3);
  const recentBlogs = getRecentBlogs(4);
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Anasayfa verilerini API'den çek
    const fetchHomepageData = async () => {
      try {
        const response = await fetch('/api/homepage');
        const result = await response.json();
        
        if (result.success) {
          setHomepageData(result.data);
        } else {
          console.error('Anasayfa verisi alınamadı:', result.message);
        }
      } catch (error) {
        console.error('Anasayfa verisi çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomepageData();
  }, []);
  return (
    <MainLayout>
      {homepageData?.seo && <SeoHead seoData={homepageData.seo} />}
      {/* Hero Banner */}
      <div className="container-fluid no-padd">
        <div className="row no-padd">
          <div className="col-xs-12 no-padd">
            <div className="top-banner no-padd big fullheight light">
              <span className="overlay"></span>
              <Image
                src={homepageData?.heroBanner?.backgroundImage || "https://picsum.photos/1920/1080"}
                alt="banner image"
                width={1920}
                height={1080}
                className="s-img-switch"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 200,
                }}
              />
              <div className="content">
                <div className="prague-svg-animation-text"></div>
                <div className="subtitle">
                  {getText(homepageData?.heroBanner?.subtitle, language, "WE DO INTERIOR & EXTERIOR OF")}
                </div>
                <h1 className="title">
                  {getText(homepageData?.heroBanner?.title, language, "Tampere Arena Libeskind")}
                </h1>
                <Link
                  href={homepageData?.heroBanner?.buttonLink || "/contact-us"}
                  className="a-btn creative anima"
                  target="_blank"
                >
                  <span className="a-btn-line"></span>
                  {getText(homepageData?.heroBanner?.buttonText, language, "BİZE ULAŞIN")}
                </Link>
              </div>
              <div className="top-banner-cursor"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container no-padd padding-bottom-50">
        <div className="row-fluid margin-lg-70t">
          <div className="column col-sm-10 col-lg-6 col-md-offset-0 col-md-6 col-sm-offset-1 col-xs-12 margin-lg-65t margin-sm-0t no-padd">
            <div className="no-padd-inner">
              <div className="prague-counter multi_item no-figure">
                <div className="figures">{/* triangle */}</div>
                <div className="counter-outer" style={{ padding: "10px" }}>
                  <Image
                    src={homepageData?.numbersSection?.image || "https://picsum.photos/seed/architecture-numbers/600/400"}
                    alt="numbers photo"
                    width={600}
                    height={400}
                    className="prague-counter-img s-img-switch"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column col-sm-12 col-lg-offset-1 col-lg-5 col-md-offset-0 col-md-6 col-xs-12 margin-sm-20t padd-only-xs">
            <div className="padd-only">
              <div className="heading left dark">
                <div className="subtitle">
                  {getText(homepageData?.numbersSection?.subtitle, language, "NUMBERS")}
                </div>
                <h2 className="title">
                  {homepageData?.numbersSection?.title ? (
                    getText(homepageData.numbersSection.title, language, "Make with love\nall what we do.").split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}{i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      Make with love
                      <br />
                      all what we do.
                    </>
                  )}
                </h2>
                <div className="content padding-xs-40b">
                  {homepageData?.numbersSection?.content ? (
                    getText(homepageData.numbersSection.content, language, "Our team takes over everything, from an idea and concept development to realization. We believe in traditions and incorporate them within our innovations. All our projects incorporate a unique artistic image and functional solutions.\n\nClient is the soul of the project. Our main goal is to illustrate his/hers values and individuality.").split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="row-fluid row-no-padding">
        <div className="no-padd col-sm-12">
          <div className="column-inner">
            <div className="prague-shortcode-parent">
              <div className="prague-shortcode-parent-img">
                <span className="overlay"></span>
                <Image
                  src={homepageData?.servicesSection?.backgroundImage || "https://picsum.photos/seed/services-banner/1920/468"}
                  alt="middle-banner image"
                  className="s-img-switch"
                  width={1920}
                  height={468}
                  priority={false}
                  loading="lazy"
                  style={{ width: "100%", height: "468px" }}
                />
              </div>

              <div className="prague-shortcode-content-wrapp">
                <div className="prague-shortcode-heading light left">
                  <div className="parent-subtitle">
                    {getText(homepageData?.servicesSection?.subtitle, language, "SERVICES")}
                  </div>
                  <h2 className="parent-title">
                    {getText(homepageData?.servicesSection?.title, language, "This is what we do.")}
                  </h2>
                </div>

                <div className="js-load-more">
                  <div className="row prague_services prague_count_col3 prague_gap_col15">
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
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <Link
                      href={homepageData?.servicesSection?.buttonLink || "/services"}
                      className="load-btn a-btn-2 creative js-load-more-btn anima"
                    >
                      <span className="a-btn-line load"></span>
                      {getText(homepageData?.servicesSection?.buttonText, language, "LOAD MORE")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}

      <TestimonialsSlider />

      {/* Projects Section */}
      <div className="container no-padd">
        <div className="row-fluid margin-lg-55t margin-sm-20t">
          <div className="col-sm-12 no-padd margin-lg-20b margin-xs-40t">
            <div className="padd-only-xs">
              <div className="heading left dark">
                <div className="subtitle">
                  {getText(homepageData?.projectsSection?.subtitle, language, "LAST PROJECTS")}
                </div>
                <h2 className="title">
                  {getText(homepageData?.projectsSection?.title, language, "Make it with passion.")}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row-fluid margin-lg-5t margin-lg-140b margin-sm-70b no-padd">
          <div className="column no-padd column_container col-sm-12 margin-lg-5t margin-lg-140b margin-sm-70b">
            <div className="column-inner">
              <div className="wrapper">
                <div className="row prague_grid prague_count_col3 prague_gap_col15 js-load-more-block no-footer-content prague-load-wrapper">
                  <div className="portfolio-item-wrapp portfolio-item-paralax js-filter-simple-block">
                    <div className="portfolio-item">
                      <div className="project-grid-wrapper">
                        <Link
                          className="project-grid-item-img-link"
                          href="/seascape-villa"
                        >
                          <div className="project-grid-item-img">
                            <Image
                              src="https://picsum.photos/seed/seascape-villa/768/512"
                              alt="seascape-villa image"
                              width={768}
                              height={512}
                              className="s-img-switch"
                            />
                          </div>
                        </Link>
                        <div className="project-grid-item-content">
                          <h4 className="project-grid-item-title">
                            <Link href="/seascape-villa">Seascape Villa</Link>
                          </h4>
                          <div className="project-grid-item-category">
                            Aqaba, Jordan
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item-wrapp portfolio-item-paralax js-filter-simple-block">
                    <div className="portfolio-item">
                      <div className="project-grid-wrapper">
                        <Link
                          className="project-grid-item-img-link"
                          href="/european-lard-station"
                        >
                          <div className="project-grid-item-img">
                            <Image
                              src="https://picsum.photos/seed/european-station/768/426"
                              alt="european-lard-station image"
                              width={768}
                              height={426}
                              className="s-img-switch"
                            />
                          </div>
                        </Link>
                        <div className="project-grid-item-content">
                          <h4 className="project-grid-item-title">
                            <Link href="/european-lard-station">
                              European Lard Station
                            </Link>
                          </h4>
                          <div className="project-grid-item-category">
                            Strasbourg, France
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item-wrapp portfolio-item-paralax js-filter-simple-block">
                    <div className="portfolio-item">
                      <div className="project-grid-wrapper">
                        <Link
                          className="project-grid-item-img-link"
                          href="/yabroudi-villa"
                        >
                          <div className="project-grid-item-img">
                            <Image
                              src="https://picsum.photos/seed/yabroudi-villa/768/492"
                              alt="yabroudi-villa image"
                              width={768}
                              height={492}
                              className="s-img-switch"
                            />
                          </div>
                        </Link>
                        <div className="project-grid-item-content">
                          <h4 className="project-grid-item-title">
                            <Link href="/yabroudi-villa">Yabroudi Villa</Link>
                          </h4>
                          <div className="project-grid-item-category">
                            Dubai, United Arab Emirates
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 text-center">
                    <Link
                      href={homepageData?.projectsSection?.buttonLink || "/projects"}
                      className="load-btn a-btn-2 creative js-load-more-btn anima"
                    >
                      <span className="a-btn-line load"></span>
                      {getText(homepageData?.projectsSection?.buttonText, language, "LOAD MORE")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="row-fluid row-no-padding margin-lg-105t margin-sm-50t">
        <div className="column_container col-sm-12 no-padd">
          <div className="column-inner">
            <div className="prague-shortcode-parent">
              <div className="prague-shortcode-parent-img">
                <span className="overlay"></span>
                <Image
                  src={homepageData?.blogSection?.backgroundImage || "https://picsum.photos/seed/clients-banner/1920/468"}
                  alt="middle-banner image"
                  className="s-img-switch"
                  width={1920}
                  height={468}
                  priority={false}
                  loading="lazy"
                  style={{ width: "100%", height: "468px" }}
                />
              </div>

              <div className="prague-shortcode-content-wrapp">
                <div className="prague-shortcode-heading light left">
                  <div className="parent-subtitle">
                    {getText(homepageData?.blogSection?.subtitle, language, "BLOG")}
                  </div>
                  <h2 className="parent-title">
                    {getText(homepageData?.blogSection?.title, language, "Latest Insights From Our Experts.")}
                  </h2>
                </div>

                <div className="row-fluid">
                  {recentBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="container no-padd">
        <div className="row-fluid margin-md-0t margin-sm-20t">
          <div className="col-sm-12 col-lg-offset-0 col-lg-6 col-md-offset-0 col-md-6 col-sm-offset-0 col-xs-12 padd-only-xs">
            <div className="heading left dark">
              <div className="subtitle">
                {getText(homepageData?.contactSection?.subtitle, language, "CONTACT")}
              </div>
              <h2 className="title">
                {getText(homepageData?.contactSection?.title, language, "Let's start new project.")}
              </h2>
              <div className="content">
                <p>
                  {getText(homepageData?.contactSection?.description, language,
                    "Now, as you were able to get a picture of who we are, it is up to you to contact us and lay the foundation for a new and successful business relationship. Our team consists")}
                </p>
              </div>
            </div>
            <div className="row-fluid">
              <div className="col-sm-6 no-padd">
                <div className="column-inner">
                  <div className="adddress-block">
                    <div className="address-block-outer">
                      <span className="separator"></span>
                      <h4 className="address-title text-responsive-align">
                        {getText(homepageData?.contactSection?.phoneTitle, language, "PHONE")}
                      </h4>
                      <p className="text-responsive-align">
                        {homepageData?.contactSection?.phones ? (
                          homepageData.contactSection.phones.map((phone, index) => (
                            <React.Fragment key={index}>
                              <a
                                className="text-responsive-align"
                                href={phone.link}
                              >
                                {phone.number}
                              </a>
                              {index < homepageData.contactSection.phones.length - 1 && <br />}
                            </React.Fragment>
                          ))
                        ) : (
                          <>
                            <a
                              className="text-responsive-align"
                              href="tel:+45(0)479253798"
                            >
                              +45 (0)4 79 25 37 98
                            </a>
                            <br />
                            <a
                              className="text-responsive-align"
                              href="tel:+44(0)479253730"
                            >
                              +44 (0)4 79 25 37 30
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 no-padd text-center text-sm-left">
                <div className="adddress-block">
                  <div className="address-block-outer">
                    <span className="separator"></span>
                    <h4 className="address-title text-responsive-align">
                      {getText(homepageData?.contactSection?.emailTitle, language, "EMAIL")}
                    </h4>
                    <p className="text-responsive-align">
                      {homepageData?.contactSection?.emails ? (
                        homepageData.contactSection.emails.map((email, index) => (
                          <React.Fragment key={index}>
                            <a
                              className="text-responsive-align"
                              href={`mailto:${email.address}`}
                            >
                              {email.address}
                            </a>
                            {index < homepageData.contactSection.emails.length - 1 && <br />}
                          </React.Fragment>
                        ))
                      ) : (
                        <>
                          <a
                            className="text-responsive-align"
                            href="mailto:prague@info.com"
                          >
                            prague@info.com
                          </a>
                          <br />
                          <a
                            className="text-responsive-align"
                            href="mailto:prague_arh@gmail.com"
                          >
                            prague_arh@gmail.com
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-xs-12 margin-lg-140t margin-sm-40t no-padd">
            <div className="vc_column-inner vc_custom_1488483852815">
              <div className="prague-formidable vc_formidable">
                <div
                  className="frm_forms with_frm_style frm_style_formidable-style-2-2"
                  id="frm_form_3_container"
                >
                  <form
                    className="frm-show-form contact-us-form"
                    id="form_jgd6s"
                  >
                    <div className="frm_form_fields">
                      <fieldset>
                        <div className="frm_fields_container">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <div className="frm_form_field form-field frm_required_field frm_none_container">
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Name"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="frm_form_field form-field frm_none_container">
                                <input
                                  type="text"
                                  name="phone"
                                  placeholder="Phone"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="frm_form_field form-field frm_required_field frm_none_container">
                            <input
                              type="email"
                              name="email"
                              placeholder="example@mail.com"
                              required
                            />
                          </div>
                          <div className="frm_form_field form-field frm_none_container">
                            <textarea
                              name="message"
                              rows="5"
                              placeholder="Message"
                            ></textarea>
                          </div>
                          <div className="frm_submit">
                            <button type="submit">Send</button>
                            <span className="arrow-right"></span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="margin-lg-115t margin-sm-50t container-fluid no-padd">
        <div
          data-vc-full-width="true"
          data-vc-full-width-init="true"
          data-vc-stretch-content="true"
          className="contact_map row-fluid no-padd margin-lg-115t margin-sm-50t no-padd"
          style={{ position: "relative", boxSizing: "border-box" }}
        >
          <div className="col-sm-12 no-padd">
            <GoogleMapComponent />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
