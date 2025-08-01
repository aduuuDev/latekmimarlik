"use client";

import { useEffect, useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import Pagination from "@/components/Pagination";
import { getAllProducts, generateSlug } from "../../utils/mockData";
import Link from "next/link";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const allProducts = getAllProducts();

  // Pagination hesaplamaları
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                    PRODUCTS
                  </div>
                  <AutoBreadcrumb textColor="black" justifyContent="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ürünler */}
      <div className="shop-container container padd-only-xs woocommerce">
        <div className="row no-padd">
          <div className="col-sm-12 col-md-12 margin-lg-90b margin-sm-50b ">
            <header className="woocommerce-products-header"></header>
            <div className="woocommerce-notices-wrapper"></div>
            <div className="flex-item">
              <p className="woocommerce-result-count">
                Showing {startIndex + 1}–
                {Math.min(endIndex, allProducts.length)} of {allProducts.length}{" "}
                results
              </p>
            </div>
            <ul className="products row columns-4">
              {currentProducts.map((product, index) => (
                <li
                  key={product.id}
                  className={`post-${
                    product.id
                  } product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-${product.tags.join(
                    " product_tag-"
                  )} ${index === 0 ? "first" : ""} ${
                    index === currentProducts.length - 1 ? "last" : ""
                  } instock virtual purchasable product-type-simple`}
                >
                  <div className="product-list-image">
                    <img
                      className="s-img-switch"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="product-link-wrapp">
                      <Link
                        href={`/products/${generateSlug(product.name)}`}
                        className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                        style={{ textDecoration: "none" }}
                      >
                        View product
                      </Link>
                    </div>
                  </div>
                  <h4 className="product-list-title">
                    <Link href={`/products/${generateSlug(product.name)}`}>
                      {product.name}
                    </Link>
                  </h4>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={allProducts.length}
              startIndex={startIndex}
              endIndex={endIndex}
              itemsPerPage={productsPerPage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
