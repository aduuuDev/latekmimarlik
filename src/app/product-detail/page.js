"use client";

import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function SoftChair() {
  useEffect(() => {
    // Gerekli scriptleri yükle
    const scripts = [
      "/js/jquery.js",
      "/js/swiper.min.js",
      "/js/hammer.min.js",
      "/js/foxlazy.min.js",
      "/js/jquery.magnific-popup.min.js",
      "/js/all.js",
    ];
    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      document.head.appendChild(script);
    });
  }, []);

  return (
    <MainLayout>
      {/* Ürün Detayları */}
      <div className="shop-container container padd-only-xs product-template-default single single-product postid-2072 woocommerce woocommerce-page woocommerce-no-js wpb-js-composer js-comp-ver-5.6 responsive">
        <div className="row">
          <div className="col-sm-12 col-md-12 margin-lg-90b margin-sm-60b">
            <div className="woocommerce-notices-wrapper"></div>
            <div
              id="product-2072"
              className="post-2072 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-casual product_tag-modern first instock virtual purchasable product-type-simple"
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
                        data-thumb="/img/soft-chair/shop-img-3-768x946.jpg"
                        className="woocommerce-product-gallery__image flex-active-slide"
                      >
                        <a href="/img/soft-chair/shop-img-3-768x946.jpg">
                          <img
                            src="/img/soft-chair/shop-img-3-768x946.jpg"
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
                        src="/img/soft-chair/shop-img-3-150x150.jpg"
                        alt="slider image"
                        className=" flex-active clicked1"
                        draggable="false"
                      ></img>
                    </li>
                    <li>
                      <img
                        src="/img/soft-chair/shop-img-3-gallery-2-150x150.jpg"
                        alt="slider image"
                        draggable="false"
                        className="clicked2"
                      ></img>
                    </li>
                    <li>
                      <img
                        src="/img/soft-chair/shop-img-3-gallery-1-150x150.jpg"
                        alt="slider image"
                        draggable="false"
                        className="clicked3"
                      ></img>
                    </li>
                  </ol>
                </div>

                {/* Ürün Özeti */}
                <div className="summary entry-summary">
                  <h2 className="product_title entry-title">Soft chair</h2>
                  {/* Yıldız Değerlendirmesi */}
                  <div className="product-list-rating stars stars-example-css">
                    <div className="css-stars">
                      <span className="star full"></span>
                      <span className="star full"></span>
                      <span className="star full"></span>
                      <span className="star full"></span>
                      <span className="star half"></span>
                    </div>
                    <a
                      href="#reviews"
                      className="woocommerce-review-link"
                      rel="nofollow"
                    >
                      (<span className="count">2</span> customer reviews)
                    </a>
                  </div>

                  <p className="price">
                    <span className="woocommerce-Price-amount amount">
                      <span className="woocommerce-Price-currencySymbol">
                        £
                      </span>
                      57.00
                    </span>
                  </p>
                  <div className="woocommerce-product-details__short-description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </p>
                  </div>

                  {/* Sepete Ekle Formu */}
                  <form
                    className="cart"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="quantity custom-product-quantity">
                      <input
                        type="number"
                        className="input-text qty text"
                        step="1"
                        min="1"
                        max="1"
                        name="quantity"
                        defaultValue="1"
                        title="Qty"
                        size="4"
                      />
                      <span className="q_dec"></span>
                      <span className="q_inc"></span>
                    </div>
                    <button
                      type="submit"
                      name="add-to-cart"
                      value="2072"
                      className="single_add_to_cart_button button alt"
                    >
                      Add to cart
                    </button>
                  </form>

                  {/* Ürün Meta Bilgileri */}
                  <div className="product_meta">
                    <span className="sku_wrapper">
                      SKU: <span className="sku">PR105</span>
                    </span>
                    <span className="posted_in">
                      Category:{" "}
                      <a href="/acssessories" rel="tag">
                        acssessories
                      </a>
                    </span>
                    <span className="tagged_as">
                      Tags:{" "}
                      <a href="/casual" rel="tag">
                        Casual
                      </a>
                      ,{" "}
                      <a href="/modern" rel="tag">
                        Modern
                      </a>
                    </span>
                  </div>

                  {/* Sekmeler */}
                  <div className="woocommerce-tabs wc-tabs-wrapper">
                    <div className="tabs-item-wrapp">
                      <div
                        className="description_tab tabs-title"
                        id="tab-title-description"
                        aria-controls="tab-description"
                      >
                        <span className="tabs-mark">
                          <span className="tabs-mark-plus">+</span>
                          <span className="tabs-mark-minus">-</span>
                        </span>
                        <a href="#tab-description">Description</a>
                      </div>
                      <div
                        className="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab"
                        id="tab-description"
                        aria-labelledby="tab-title-description "
                        style={{ display: "none" }}
                      >
                        <p>
                          Weight <span style={{ color: "#7e7d7d" }}>1 kg</span>
                        </p>
                        <p>
                          Dimensions{" "}
                          <span style={{ color: "#7e7d7d" }}>
                            20 x 30 x 20 cm
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="tabs-item-wrapp">
                      <div
                        className="reviews_tab tabs-title"
                        id="tab-title-reviews"
                        aria-controls="tab-reviews"
                      >
                        <span className="tabs-mark">
                          <span className="tabs-mark-plus">+</span>
                          <span className="tabs-mark-minus">-</span>
                        </span>
                        <a href="#tab-reviews">Reviews (2)</a>
                      </div>
                      <div
                        className="woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab"
                        id="tab-reviews"
                        aria-labelledby="tab-title-reviews"
                        style={{ display: "none" }}
                      >
                        <div id="reviews" className="woocommerce-Reviews">
                          <div id="comments">
                            <ol className="commentlist">
                              {/* Yorum 1 */}
                              <li
                                className="comment even thread-even depth-1"
                                id="li-comment-21"
                              >
                                <div
                                  id="comment-21"
                                  className="comment_container"
                                >
                                  <img
                                    alt="avatar picture"
                                    src="/img/soft-chair/20180293a46053fb3b587c5268e7ea07.png"
                                    className="avatar avatar-60 photo"
                                    height="60"
                                    width="60"
                                  />
                                  <div className="comment-text">
                                    <p className="meta">
                                      <strong className="woocommerce-review__author">
                                        Howard Patterson
                                      </strong>{" "}
                                      <span className="woocommerce-review__dash">
                                        –
                                      </span>
                                      <time
                                        className="woocommerce-review__published-date"
                                        dateTime="2017-06-26T11:09:43+00:00"
                                      >
                                        June 26, 2017
                                      </time>
                                    </p>
                                    <div className="product-list-rating stars stars-example-css">
                                      <div className="css-stars">
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                        <span className="star empty"></span>
                                      </div>
                                    </div>
                                    <div className="description">
                                      <p>
                                        Nunc non purus efficitur, semper tortor
                                        faucibus, bibendum magna. Maecenas
                                        pulvinar ullamcorper justo in eleifend.
                                        Nulla feugiat nulla quis sodales
                                        condimentum. Sed iaculis, enim eget
                                        tincidunt pulvinar, lectus risus tempor
                                        nulla.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              {/* Yorum 2 */}
                              <li
                                className="comment odd alt thread-odd thread-alt depth-1"
                                id="li-comment-22"
                              >
                                <div
                                  id="comment-22"
                                  className="comment_container"
                                >
                                  <img
                                    alt="avatar picture"
                                    src="/img/soft-chair/20180293a46053fb3b587c5268e7ea07.png"
                                    className="avatar avatar-60 photo"
                                    height="60"
                                    width="60"
                                  />
                                  <div className="comment-text">
                                    <p className="meta">
                                      <strong className="woocommerce-review__author">
                                        Mike Heisenberg
                                      </strong>{" "}
                                      <span className="woocommerce-review__dash">
                                        –
                                      </span>
                                      <time
                                        className="woocommerce-review__published-date"
                                        dateTime="2017-06-26T11:16:56+00:00"
                                      >
                                        June 26, 2017
                                      </time>
                                    </p>
                                    <div className="product-list-rating stars stars-example-css">
                                      <div className="css-stars">
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                        <span className="star full"></span>
                                      </div>
                                    </div>
                                    <div className="description">
                                      <p>
                                        Proin sit amet dui est. Proin vitae
                                        lectus aliquet, vehicula lacus sed,
                                        fermentum massa. Morbi eleifend sapien
                                        orci, vitae imperdiet ante facilisis sit
                                        amet.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>

                          {/* Yorum Formu */}
                          <div id="review_form_wrapper">
                            <div id="review_form">
                              <div id="respond" className="comment-respond">
                                <span
                                  id="reply-title"
                                  className="comment-reply-title"
                                >
                                  <small>
                                    <a
                                      rel="nofollow"
                                      id="cancel-comment-reply-link"
                                      href="#"
                                      style={{ display: "none" }}
                                    >
                                      Cancel reply
                                    </a>
                                  </small>
                                </span>
                                <form
                                  action="#"
                                  method="post"
                                  id="commentform"
                                  className="comment-form"
                                  noValidate
                                >
                                  <p className="comment-notes">
                                    <span id="email-notes">
                                      Your email address will not be published.
                                    </span>{" "}
                                    Required fields are marked{" "}
                                    <span className="required">*</span>
                                  </p>
                                  <div className="comment-form-rating">
                                    <label htmlFor="rating">Your rating</label>
                                    <p className="stars">
                                      <span>
                                        <a className="star-1" href="#">
                                          1
                                        </a>
                                        <a className="star-2" href="#">
                                          2
                                        </a>
                                        <a className="star-3" href="#">
                                          3
                                        </a>
                                        <a className="star-4" href="#">
                                          4
                                        </a>
                                        <a className="star-5" href="#">
                                          5
                                        </a>
                                      </span>
                                    </p>
                                    <select
                                      name="rating"
                                      id="rating"
                                      required
                                      style={{ display: "none" }}
                                    >
                                      <option value="">Rate…</option>
                                      <option value="5">Perfect</option>
                                      <option value="4">Good</option>
                                      <option value="3">Average</option>
                                      <option value="2">Not that bad</option>
                                      <option value="1">Very poor</option>
                                    </select>
                                  </div>
                                  <p className="comment-form-comment">
                                    <textarea
                                      id="comment"
                                      name="comment"
                                      placeholder="Comment"
                                      cols="45"
                                      rows="8"
                                      required
                                    ></textarea>
                                  </p>
                                  <p className="comment-form-author">
                                    <input
                                      id="author"
                                      name="author"
                                      type="text"
                                      placeholder="Name"
                                      defaultValue=""
                                      size="30"
                                      required
                                    />
                                  </p>
                                  <p className="comment-form-email">
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      placeholder="Mail"
                                      defaultValue=""
                                      size="30"
                                      required
                                    />
                                  </p>
                                  <p className="form-submit">
                                    <input
                                      name="submit"
                                      type="submit"
                                      id="submit"
                                      className="submit"
                                      defaultValue="Submit"
                                    />
                                    <input
                                      type="hidden"
                                      name="comment_post_ID"
                                      defaultValue="2072"
                                      id="comment_post_ID"
                                    />
                                    <input
                                      type="hidden"
                                      name="comment_parent"
                                      id="comment_parent"
                                      defaultValue="0"
                                    />
                                  </p>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* İlgili Ürünler */}
              <div className="related products">
                <h2>Related products</h2>
                <ul className="products row columns-4">
                  {/* İlgili Ürün 1 */}
                  <li className="post-2074 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-modern first instock virtual purchasable product-type-simple">
                    <div className="product-list-image">
                      <img
                        className="s-img-switch"
                        src="/img/soft-chair/shop-img-4.jpg"
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
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        48.00
                      </span>
                    </span>
                  </li>
                  {/* İlgili Ürün 2 */}
                  <li className="post-2077 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-casual  instock virtual purchasable product-type-simple">
                    <div className="product-list-image">
                      <img
                        className="s-img-switch"
                        src="/img/soft-chair/shop-img-8.jpg"
                        alt="shop image"
                      />
                      <div className="product-link-wrapp">
                        <a
                          rel="nofollow"
                          href="/product/soft-chair/?add-to-cart=2077"
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
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        87.00
                      </span>
                    </span>
                  </li>
                  {/* İlgili Ürün 3 */}
                  <li className="post-2075 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-modern  instock virtual purchasable product-type-simple">
                    <div className="product-list-image">
                      <img
                        className="s-img-switch"
                        src="/img/soft-chair/shop-img-5.jpg"
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
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        83.40
                      </span>
                    </span>
                  </li>
                  {/* İlgili Ürün 4 */}
                  <li className="post-2163 product type-product status-publish has-post-thumbnail product_cat-acssessories product_tag-classic last instock virtual purchasable product-type-simple">
                    <div className="product-list-image">
                      <img
                        className="s-img-switch"
                        src="/img/soft-chair/shop-img-3.jpg"
                        alt=""
                      />
                      <div className="product-link-wrapp">
                        <a
                          rel="nofollow"
                          href="#"
                          data-quantity="1"
                          data-product_id="2163"
                          data-product_sku="PR109"
                          className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                        >
                          Add to cart
                        </a>
                      </div>
                    </div>
                    <h4 className="product-list-title">
                      <a href="/wooden-table">Wooden Table</a>
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
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        97.00
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
