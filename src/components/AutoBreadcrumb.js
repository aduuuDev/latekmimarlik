"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "react-bootstrap";

const AutoBreadcrumb = ({
  style = {},
  textColor = "white",
  justifyContent = "center",
  customBreadcrumbs = [], // Özel breadcrumb öğeleri için
}) => {
  const pathname = usePathname();

  // Route to display name mapping
  const routeNames = {
    "/": "Home",
    "/about-us": "About Us",
    "/contact-us": "Contact Us",
    "/blog": "Blog",
    "/services": "Services",
    "/projects": "Projects",
    "/products": "Products",
  };

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    if (pathname === "/") return [];

    const pathSegments = pathname.split("/").filter((segment) => segment);
    const breadcrumbs = [];

    // Always add Home
    breadcrumbs.push({
      href: "/",
      label: "Home",
      active: false,
    });

    // If custom breadcrumbs are provided, use them
    if (customBreadcrumbs.length > 0) {
      customBreadcrumbs.forEach((crumb, index) => {
        breadcrumbs.push({
          href: crumb.href,
          label: crumb.label,
          active: index === customBreadcrumbs.length - 1, // Last item is active
        });
      });
    } else {
      // Default behavior - add current page
      const currentPageName =
        routeNames[pathname] || pathSegments[pathSegments.length - 1];
      breadcrumbs.push({
        href: pathname,
        label: currentPageName,
        active: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (pathname === "/" || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb
      style={{
        backgroundColor: "transparent",
        padding: "0",
        margin: "30px 0 0 0",
        fontSize: "14px",
        justifyContent: justifyContent,
        display: "flex",
        ...style,
      }}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item
          key={index}
          href={breadcrumb.active ? undefined : breadcrumb.href}
          active={breadcrumb.active}
          style={{
            color: textColor,
            opacity: breadcrumb.active ? "1" : "0.8",
            fontWeight: breadcrumb.active ? "bold" : "normal",
          }}
        >
          {breadcrumb.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default AutoBreadcrumb;
