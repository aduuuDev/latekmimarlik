"use client";

import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function Shop() {
  return (
    <MainLayout>
      {/* Banner */}
      <div className="container-fluid no-padd">
        <div className="row no-padd">
          <div className="col-xs-12 no-padd">
            <div className="top-banner no-padd big fullheight light">
              <span className="overlay"></span>
              <img
                src="/img/shop/shop-banner-1024x654.jpg"
                className="s-img-switch"
                alt="banner image"
              />
              <div className="content">
                <div className="subtitle">BEST PRODUCTS</div>
                <h1 className="title">
                  An Amazing Collection <br /> Modern Furniture
                </h1>
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
                Showing 1–8 of 9 results
              </p>
              <form className="woocommerce-ordering" method="get">
                <select name="orderby" className="orderby">
                  <option value="menu_order" defaultValue>
                    Default sorting
                  </option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="date">Sort by latest</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                </select>
              </form>
            </div>
            <ul className="products row columns-4">
              {/* Ürün 1 */}
              <li className="post-2075 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-modern first instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-4.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2075"
                      data-product_sku="PR104"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/bertt-side-table">Bertt Side table</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    83.40
                  </span>
                </span>
              </li>
              {/* Ürün 2 */}
              <li className="post-2076 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-casual product_tag-classic  instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-9.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2076"
                      data-product_sku="PR101"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/coffee-table">Coffee Table</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    57.00
                  </span>
                </span>
              </li>
              {/* Ürün 3 */}
              <li className="post-2073 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-casual product_tag-classic  instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-7.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2073"
                      data-product_sku="PR106"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/modern-end-table-2">Modern End Table</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    87.00
                  </span>
                </span>
              </li>
              {/* Ürün 4 */}
              <li className="post-2077 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-casual last instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-8.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2077"
                      data-product_sku="PR102"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/modern-end-table">Modern End Table</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    87.00
                  </span>
                </span>
              </li>
              {/* Ürün 5 */}
              <li className="post-2074 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-modern first instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-5.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2074"
                      data-product_sku="PR103"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/side-table">Side Table</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    48.00
                  </span>
                </span>
              </li>
              {/* Ürün 6 */}
              <li className="post-2072 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-casual product_tag-modern  instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-3.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2072"
                      data-product_sku="PR105"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/soft-chair">Soft chair</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    57.00
                  </span>
                </span>
              </li>
              {/* Ürün 7 */}
              <li className="post-2078 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-modern  instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-2.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2078"
                      data-product_sku="PR108"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/wooden-chair">Wooden Chair</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    83.40
                  </span>
                </span>
              </li>
              {/* Ürün 8 */}
              <li className="post-2071 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-classic last instock virtual purchasable product-type-simple">
                <div className="product-list-image">
                  <img
                    className="s-img-switch"
                    src="/img/shop/shop-img-1.jpg"
                    alt="shop image"
                  />
                  <div className="product-link-wrapp">
                    <a
                      rel="nofollow"
                      href="#"
                      data-quantity="1"
                      data-product_id="2071"
                      data-product_sku="PR107"
                      className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <h4 className="product-list-title">
                  <a href="/wooden-nightstand">Wooden Nightstand</a>
                </h4>
                <div className="product-list-rating stars stars-example-css">
                  <div className="css-stars">
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star full"></span>
                    <span className="star half"></span>
                  </div>
                </div>
                <span className="price">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">£</span>
                    48.00
                  </span>
                </span>
              </li>
            </ul>
            <div className="pagination clearfix">
              <div className="next-post">
                <a href="/shop-page-2">Next Page</a>{" "}
                <i className="fa fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
