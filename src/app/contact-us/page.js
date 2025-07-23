"use client";

import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import GoogleMapComponent from "@/components/GoogleMap";
import Image from "next/image";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

export default function ContactUs() {
  const locations = [
    {
      title: "EVO GRAND HALL",
      address: ["Lítačka 35/29,", "06589 Nové Město,", "Czech Republic"],
      image: "https://picsum.photos/400/300?random=1",
      alt: "evo-grand-hall image",
    },
    {
      title: "INNERE STADT",
      address: ["Josefstädter Street,", "11 1030 Vienna,", "Austria"],
      image: "https://picsum.photos/400/300?random=2",
      alt: "inner stadt image",
    },
    {
      title: "MONOPRIX",
      address: ["47 Rue de Babylone,", "75007 Paris,", "France"],
      image: "https://picsum.photos/400/300?random=3",
      alt: "monoprix image",
    },
  ];
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
                    }}
                  >
                    CONTACT US
                  </div>
                  <AutoBreadcrumb textColor="black" justifyContent="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İletişim ve Form Alanı */}
      <div className="container no-padd">
        <div className="row-fluid margin-md-0t margin-sm-20t">
          <div className="col-sm-12 col-lg-offset-0 col-lg-6 col-md-offset-0 col-md-6 col-sm-offset-0 col-xs-12 padd-only-xs">
            <div className="heading left dark">
              <h2 className="title" style={{ fontSize: "30px" }}>
                Projenizi birlikte şekillendirelim.
              </h2>
              <div className="content" style={{ paddingTop: "20px" }}>
                <p>
                  Bizimle iletişime geçerek sağlam ve başarılı bir iş birliğinin
                  temelini atma zamanı geldi. Alanında uzman ekibimiz, bu
                  süreçte sizlere destek olmaktan memnuniyet duyacaktır.
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
                        PHONE
                      </h4>
                      <p className="text-responsive-align">
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
                      EMAIL
                    </h4>
                    <p className="text-responsive-align">
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
          className="contact_map row-fluid no-padd margin-lg-50t margin-sm-50t no-padd"
          style={{ position: "relative", boxSizing: "border-box" }}
        >
          <div className="col-sm-12 no-padd">
            <GoogleMapComponent />
          </div>
        </div>
      </div>

      {/* LOCATION SECTION */}
      <div className="container no-padd margin-lg-140b margin-md-70b margin-xs-20b">
        <div className="row-fluid no-padd margin-lg-60t margin-sm-20t">
          <div className="col-sm-12 ">
            <div className="padd-only-xs">
              <div className="heading  left dark">
                <div className="subtitle ">LOCATIONS</div>
                <h2 className="title">Meet Us in your City.</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row-fluid vc_row-o-equal-height vc_row-flex  margin-lg-35t margin-lg-140b margin-sm-20t margin-sm-70b">
          {locations.map((loc, index) => (
            <div key={index} className="col-sm-4 no-padd ">
              <div className="vc_column-inner ">
                <div
                  className="adddress-block s-back-switch"
                  style={{
                    backgroundImage: `url(${loc.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "250px",
                  }}
                >
                  <div className="address-block-outer">
                    <span className="separator"></span>

                    <h4 className="address-title">{loc.title}</h4>

                    {loc.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
