"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import Pagination from "@/components/Pagination";
import { getAllProjects, generateSlug } from "@/utils/mockData";
import Link from "next/link";
import { useHeaderNavigation } from "../../hooks/useHeaderNavigation";

export default function Projects() {
  const { getNavigationTextUpperCase, loading: navLoading } =
    useHeaderNavigation();
  const [activeFilters, setActiveFilters] = useState({
    year: "",
    location: "",
    category: "",
  });

  const [dropdownStates, setDropdownStates] = useState({
    year: false,
    location: false,
    category: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const dropdownRefs = useRef({});
  const projects = getAllProjects();

  // Generate filter options from project data
  const filterOptions = useMemo(() => {
    const years = [...new Set(projects.map((project) => project.year))].sort(
      (a, b) => b - a
    );
    const locations = [
      ...new Set(projects.map((project) => project.location)),
    ].sort();
    const categories = [
      ...new Set(projects.map((project) => project.category)),
    ].sort();

    return {
      years,
      locations,
      categories,
    };
  }, [projects]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        const ref = dropdownRefs.current[key];
        if (ref && !ref.contains(event.target)) {
          setDropdownStates((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleFilter = (filterType, filterValue) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: filterValue,
    }));
    setDropdownStates((prev) => ({
      ...prev,
      [filterType]: false,
    }));
  };

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilters.year && project.year !== parseInt(activeFilters.year))
        return false;
      if (activeFilters.location && project.location !== activeFilters.location)
        return false;
      if (activeFilters.category && project.category !== activeFilters.category)
        return false;
      return true;
    });
  }, [projects, activeFilters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Page change function
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

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
                      ? "PROJECTS"
                      : getNavigationTextUpperCase("projects", "PROJECTS")}
                  </div>
                  <AutoBreadcrumb textColor="black" justifyContent="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filmstrip-footer">
        <div className="container">
          <div className="filmstrip-filter">
            {/* Year Filter */}
            <div
              className={`prague-dropdown ${
                activeFilters.year ? "active" : ""
              }`}
              ref={(el) => (dropdownRefs.current.year = el)}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("year");
                }}
              >
                {activeFilters.year || "year"}
                <i
                  className={`icon-arrow ${
                    dropdownStates.year ? "rotated" : ""
                  }`}
                ></i>
              </a>
              {dropdownStates.year && (
                <ul className="prague-dropdown-menu">
                  <li onClick={() => handleFilter("year", "")}>All Years</li>
                  {filterOptions.years.map((year) => (
                    <li
                      key={year}
                      onClick={() => handleFilter("year", year.toString())}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Location Filter */}
            <div
              className={`prague-dropdown ${
                activeFilters.location ? "active" : ""
              }`}
              ref={(el) => (dropdownRefs.current.location = el)}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("location");
                }}
              >
                {activeFilters.location || "location"}
                <i
                  className={`icon-arrow ${
                    dropdownStates.location ? "rotated" : ""
                  }`}
                ></i>
              </a>
              {dropdownStates.location && (
                <ul className="prague-dropdown-menu">
                  <li onClick={() => handleFilter("location", "")}>
                    All Locations
                  </li>
                  {filterOptions.locations.map((location) => (
                    <li
                      key={location}
                      onClick={() => handleFilter("location", location)}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Category Filter */}
            <div
              className={`prague-dropdown ${
                activeFilters.category ? "active" : ""
              }`}
              ref={(el) => (dropdownRefs.current.category = el)}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("category");
                }}
              >
                {activeFilters.category || "category"}
                <i
                  className={`icon-arrow ${
                    dropdownStates.category ? "rotated" : ""
                  }`}
                ></i>
              </a>
              {dropdownStates.category && (
                <ul className="prague-dropdown-menu">
                  <li onClick={() => handleFilter("category", "")}>
                    All Categories
                  </li>
                  {filterOptions.categories.map((category) => (
                    <li
                      key={category}
                      onClick={() => handleFilter("category", category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="container margin-lg-30t margin-sm-30t margin-xs-20b margin-md-30b margin-lg-60b">
        <div className="row">
          <div className="no-padd-left no-padd-right margin-lg-20t">
            <div className="wrapper">
              <div
                data-unique-key="139714cb2b9c35c987d2544328454258"
                className="js-load-more"
                data-start-page="1"
                data-max-page="5"
                data-next-link="http://prague.loc/page/2/"
              >
                <div
                  className="row prague_list prague_count_col1 prague_gap_col10 no-footer-content no-figure prague-load-wrapper"
                  data-columns="prague_count_col1"
                  data-gap="prague_gap_col10"
                >
                  {currentProjects.map((project, index) => (
                    <div
                      key={project.id}
                      style={{ paddingBottom: "0", paddingRight: "0" }}
                      className={`project-list-item ${
                        index % 2 === 1 ? "column_paralax" : ""
                      }`}
                    >
                      <div className="project-list-outer">
                        <div className="project-list-wrapper">
                          <div className="project-list-img">
                            <img
                              src={project.image}
                              className="s-img-switch"
                              alt={`${generateSlug(project.title)} image`}
                            />
                          </div>

                          <div className="project-list-content">
                            <div className="project-list-category">
                              {project.year}
                            </div>
                            <h3 className="project-list-title">
                              <Link
                                href={`/projects/${generateSlug(
                                  project.title
                                )}`}
                                target="_self"
                              >
                                {project.title}
                              </Link>
                            </h3>
                            <Link
                              href={`/projects/${generateSlug(project.title)}`}
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
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredProjects.length}
                startIndex={startIndex}
                endIndex={endIndex}
                itemsPerPage={projectsPerPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* /MAIN BODY */}
    </MainLayout>
  );
}
