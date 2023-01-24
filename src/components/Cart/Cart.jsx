import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../Context/Store";
import Images from "../../images/images";

import styles from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";

export default function Cart() {
  let { cart, isCartLoading, emptyCart, isEmptyLoading, isUpdateLoading, isRemoveLoading, isCheckoutLoading, isAddLoading, isRefreshCartLoading } = useContext(productsContext);

  return (
    <>
      {isCartLoading || isAddLoading || isRefreshCartLoading ? (
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
          {cart.line_items.length !== 0 ? (
            <div className="products-heading mt-4 mb-2">
              <h1 className="mb-0">YOUR CART</h1>
              <h2 className="mb-0">YOUR CART</h2>
            </div>
          ) : (
            ""
          )}

          <div className="container">
            <div className="row g-2 g-lg-4 px-3 px-md-0">
              {!cart.line_items.length ? (
                <div className="custom-height d-flex justify-content-center">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="mb-3">
                      <img src={Images.emptyCart} alt="empty cart" className={styles.empty_cart_img} />
                    </div>
                    <h3 className="fw-bold text-dark-grey mb-3">Your cart is empty !</h3>
                    <p className="fw-light text-dark-grey mb-1 text-center">Before proceed to checkout, you must add some products to your cart.</p>
                    <p className="fw-light text-dark-grey mb-0 text-center">You will find a lot of interesting products on our shop pages.</p>
                    <div className="mt-3">
                      <Link to="/home" className={styles.continue_shop_link}>
                        <i className="fa-solid fa-arrow-left me-2"></i>Start shopping
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-xl-8">
                    <div className={`row py-3 d-none d-lg-flex ${styles.heading_brdr}`}>
                      <div className="col-md-5">
                        <h3 className="h6 mb-0 fw-bold text-dark-grey">PRODUCTS</h3>
                      </div>
                      <div className="col-md-2">
                        <h3 className="h6 mb-0 fw-bold text-dark-grey">PRICE</h3>
                      </div>
                      <div className="col-md-2">
                        <h3 className="h6 mb-0 fw-bold text-dark-grey">QUANTITY</h3>
                      </div>
                      <div className="col-md-2">
                        <h3 className="h6 mb-0 fw-bold text-dark-grey">SUBTOTAL</h3>
                      </div>
                    </div>
                    {cart.line_items.map((item, index) => (
                      <CartItem item={item} key={index} />
                    ))}

                    <div className="mt-3">
                      <Link to="/home" className={styles.continue_shop_link}>
                        <i className="fa-solid fa-arrow-left me-2"></i>Continue shopping
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="py-3 px-3">
                      <h3 className="h4 mb-3 fw-bold text-dark-grey">SUMMARY</h3>
                      <div className={`p-4 mb-3 ${styles.summary_box}`}>
                        <div className="mb-3 summary-sec-brdr">{localStorage.getItem("clientToken") ? <div className={`alert ${styles.alert_registered} py-2 text-center`}>REGISTERED ACCOUNT</div> : <div className={`alert ${styles.alert_unregitered} py-2 text-center`}>UNREGISTERED ACCOUNT</div>}</div>
                        <div className="mb-3 summary-sec-brdr">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h4 className="h6 mb-0 fw-bold text-dark-grey">SUPTOTAL:</h4>
                            <p className="fs-6 mb-0 text-dark-grey">
                              {isUpdateLoading || isRemoveLoading ? <i className="fa fa-spinner fa-spin me-2"></i> : null}
                              {cart.subtotal.formatted_with_code}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h4 className="h6 mb-0 fw-bold text-dark-grey">DISCOUNT:</h4>
                            <p className="fs-6 mb-0 text-dark-grey">To be calculated</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h4 className="h6 mb-0 fw-bold text-dark-grey">SHIPPING:</h4>
                            <p className="fs-6 mb-0 text-dark-grey">To be calculated</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="h5 mb-0 fw-bold text-green">TOTAL:</h4>
                          <p className="fs-5 mb-0 fw-bold text-dark-grey">
                            {isUpdateLoading || isRemoveLoading ? <i className="fa fa-spinner fa-spin me-2"></i> : null}
                            {cart.subtotal.formatted_with_code}
                          </p>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <button className={`btn w-100 ${styles.empty_cart_btn} ${isEmptyLoading || isCheckoutLoading ? "disabled" : ""}`} onClick={() => emptyCart()}>
                            EMPTY CART {isEmptyLoading ? <i className="fa fa-spinner fa-spin ms-2"></i> : ""}
                          </button>
                        </div>
                        <div className="col-md-6">
                          <Link to={"/checkout"} className={`btn w-100 ${styles.checkout_btn} ${isCheckoutLoading || isCartLoading || isRemoveLoading || isUpdateLoading || isEmptyLoading ? "disabled" : ""}`}>
                            CHECHOUT{isCheckoutLoading || isCartLoading || isRemoveLoading || isUpdateLoading ? <i className="fa fa-spinner fa-spin ms-2"></i> : ""}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
