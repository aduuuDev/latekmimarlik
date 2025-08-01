"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "react-bootstrap";
import { useHeaderNavigation } from "../hooks/useHeaderNavigation";
import { useLanguage } from "../context/LanguageContext";

const AutoBreadcrumb = ({
  style = {},
  textColor = "white",
  justifyContent = "center",
  customBreadcrumbs = [], // Özel breadcrumb öğeleri için
}) => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { getNavigationText, loading } = useHeaderNavigation();

  // Route to display name mapping - dynamic based on language
  const getRouteNames = () => ({
    "/": getNavigationText("home", "Home"),
    "/about-us": getNavigationText("about", "About Us"),
    "/contact-us": getNavigationText("contact", "Contact Us"),
    "/blog": getNavigationText("blog", "Blog"),
    "/services": getNavigationText("services", "Services"),
    "/projects": getNavigationText("projects", "Projects"),
    "/products": getNavigationText("products", "Products"),
  });

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    if (pathname === "/") return [];

    const pathSegments = pathname.split("/").filter((segment) => segment);
    const breadcrumbs = [];
    const routeNames = getRouteNames();

    // Always add Home
    breadcrumbs.push({
      href: "/",
      label: routeNames["/"],
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
      // Check if this is a slug page (has 2 segments)
      if (pathSegments.length === 2) {
        const [category, slug] = pathSegments;
        const categoryPath = `/${category}`;

        // Add category page (Services, Projects, etc.)
        if (routeNames[categoryPath]) {
          breadcrumbs.push({
            href: categoryPath,
            label: routeNames[categoryPath],
            active: false,
          });
        }

        // Add current slug page (use slug as label for now)
        breadcrumbs.push({
          href: pathname,
          label: slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          active: true,
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
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page or while loading
  if (pathname === "/" || breadcrumbs.length <= 1 || loading) {
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
