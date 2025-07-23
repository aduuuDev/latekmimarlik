"use client";

import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    // Vivus.js animasyonu için gerekli script yükleme
    const loadVivusScript = async () => {
      if (typeof window !== "undefined" && !window.Vivus) {
        const script = document.createElement("script");
        script.src = "/js/vivus.min.js";
        script.onload = () => {
          if (window.Vivus) {
            new window.Vivus("prague-svg", {
              duration: 200,
              type: "oneByOne",
              animTimingFunction: window.Vivus.EASE,
            });
          }
        };
        document.head.appendChild(script);
      } else if (window.Vivus) {
        new window.Vivus("prague-svg", {
          duration: 200,
          type: "oneByOne",
          animTimingFunction: window.Vivus.EASE,
        });
      }
    };

    loadVivusScript();
  }, []);

  return (
    <MainLayout>
      <div className="container padd-only-xs">
        <div className="row">
          <div className="col-xs-12">
            <div className="page-calculate fullheight">
              <div className="page-calculate-content">
                <div className="prague-error-wrapper">
                  <div className="prague-error-img">
                    <img
                      className="s-img-switch"
                      src="/img/404/error.png"
                      alt="banner image"
                    />
                  </div>

                  <div className="prague-error-content">
                    <div className="prague-svg-animation-text">
                      <svg
                        id="prague-svg"
                        width="100%"
                        height="100%"
                        fill="transparent"
                        viewBox="0 0 173.73046875 129.921875"
                        preserveAspectRatio="xMidYMid meet"
                        className="prague-svg"
                      >
                        <path d=" M2.83203125,94.775390625l28.515625-45.80078125l0-0.146484375l16.50390625,0l0,43.310546875l7.177734375,0l0,12.79296875l-7.177734375,0l0,14.990234375l-16.50390625,0l0-14.990234375l-27.5390625,0z M17.578125,92.138671875l13.76953125,0l0-21.875l-0.29296875-0.09765625l-1.26953125,2.001953125z" />
                        <path d=" M62.109375,91.845703125l0-14.94140625q0-14.404296875,6.640625-21.7529296875t18.06640625-7.3486328125q11.376953125,0,18.0908203125,7.373046875t6.7138671875,21.728515625l0,14.94140625q0,14.404296875-6.689453125,21.7529296875t-18.017578125,7.3486328125q-11.42578125,0-18.115234375-7.3486328125t-6.689453125-21.7529296875z M78.564453125,92.87109375q0,8.30078125,2.099609375,11.8408203125t6.25,3.5400390625q4.052734375,0,6.15234375-3.5400390625t2.099609375-11.8408203125l0-17.08984375q0-8.154296875-2.1484375-11.71875t-6.201171875-3.564453125q-4.1015625,0-6.1767578125,3.564453125t-2.0751953125,11.71875l0,17.08984375z" />
                        <path d=" M118.65234375,94.775390625l28.515625-45.80078125l0-0.146484375l16.50390625,0l0,43.310546875l7.177734375,0l0,12.79296875l-7.177734375,0l0,14.990234375l-16.50390625,0l0-14.990234375l-27.5390625,0z M133.3984375,92.138671875l13.76953125,0l0-21.875l-0.29296875-0.09765625l-1.26953125,2.001953125z" />
                      </svg>
                    </div>

                    <div className="error-subtitle">PAGE ERROR</div>

                    <h2 className="error-title">Architecture crashed :(</h2>
                  </div>

                  <Link href="/" className="error-btn a-btn-2 creative">
                    <span className="a-btn-line"></span>
                    TAKE ME HOME
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
