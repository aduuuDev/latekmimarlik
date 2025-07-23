"use client";

import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";

const PlanningPage = () => {
  return (
    <MainLayout>
      {/* Banner */}
      <div className="container-fluid no-padd">
        <div className="row no-padd">
          <div className="col-xs-12 no-padd">
            <div className="top-banner no-padd big light vindow-height">
              <span className="overlay"></span>
              <Image
                src="/img/planning/1666b643174379.57e5b1bdd749f.jpg"
                alt="banner image"
                width={1920}
                height={1080}
                className="s-img-switch"
              />
              <div className="content">
                <div className="subtitle">SERVICE</div>
                <h1 className="title">Planning</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container padd-only-xs margin-xs-20t margin-md-0t">
        <div className="row">
          <div className="col-xs-12 padd-only-xs">
            <div className="services-detailed">
              <div className="post-content">
                <h3>Architectural planning</h3>
                <p>
                  The architect usually begins to work when the site and the
                  type and cost of a building have been determined.
                </p>
                <p>
                  The site involves the varying behaviour of the natural
                  environment that must be adjusted to the unvarying physical
                  needs of human beings; the type is the generalized form
                  established by society that must be adjusted to the special
                  use for which the building is required; the cost implies the
                  economics of land, labour, and materials that must be adjusted
                  to suit a particular sum.
                </p>
                <p>
                  Thus, planning is the process of particularizing and,
                  ultimately, of harmonizing the demands of environment, use,
                  and economy. This process has a cultural as well as a
                  utilitarian value, for in creating a plan for any social
                  activity the architect inevitably influences the way in which
                  that activity is performed.
                </p>

                <div
                  id="gallery-1"
                  className="gallery galleryid-915 gallery-columns-2 gallery-size-full flex"
                >
                  <figure className="gallery-item">
                    <div className="gallery-icon landscape">
                      <Image
                        src="/img/planning/service-detail-1.jpg"
                        alt="planning image"
                        width={600}
                        height={400}
                        className="attachment-full size-full"
                      />
                    </div>
                  </figure>
                  <figure className="gallery-item">
                    <div className="gallery-icon landscape">
                      <Image
                        src="/img/planning/service-detail-2.jpg"
                        alt="planning image"
                        width={600}
                        height={400}
                        className="attachment-full size-full"
                      />
                    </div>
                  </figure>
                </div>

                <h3>Planning the environment</h3>
                <p>
                  The natural environment is at once a hindrance and a help, and
                  the architect seeks both to invite its aid and to repel its
                  attacks. To make buildings habitable and comfortable, he must
                  control the effects of heat, cold, light, air, moisture, and
                  dryness and foresee destructive potentialities such as fire,
                  earthquake, flood, and disease.
                </p>
                <p>
                  The methods of controlling the environment considered here are
                  only the practical aspects of planning. They are treated by
                  the architect within the context of the expressive aspects.
                  The placement and form of buildings in relation to their
                  sites, the distribution of spaces within buildings, and other
                  planning devices discussed below are fundamental elements in
                  the aesthetics of architecture.
                </p>

                <h3>Orientation</h3>
                <p>
                  The arrangement of the axes of buildings and their parts is a
                  device for controlling the effects of sun, wind, and rainfall.
                  The sun is regular in its course; it favours the southern and
                  neglects the northern exposures of buildings in the Northern
                  Hemisphere, so that it may be captured for heat or evaded for
                  coolness by turning the axis of a plan toward or away from it.
                  Within buildings, the axis and placement of each space
                  determines the amount of sun it receives. Orientation may
                  control air for circulation and reduce the disadvantages of
                  wind, rain, and snow, since in most climates the prevailing
                  currents can be foreseen. The characteristics of the immediate
                  environment also influence orientation: trees, land
                  formations, and other buildings create shade and reduce or
                  intensify wind, while bodies of water produce moisture and
                  reflect the sun.
                </p>
              </div>

              <Link className="a-btn-2 creative" href="/contact-us">
                <span className="a-btn-line"></span>
                START PROJECT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlanningPage;
