"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="prague-footer default">
      <Image
        width={2500}
        height={1248}
        src="/img/home/ffa51a33625455.56b20f01c3608.jpg"
        className="s-img-switch"
        alt="footer banner"
      />
      <div className="footer-content-outer">
        <div className="footer-top-content">
          <div className="prague-footer-main-block">
            <div className="prague-logo">
              <Link href="/">
                <Image
                  width={145}
                  height={46}
                  src="/img/home/logo-white.png"
                  className="attachment-full size-full"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="footer-main-content">
              <p>
                The company principle of Architecture-Studio is the collective
                conception. From the very beginning, the practice has believed
                in the virtues of exchange, crossing ideas, common effort,
                shared knowledge and enthusiasm.
              </p>
            </div>
          </div>

          <div className="prague-footer-info-block">
            <h6 className="footer-info-block-title">GET IN TOUCH</h6>

            <div className="footer-info-block-content">
              <p>
                <a href="tel:+7(885)5896985">+7 (885) 589 69 85</a>
              </p>
              <p>
                <a href="mailto:prague-architects@info.com">
                  prague-architects@info.com
                </a>
              </p>
              <p>Litačka, Jungmannova 35/29, Nové Město,Czech Republic</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-content">
          {/* Footer copyright */}
          <div className="footer-copyright">
            <p>PRAGUE (C) 2019 ALL RIGHTS RESERVED</p>
          </div>

          <div className="prague-social-nav">
            <ul className="social-content">
              <li>
                <a target="_blank" href="https://www.behance.net/foxthemes">
                  <i aria-hidden="true" className="fa fa-behance"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/foxthemes_offic">
                  <i aria-hidden="true" className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/foxthemes.page/"
                >
                  <i aria-hidden="true" className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.pinterest.com/foxthemes/">
                  <i aria-hidden="true" className="fa fa-pinterest-p"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
