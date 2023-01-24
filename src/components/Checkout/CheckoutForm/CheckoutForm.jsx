import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { productsContext } from "../../../Context/Store";
import Images from "../../../images/images";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import styles from "./CheckoutForm.module.scss";

const steps = ["CART", "INFORMATION", "PAYMENT"];

export default function CheckoutForm() {
  let { isCartLoading, cart, checkoutToken, isCheckoutLoading, setCheckoutToken, navigate } = useContext(productsContext);
  let [activeStep, setActiveStep] = useState(1);
  let [shippingData, setShippingData] = useState({});

  let [isDiscountLoading, setIsDiscountLoading] = useState(false);
  let [discountErrorMsg, setErrorDiscountMsg] = useState("");

  let [couponCode, setCouponCode] = useState("");

  let [isCountriesLoading, setIsCountriesLoading] = useState(true);
  let [shippingCountriesHTML, setShippingCountriesHTML] = useState({});
  let [shippingCountry, setShippingCountry] = useState("");

  let [isSubdivisionsLoading, setIsSubdivisionsLoading] = useState(true);
  let [shippingSubdivisionsHTML, setShippingSubdivisionsHTML] = useState({});
  let [shippingSubdivision, setShippingSubdivision] = useState("");

  let [isOptionsLoading, setIsOptionsLoading] = useState(true);
  let [shippingOptions, setShippingOptions] = useState([]);
  let [shippingOption, setShippingOption] = useState("");

  let [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    email: "",
    city: "",
    zip: "",
    shippingCountry: shippingCountry,
    shippingSubdivision: shippingSubdivision,
    shippingOption: shippingOption,
  });

  let [cardData, setCardData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    zip: "",
  });

  const fetchShippingCountries = async (checkoutTokenId) => {
    setIsCountriesLoading(true);
    let response = await commerce.services.localeListShippingCountries(checkoutTokenId);
    let countries = Object.entries(response.countries).map(([countryId, countryName]) => ({ id: countryId, label: countryName }));
    let country = countries[0].id;
    setShippingCountriesHTML(response.html);
    setShippingCountry(country);
    setIsCountriesLoading(false);
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    setIsSubdivisionsLoading(true);
    let response = await commerce.services.localeListSubdivisions(countryCode);
    let subdivisions = Object.entries(response.subdivisions).map(([subdivisionId, subdivisionName]) => ({ id: subdivisionId, label: subdivisionName }));
    let subdivision = subdivisions[0].id;
    setShippingSubdivisionsHTML(response.html);
    setShippingSubdivision(subdivision);
    setIsSubdivisionsLoading(false);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region) => {
    setIsOptionsLoading(true);
    let response = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    setShippingOptions(response);
    setShippingOption(response[0].id);
    setIsOptionsLoading(false);
  };

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const checkDiscount = async (e) => {
    e.preventDefault();
    handleDiscount();
  };

  const handleDiscount = async () => {
    try {
      setIsDiscountLoading(true);
      const response = await commerce.checkout.checkDiscount(checkoutToken.id, { code: couponCode });
      setCheckoutToken(response);
      setIsDiscountLoading(false);
      setErrorDiscountMsg("");
    } catch (error) {
      setErrorDiscountMsg(error.data.error.message);
      setIsDiscountLoading(false);
    }
  };

  useEffect(() => {
    if (checkoutToken) {
      fetchShippingCountries(checkoutToken.id);
    }
  }, [checkoutToken && checkoutToken.id]);

  useEffect(() => {
    if (shippingCountry) {
      fetchShippingSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingCountry) {
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }
  }, [shippingSubdivision]);

  useEffect(() => {
    if (!isCartLoading && cart.line_items.length === 0) {
      navigate("/cart");
    }
  }, [isCartLoading]);

  let addressFormLifting = {
    next,
    clientData,
    setClientData,
    shippingCountry,
    shippingCountriesHTML,
    isCountriesLoading,
    shippingSubdivision,
    shippingSubdivisionsHTML,
    isSubdivisionsLoading,
    shippingOption,
    setShippingCountry,
    setShippingSubdivision,
    setShippingOption,
    shippingOptions,
    isOptionsLoading,
  };

  let paymentFormLifting = {
    shippingData,
    backStep,
    nextStep,
    cardData,
    setCardData,
    isDiscountLoading,
  };

  return (
    <>
      {isCheckoutLoading ? (
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
          <div className="products-heading mt-4 mb-5">
            <h1 className="mb-0">CHECKOUT</h1>
            <h2 className="mb-0">CHECKOUT</h2>
          </div>
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-6">
                <div className="form-container rounded-4">
                  <div className="bg-black bg-opacity-75 rounded-3 text-white px-4 py-5">
                    <div className={`${styles.stepper} d-flex justify-content-between mb-4`}>
                      {steps.map((step, index) => (
                        <div className={`${index === 2 ? "" : "flex-grow-1"} ${index === activeStep ? styles.active : ""} ${index < activeStep ? styles.done : ""}`} key={index}>
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className={`rounded-circle align-self-center ${styles.step_circle}`}>{activeStep > index ? <i className="fa-solid fa-check"></i> : index + 1}</div>
                              <h3 className="text-light-grey fw-bold mb-0 mx-2">{step}</h3>
                            </div>
                            <div className={`${styles.line} w-100 ${index === 2 ? "d-none" : ""}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {activeStep === 1 ? <AddressForm {...addressFormLifting} /> : <PaymentForm {...paymentFormLifting} />}
                  </div>
                  <div className="form-icon">
                    <i className="fa-regular fa-credit-card"></i>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="px-3">
                  <div className="summary-sec-brdr mb-4">
                    <h3 className="h4 fw-bold text-dark-grey mb-2 d-flex align-items-center">
                      <i className="fa-solid fa-cart-shopping me-2"></i>ORDER SUMMARY
                    </h3>
                  </div>
                  <div className="mb-4 summary-sec-brdr pb-4">
                    {checkoutToken.line_items.map((line_item, index) => (
                      <div key={index} className="row align-items-center py-3">
                        <div className="col-md-9 col-xl-8 col-xxl-9">
                          <div className="d-flex align-items-center">
                            <div className={styles.prod_img_cont}>
                              <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={line_item.image.url} alt="cart product" className="w-100" />
                              <span className={styles.quantity_circle}>{line_item.quantity}</span>
                            </div>
                            <h4 className="h6 fw-bold text-dark-grey px-2 mb-0 cart-product-name chk-out-prod">{line_item.product_name}</h4>
                          </div>
                        </div>
                        <div className="col-md-3 col-xl-4 col-xxl-3">
                          <h4 className="h6 fw-bold text-green mb-0 d-flex align-items-center justify-content-center cart-product-name mt-3 mt-md-0">
                            <span className="text-light-grey me-2 mb-0 d-none d-md-flex h5">
                              <i className="fa-solid fa-grip-lines-vertical"></i>
                            </span>
                            <p className="text-dark-grey mb-0 me-2 d-md-none">PRICE:</p>
                            {line_item.line_total.formatted_with_code}
                          </h4>
                        </div>
                        <div className={`w-75 m-auto pt-4 light-brdr-bottom ${index + 1 === checkoutToken.line_items.length ? "d-none" : ""}`}></div>
                      </div>
                    ))}
                  </div>
                  <form className="mb-4 summary-sec-brdr pb-4" onSubmit={checkDiscount}>
                    <div className="row g-2">
                      <div className="col-12">
                        <div>
                          <label data-title="This field is requierd" htmlFor="couponCode" className="form-label fw-light mb-1">
                            Do you have a coupon code?
                          </label>
                          <div className="row g-3">
                            <div className="col-md-9">
                              <input type="text" value={couponCode.length !== 0 ? couponCode : ""} className={`form-control py-1 shadow-none ${styles.promo_code_input}`} name="couponCode" id="couponCode" onChange={(e) => setCouponCode(e.target.value)} placeholder="ENTER COUPON CODE" />
                            </div>
                            <div className="col-md-3">
                              <button type="submit" className={`btn py-1 w-100 ${styles.discount_btn}`} disabled={isDiscountLoading || couponCode.length === 0 ? true : false}>
                                APPLY{isDiscountLoading ? <i className="fa fa-spinner fa-spin ms-2"></i> : ""}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {discountErrorMsg ? (
                        <div className="col-12">
                          <div className="alert alert-danger px-2 py-1 mb-0">{discountErrorMsg}</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                  <div className="summary-sec-brdr pb-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">SUBTOTAL:</h4>
                      <p className="fs-6 mb-0 text-dark-grey">{checkoutToken.subtotal.formatted_with_code}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">DISCOUNT:</h4>
                      <p className="fs-6 mb-0 text-dark-grey">{checkoutToken.discount.amount_saved ? checkoutToken.discount.amount_saved.formatted_with_code : "0.00 EGP"}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0 fw-bold text-dark-grey">SHIPPING:</h4>
                      <p className="fs-6 mb-0 text-dark-grey">To be calculated</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="h6 mb-0 fw-bold text-green">TOTAL:</h4>
                    <p className="fs-6 mb-0 text-green fw-bold">{checkoutToken.total.formatted_with_code}</p>
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
