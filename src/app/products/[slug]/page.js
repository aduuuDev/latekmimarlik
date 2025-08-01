"use client";

import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";
import { productData } from "@/utils/mockData";
import {
  getProductBySlug,
  getAllProducts,
  generateSlug,
} from "../../../utils/mockData";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const product = getProductBySlug(params.slug);
  const allProducts = getAllProducts();
  const [activeImage, setActiveImage] = useState(0);

  // Galeri fonksiyonları
  const handleThumbnailClick = (index) => {
    setActiveImage(index);
  };

  const getActiveImage = () => {
    if (activeImage === 0) {
      return product.image;
    } else {
      return product.gallery[activeImage - 1];
    }
  };

  // Product bulunamadıysa
  if (!product) {
    return (
      <MainLayout headerTheme="dark">
        <div
          className="container"
          style={{ padding: "100px 0", textAlign: "center" }}
        >
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
        </div>
      </MainLayout>
    );
  }

  // İlgili ürünler (mevcut ürün hariç)
  const relatedProducts = allProducts
    .filter((p) => generateSlug(p.name) !== generateSlug(product.name))
    .slice(0, 4);

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
                  <AutoBreadcrumb
                    textColor="black"
                    justifyContent="left"
                    customBreadcrumbs={[
                      {
                        href: "/products",
                        label: "Products",
                      },
                      {
                        href: `/products/${params.slug}`,
                        label: product.name,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ürün Detayları */}
      <div className="shop-container container padd-only-xs product-template-default single single-product postid-2072 woocommerce woocommerce-page woocommerce-no-js wpb-js-composer js-comp-ver-5.6 responsive">
        <div className="row">
          <div className="col-sm-12 col-md-12 margin-lg-90b margin-sm-60b">
            <div className="woocommerce-notices-wrapper"></div>
            <div
              id={`product-${product.id}`}
              className={`post-${
                product.id
              } product type-product status-publish has-post-thumbnail product_cat-${product.categories.join(
                " product_cat-"
              )} product_tag-${product.tags.join(
                " product_tag-"
              )} first instock virtual purchasable product-type-simple`}
            >
              <div className="flex-item ">
                {/* Ürün Galerisi */}
                <div
                  className="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-3 images"
                  data-columns="3"
                >
                  <div className="flex-viewport">
                    <figure className="woocommerce-product-gallery__wrapper">
                      <div
                        data-thumb={getActiveImage()}
                        className="woocommerce-product-gallery__image flex-active-slide"
                      >
                        <a href={getActiveImage()}>
                          <img
                            src={getActiveImage()}
                            className="attachment-shop_single size-shop_single firstImg"
                            alt="slider image"
                            title="slider"
                          />
                        </a>
                      </div>
                    </figure>
                  </div>
                  <ol className="flex-control-nav flex-control-thumbs">
                    <li>
                      <img
                        src={product.image}
                        alt="slider image"
                        className={
                          activeImage === 0
                            ? " flex-active clicked1"
                            : "clicked1"
                        }
                        draggable="false"
                        onClick={() => handleThumbnailClick(0)}
                        style={{ cursor: "pointer" }}
                      />
                    </li>
                    {product.gallery &&
                      product.gallery.slice(0, 2).map((image, index) => (
                        <li key={index}>
                          <img
                            src={image}
                            alt="slider image"
                            className={
                              activeImage === index + 1
                                ? ` flex-active clicked${index + 2}`
                                : `clicked${index + 2}`
                            }
                            draggable="false"
                            onClick={() => handleThumbnailClick(index + 1)}
                            style={{ cursor: "pointer" }}
                          />
                        </li>
                      ))}
                  </ol>
                </div>

                {/* Ürün Özeti */}
                <div className="summary entry-summary">
                  <h2 className="product_title entry-title">{product.name}</h2>

                  <div className="woocommerce-product-details__short-description">
                    <p>
                      High-quality {product.name.toLowerCase()} with excellent
                      craftsmanship. Perfect for modern homes and offices.
                      Features premium materials and contemporary design that
                      complements any interior style.
                    </p>
                  </div>

                  {/* Ürün Meta Bilgileri */}
                  <div className="product_meta">
                    <span className="sku_wrapper">
                      SKU: <span className="sku">{product.sku}</span>
                    </span>
                    <span className="posted_in">
                      Category:{" "}
                      {product.categories.map((category, index) => (
                        <span key={index}>
                          <a href={`/${category}`} rel="tag">
                            {category}
                          </a>
                          {index < product.categories.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                    <span className="tagged_as">
                      Tags:{" "}
                      {product.tags.map((tag, index) => (
                        <span key={index}>
                          <a href={`/${tag}`} rel="tag">
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </a>
                          {index < product.tags.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>

                  {/* Sekmeler */}
                  <div className="woocommerce-tabs wc-tabs-wrapper">
                    <div className="tabs-item-wrapp">
                      <div className="description_tab tabs-title">
                        <h5 style={{ fontWeight: "300" }}>DESCRIPTION</h5>
                      </div>
                      <div className="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab">
                        {product.specs &&
                          Object.entries(product.specs).map(([key, value]) => (
                            <p key={key}>
                              {key}
                              {": "}
                              <span style={{ color: "#7e7d7d" }}>{value}</span>
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* İlgili Ürünler */}
              <div className="related products">
                <h2>Related products</h2>
                <ul className="products row columns-4">
                  {relatedProducts.map((relatedProduct, index) => (
                    <li
                      key={relatedProduct.id}
                      className={`post-${
                        relatedProduct.id
                      } product type-product status-publish has-post-thumbnail product_cat-${relatedProduct.categories.join(
                        " product_cat-"
                      )} product_tag-${relatedProduct.tags.join(
                        " product_tag-"
                      )} ${index === 0 ? "first" : ""} ${
                        index === relatedProducts.length - 1 ? "last" : ""
                      } instock virtual purchasable product-type-simple`}
                    >
                      <div className="product-list-image">
                        <img
                          className="s-img-switch"
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                        />
                        <div className="product-link-wrapp">
                          <Link
                            href={`/products/${generateSlug(
                              relatedProduct.name
                            )}`}
                            className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                            style={{ textDecoration: "none" }}
                          >
                            View product
                          </Link>
                        </div>
                      </div>
                      <h4 className="product-list-title">
                        <Link
                          href={`/products/${generateSlug(
                            relatedProduct.name
                          )}`}
                        >
                          {relatedProduct.name}
                        </Link>
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
