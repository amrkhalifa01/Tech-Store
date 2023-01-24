import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useSearchParams } from "react-router-dom";
import { productsContext } from "../../Context/Store";
import Images from "../../images/images";
import { commerce } from "../../lib/commerce";
import styles from "./ProductDetails.module.scss";

export default function ProductDetails() {
  let { addToCart, isAddLoading, navigate, cart, goToProductDetails } = useContext(productsContext);
  let [params, setParams] = useSearchParams();
  let [product, setProduct] = useState({});
  let [isProductLoading, setIsProductLoading] = useState(true);
  let productId = params.get("id");
  let [productQuantity, setProductQuantity] = useState(1);
  let [productAvailability, setProductAvailability] = useState(true);

  const fetchProduct = async () => {
    try {
      setIsProductLoading(true);
      const response = await commerce.products.retrieve(productId);
      setProduct(response);
      setIsProductLoading(false);
      if (response.inventory.available === 0) {
        setProductQuantity(0);
      }
    } catch (error) {
      navigate("/not-found");
    }
  };

  const increaseProductQuantity = () => {
    productQuantity++;
    setProductQuantity(productQuantity);
  };

  const decreaseProductQuantity = () => {
    productQuantity--;
    setProductQuantity(productQuantity);
  };

  const onAddProduct = () => {
    let cartItems = cart.line_items;
    let currentProduct = cartItems.filter((cartItem) => cartItem.product_id === product.id);
    let cartItemsIds = cart.line_items.map((cartItem) => cartItem.product_id);
    let productInCart = cartItemsIds.includes(product.id);
    if ((product.inventory.available === 1 && productInCart) || product.inventory.available === 0 || (currentProduct.length !== 0 && currentProduct[0].quantity + productQuantity > product.inventory.available)) {
      setProductAvailability(false);
      setTimeout(() => setProductAvailability(true), 2000);
    } else {
      addToCart(productId, productQuantity);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <>
      {isProductLoading ? (
        <div className="loader-container">
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="nav-height"></div>
          <div className="container pb-5 pt-4">
            <nav aria-label="breadcrumb" className="pt-3">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/home" className={styles.bread_crumb_link}>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/category/${product.categories[0].name}`} className={styles.bread_crumb_link}>
                    {product.categories[0].name}
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="row mb-4">
              <div className="col-lg-5">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="false">
                  <div className={`carousel-inner p-4 border rounded-3 d-flex align-items-center ${styles.carousel_height}`}>
                    {product.assets.map((asset, index) =>
                      index === 0 ? (
                        <div key={index} className="carousel-item text-center active">
                          <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={asset.url} className="d-block m-auto" alt="product" />
                        </div>
                      ) : (
                        <div key={index} className="carousel-item text-center">
                          <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={asset.url} className="d-block m-auto" alt="product" />
                        </div>
                      )
                    )}
                  </div>
                  <div className="carousel-indicators mx-1 mt-4 position-static flex-wrap">
                    {product.assets.map((asset, index) =>
                      index === 0 ? (
                        <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`active ${styles.indicator}`} aria-current="true" aria-label={`Slide ${index}`}>
                          <LazyLoadImage src={asset.url} className="d-block m-auto w-100" alt="product" />
                        </button>
                      ) : (
                        <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={styles.indicator} aria-label={`Slide ${index}`}>
                          <LazyLoadImage src={asset.url} className="d-block m-auto w-100" alt="product" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="pt-4">
                  <h1 className={`h4 fw-bold mb-2 text-dark-grey ${styles.product_name}`}>{product.name}</h1>
                  <h2 className={`h4 fw-bold text-green mb-4 ${styles.product_price}`}>PRICE: {product.price.formatted_with_code}</h2>
                  <div className="container-fluid">
                    <div className="row g-3">
                      <div className="col-4 col-sm-3 col-xxl-2">
                        <div className="px-2 rounded-pill quantity-box h-100">
                          <button className={`btn quantity-btn p-0 ${productQuantity === 0 || productQuantity === 1 ? "disabled" : ""}`} onClick={() => decreaseProductQuantity()} disabled={productQuantity === 1 ? true : false}>
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span className="mx-3 quantity">{productQuantity}</span>
                          <button className={`btn quantity-btn p-0 ${productQuantity === product.inventory.available || product.inventory.available === 0 ? "disabled" : ""}`} onClick={() => increaseProductQuantity()} disabled={productQuantity === product.inventory.available ? true : false}>
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-7 col-sm-8">
                        <button className={`btn w-100 ms-2 ${isAddLoading ? "disabled" : ""} ${!productAvailability || product.inventory.available === 0 ? "out-of-stock mouse-not-allowed" : "common-btn"}`} onClick={() => onAddProduct()} disabled={isAddLoading ? true : false}>
                          {!productAvailability || product.inventory.available === 0 ? (
                            <>
                              Out Of Stock<i className="fa-solid fa-exclamation ms-2"></i>
                            </>
                          ) : (
                            <>
                              Add To Cart<i className={`${isAddLoading ? "fa fa-spinner fa-spin" : "fa-solid fa-cart-arrow-down"} ms-2`}></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 shadow-sm rounded-2 styles.overview mb-5 ${styles.overview}`}>
              <div className="light-brdr-bottom mb-3">
                <h3 className={`fw-bold h5 mb-0 pb-1 green-brdr-bottom text-dark-grey ${styles.overview_heading}`}>Overview</h3>
              </div>
              <div className={styles.overview_desc} dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div>
              <div className="light-brdr-bottom mb-4">
                <h2 className={`fw-bold h4 mb-0 pb-2 text-light-black ${styles.green_brdr_bottom}`}>Related Products</h2>
              </div>
              <div className="row justify-content-center g-3">
                {product.related_products.slice(0, 4).map((relatedProduct, index) => (
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                    <div className={`product border rounded-3 w-100 h-100 d-flex flex-column ${relatedProduct.quantity === 0 ? "alert-out-of-stock" : ""}`}>
                      <div className="d-flex flex-column justify-content-between flex-grow-1 mouse-pointer p-3 pb-0" onClick={() => goToProductDetails(relatedProduct.id)}>
                        <h3 className="h6 mb-4 text-dark-grey">{relatedProduct.name}</h3>
                        <div className="flex-grow-1 d-flex-rules mb-4 rounded-3 overflow-hidden">
                          <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={relatedProduct.image.url} className="img-dimensions" alt={relatedProduct.image.id} />
                        </div>
                        <h4 className="h5 fw-bold text-green mb-4 mt-2">{relatedProduct.price.formatted_with_code}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
