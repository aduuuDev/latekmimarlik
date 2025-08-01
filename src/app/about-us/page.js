"use client";

import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import { getAllTeamMembers } from "../../utils/mockData";
import VideoPlayer from "@/components/VideoPlayer";
import { useHeaderNavigation } from "../../hooks/useHeaderNavigation";

const AboutUsPage = () => {
  const teamMembers = getAllTeamMembers();
  const { getNavigationTextUpperCase, loading } = useHeaderNavigation();

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
                    {loading
                      ? "ABOUT US"
                      : getNavigationTextUpperCase("about", "ABOUT US")}
                  </div>
                  <AutoBreadcrumb textColor="black" justifyContent="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MAIN BODY */}

      <div className="container-fluid no-padd">
        <div className="row-fluid no-padd margin-xs-20t">
          <div className="col-sm-12 no-padd">
            <div className="no-padd">
              <div className="row prague_blog prague_count_col1 prague_gap_col10 no-footer-content">
                <div className="about-us-post col-xs-12">
                  <div
                    className="about-us-wrapper"
                    style={{ paddingBottom: "20px" }}
                  >
                    <div className="about-us-image">
                      <Image
                        src="https://picsum.photos/600/400?random=10"
                        alt="About Us Image"
                        width={600}
                        height={1200}
                        className="s-img-switch"
                      />
                    </div>
                    <div className="about-us-content">
                      <div className="about-us-date">ABOUT US</div>
                      <h3 className="about-us-title">
                        Make with love all what we do.
                      </h3>
                      <div
                        className="about-us-excerpt"
                        style={{ fontSize: "15px" }}
                      >
                        <p style={{ fontSize: "15px" }}>
                          Our team takes over everything, from an idea and
                          concept development to realization. We believe in
                          traditions and incorporate them within our
                          innovations. All our projects incorporate a unique
                          artistic image and functional solutions. Our team
                          takes over everything, from an idea and concept
                          development to realization. We believe in traditions
                          and incorporate them within our innovations. All our
                          projects incorporate a unique artistic image and
                          functional solutions. Our team takes over everything,
                          from an idea and concept development to realization.
                          We believe in traditions and incorporate them within
                          our innovations.
                        </p>
                        <br />
                        <p style={{ fontSize: "15px" }}>
                          All our projects incorporate a unique artistic image
                          and functional solutions. Our team takes over
                          everything, from an idea and concept development to
                          realization. We believe in traditions and incorporate
                          them within our innovations. All our projects
                          incorporate a unique artistic image and functional
                          solutions. Our team takes over everything, from an
                          idea and concept development to realization. We
                          believe in traditions and incorporate them within our
                          innovations. All our projects incorporate a unique
                          artistic image and functional solutions. Our team
                          takes over everything, from an idea and concept
                          development to realization. We believe in traditions
                          and incorporate them within our innovations. All our
                          projects incorporate a unique artistic image and
                          functional solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="container no-padd">
        <div className="row-fluid margin-lg-30t margin-sm-30t">
          <div className="col-sm-12 text-center">
            <div className="capabilities-section">
              <div className="capabilities-line"></div>
              <div className="capabilities-subtitle">OUR CAPABILITIES</div>
              <h2 className="capabilities-title">
                Unique solutions for your home
                <br />
                through a personalized process.
              </h2>
              <div className="capabilities-content">
                <p style={{ fontSize: "15px" }}>
                  Luxe brings expertise in residential and commercial projects,
                  renovations, sustainable design, and a commitment to
                  excellence. Our team takes over everything, from an idea and
                  concept development to realization. We believe in traditions
                  and incorporate them within our innovations. All our projects
                  incorporate a unique artistic image and functional solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <VideoPlayer
          src="/video-background.mp4"
          coverImage="/img/about-us/beautiful-shot-oresund-bridge-sweden-enveloped-fog.jpg"
        />
      </div>

      {/* Team Section */}
      <div className="container no-padd">
        <div className="row-fluid margin-lg-30t margin-sm-30t">
          <div className="col-sm-12 text-center">
            <div className="capabilities-section">
              <div className="capabilities-line"></div>
              <div className="capabilities-subtitle">OUR TEAM</div>
              <h2 className="capabilities-title">
                Unique solutions for your home
                <br />
                through a personalized process.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container no-padd margin-lg-60b">
        <div
          className="row-fluid margin-lg-35t margin-sm-20t"
          style={{ display: "flex" }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="col-sm-6 col-lg-4 col-md-4 col-xs-12 no-padd"
            >
              <div className="column-inner">
                <div className="team-wrapper no-figure">
                  <div className="trans_figures enable_anima"></div>
                  <div className="team-outer">
                    <Image
                      src={member.image}
                      alt={`${member.name} picture`}
                      width={400}
                      height={380}
                      className="prague-team-img s-img-switch"
                    />
                  </div>
                  <div className="team-info">
                    <div className="team-name">{member.name}</div>
                    <div className="team-position">{member.title}</div>
                    <div className="team-school">{member.school}</div>
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

export default AboutUsPage;
