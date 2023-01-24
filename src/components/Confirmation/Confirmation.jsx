import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { productsContext } from "../../Context/Store";
import Images from "../../images/images";
import styles from "./Confirmation.module.scss";

export default function Confirmation() {
  let { order, isRefreshCartLoading } = useContext(productsContext);

  return (
    <>
      {isRefreshCartLoading || !order.id ? (
        <div className="loader-container">
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        </div>
      ) : (
        <div className="min-vh-100">
          <div className="nav-height"></div>
          <div className="container pt-5">
            <div className="row g-4">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <div className={`d-flex flex-column align-items-center py-5 px-4 px-md-5 mb-4 ${styles.congrats_box}`}>
                  <div className="mb-4">
                    <LazyLoadImage placeholderSrc={Images.strockSmall} src={Images.confiti} className={styles.confiti_icon} alt="confiti" />
                  </div>
                  <div className="mb-3">
                    <h1 className={`h3 text-dark-grey text-center mb-1 ${styles.congrats}`}>CONGRATULATIONS {order.customer.firstname}</h1>
                    <h2 className="h5 text-green text-center mb-0">Your order has been placed</h2>
                  </div>
                  <div className="text-center mb-3">
                    <p className="text-dark-grey mb-1">Thank you for your purchase 😊.</p>
                    <p className="text-dark-grey mb-1">
                      An email confirmation was sent to you at <span className="text-green">{order.customer.email}</span>
                    </p>
                    <p className="text-dark-grey mb-1">
                      Your order code is: <span className="text-green">{order.customer_reference}</span>, save it because if you leave this page you can't come back again
                    </p>
                    <p className="text-dark-grey mb-1">
                      If you have any question about your order, please contact us at <span className="text-green">store@techstore.com</span>
                    </p>
                  </div>
                  <div>
                    <Link to="/home" className={styles.continue_shop_link}>
                      <i className="fa-solid fa-arrow-left me-2"></i>Back to home
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="px-2">
                  <div className="summary-sec-brdr mb-3">
                    <h3 className="h5 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                      <i className="fa-solid fa-cart-shopping me-2 text-green"></i>ORDER DETAILS
                    </h3>
                  </div>
                  <div className="mb-3">
                    {order.order.line_items.map((line_item, index) => (
                      <div key={index} className="row align-items-center py-3">
                        <div className="col-md-9">
                          <div className="d-flex align-items-center">
                            <div className={styles.prod_img_cont}>
                              <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={line_item.image.url} alt="cart product" className="w-100" />
                              <span className={styles.quantity_circle}>{line_item.quantity}</span>
                            </div>
                            <h4 className="small-font text-dark-grey px-3 mb-0">{line_item.product_name}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h4 className="small-font fw-bold text-green mb-0 d-flex align-items-center justify-content-center mt-3 mt-md-0">
                            <span className="text-light-grey me-2 mb-0 d-none d-md-flex h5">
                              <i className="fa-solid fa-grip-lines-vertical"></i>
                            </span>
                            <p className="text-dark-grey mb-0 me-2 d-md-none">PRICE:</p>
                            {line_item.line_total.formatted_with_code}
                          </h4>
                        </div>
                        <div className={`w-75 m-auto pt-4 light-brdr-bottom ${index + 1 === order.order.line_items.length ? "d-none" : ""}`}></div>
                      </div>
                    ))}
                  </div>
                  {order.order.discount.amount_saved ? (
                    <div className="mb-3">
                      <div className="summary-sec-brdr mb-3">
                        <h3 className="h5 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                          <i className="fa-solid fa-percent me-2 text-green"></i>DISCOUNT DETAILS
                        </h3>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h4 className="h6 mb-0 fw-bold text-dark-grey">COUPON CODE:</h4>
                        <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.order.discount.code}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h4 className="h6 mb-0 fw-bold text-dark-grey">COUPON VALUE:</h4>
                        <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.order.discount.value} %</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="h6 mb-0 fw-bold text-dark-grey">DISCOUNT VALUE:</h4>
                        <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.order.discount.amount_saved.formatted_with_code}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="mb-3">
                    <div className="summary-sec-brdr mb-3">
                      <h3 className="h5 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                        <i className="fa-solid fa-truck-fast me-2 text-green"></i>SHIPPING DETAILS
                      </h3>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">SHIPPING COUNTRY:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.shipping.country}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">SHIPPING PRICE:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.order.shipping.price.formatted_with_code}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="px-2">
                  <div className="mb-3">
                    <div className="summary-sec-brdr mb-3">
                      <h3 className="h5 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                        <i className="fa-solid fa-tachograph-digital me-2 text-green"></i>PERSONAL DATA
                      </h3>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">FULL NAME:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">
                        {order.customer.firstname} {order.customer.lastname}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">EMAIL ADDRESS:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.customer.email}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">ADDRESS:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.shipping.street}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">TOWN:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.shipping.town_city}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">ZIP / POSTAL CODE:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.shipping.postal_zip_code}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="summary-sec-brdr mb-3">
                      <h3 className="h5 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                        <i className="fa-solid fa-money-bill-wave me-2 text-green"></i>ORDER PRICE
                      </h3>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">SUBTOTAL:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.order.subtotal.formatted_with_code}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">TOTAL:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.order.total.formatted_with_code}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="summary-sec-brdr mb-3">
                      <h3 className="h5 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                        <i className="fa-solid fa-money-check-dollar me-2 text-green"></i>PAYMENT DETAILS
                      </h3>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">CARD NUMBER ENDING:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">**** **** **** {order.transactions[0].gateway_reference}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">SOURCE:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.transactions[0].payment_source.brand}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">BILLING POSTAL CODE:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.transactions[0].payment_source.billing_zip_postal_code}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">PAYMENT STATUS:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.status_payment}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">AMOUNT VALUE:</h4>
                      <p className="fs-6 mb-0 fw-bold text-green ps-2">{order.transactions[0].amount.formatted_with_code}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
