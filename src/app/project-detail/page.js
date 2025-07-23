"use client";

import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function MountainHouse() {
  useEffect(() => {
    // Gerekli scriptleri yükle
    const scripts = [
      "/js/jquery.js",
      "/js/isotope.pkgd.min.js",
      "/js/tweenMax.min.js",
      "/js/hammer.min.js",
      "/js/foxlazy.min.js",
      "/js/jquery.magnific-popup.min.js",
      "/js/all.js",
    ];
    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      document.head.appendChild(script);
    });
  }, []);

  return (
    <MainLayout>
      {/* Banner */}
      <div className="container-fluid no-padd">
        <div className="col-xs-12 no-padd">
          <div className="top-banner no-padd big fullheight light">
            <img
              src="/img/img-map-pro/upload-7.jpg"
              className="s-img-switch"
              alt="main-banner image"
            />
            <div className="top-banner-cursor"></div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="container no-padd margin-lg-135t margin-xs-100t margin-lg-135b margin-sm-100b">
        <div className="row-fluid no-padd ">
          <div className="vc_column_container col-sm-5 no-padd">
            <div className="padd-right-only-lg">
              <div className="heading left dark no-padd-top">
                <div className="subtitle align-left">ENVIRONMENT</div>
                <h2 className="title align-left">Mountaine House</h2>
                <div className="content align-left">
                  <p>
                    The Round Mountain House references local precedents by
                    combining modernist ideals with vernacular strategies to
                    integrate seamlessly into the Ozark Mountain landscape.
                  </p>
                  <p>
                    The form of the house is treated as two pieces that separate
                    public and private spaces. The "main frame" consists of
                    public spaces: the carport, outdoor breezeway, the guest
                    loft, and main living area; the "lean-to" or "saddle bag"
                    contains private spaces: the laundry, bathrooms, closets,
                    and bedrooms.
                  </p>
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
                        <p>Abu Dhabi, UAE</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-detail-block-outer">
                  <div className="project-detail-block-wrapper">
                    <div className="project-detail-block-item">
                      <div className="project-detail-block-title">
                        CREATIVE DIRECTOR{" "}
                      </div>
                      <div className="project-detail-block-descr">
                        <p>Tim de Noble</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-detail-splitted-info">
                <div className="prague-share-icons ">
                  <div className="prague-share-label">SHARE PROJECT</div>
                  <button
                    data-share="http://www.facebook.com/sharer.php?u=http://prague.loc/splitted-creative-banner/&t=Splitted Creative Banner"
                    className="icon fa fa-facebook"
                  ></button>
                  <button
                    data-share="http://twitter.com/home/?status=Splitted Creative Banner - http://prague.loc/splitted-creative-banner/"
                    className="icon fa fa-twitter"
                  ></button>
                  <button
                    data-share="http://www.linkedin.com/shareArticle?mini=true&title=Splitted Creative Banner&url=http://prague.loc/splitted-creative-banner/"
                    className="icon fa fa-linkedin"
                  ></button>
                  <button
                    data-share="http://pinterest.com/pin/create/button/?url=http://prague.loc/splitted-creative-banner/&media="
                    className="icon fa fa-pinterest-p"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div className="vc_column_container col-sm-7  margin-xs-50t no-padd">
            <div className="no-padd-inner ">
              <div className="wpb_single_image wpb_content_element margin-bottom">
                <figure>
                  <div className="vc_single_image-wrapper   vc_box_border_grey">
                    <img
                      src="/img/splitted-creative-banner/upload-9.jpg"
                      alt="house image"
                    />
                  </div>
                </figure>
              </div>
              <div className="wpb_single_image wpb_content_element margin-bottom">
                <figure>
                  <div className="vc_single_image-wrapper   vc_box_border_grey">
                    <img
                      src="/img/splitted-creative-banner/upload-1.jpg"
                      alt="house image"
                    />
                  </div>
                </figure>
              </div>
              <div className="wpb_single_image wpb_content_element  margin-bottom">
                <figure>
                  <div className="vc_single_image-wrapper   vc_box_border_grey">
                    <img
                      src="/img/splitted-creative-banner/upload-3.jpg"
                      alt="house image"
                    />
                  </div>
                </figure>
              </div>
              <div className="wpb_single_image wpb_content_element">
                <figure>
                  <div className="vc_single_image-wrapper   vc_box_border_grey">
                    <img
                      src="/img/splitted-creative-banner/uload-4.jpg"
                      alt="house image"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
