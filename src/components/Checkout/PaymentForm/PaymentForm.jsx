import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";

export default function PaymentForm(props) {
  let { shippingData, backStep, nextStep, cardData, setCardData, isDiscountLoading } = props;
  let { checkoutToken, handleCaptureCheckout, isRefreshCartLoading, isOrderLoading, navigate } = useContext(productsContext);

  let [joiErrorsList, setJoiErrorsList] = useState([]);

  let [disableSubmitBtn, setDisableSubmitBtn] = useState(true);

  const getCardData = (e) => {
    const card = { ...cardData };
    card[e.target.name] = e.target.value;
    setCardData(card);
    switchBtn(card);
  };

  const switchBtn = (cardData) => {
    if (cardData.cardNumber.length !== 0 && cardData.expiryMonth.length !== 0 && cardData.expiryYear.length !== 0 && cardData.cvc.length !== 0 && cardData.zip.length !== 0) {
      setDisableSubmitBtn(false);
    } else {
      setDisableSubmitBtn(true);
    }
  };

  const validateCardDataForm = () => {
    const scheme = Joi.object({
      cardNumber: Joi.string().pattern(new RegExp("^4242424242424242$")).message("Enter card number 4242 4242 4242 4242 for testing").required(),
      expiryMonth: Joi.string().pattern(new RegExp("^(0[1-9]|1[012])$")).message("Enter card expiry month EX. (01, 02, 03, ..., 12)").required(),
      expiryYear: Joi.string().pattern(new RegExp("^20\\d{2}$")).message("Enter card expiry year EX. (2023, 2024, ...)").required(),
      cvc: Joi.string().pattern(new RegExp("^[0-9]{3}$")).message("Enter any three digits for testing").required(),
      zip: Joi.string().pattern(new RegExp("^[0-9]{5}$")).message("Enter any five digits for testing").required(),
    });
    return scheme.validate(cardData, { abortEarly: false });
  };

  const handleSubmitPayForm = async (e) => {
    e.preventDefault();
    const validationResult = validateCardDataForm();
    if (validationResult.error) {
      setJoiErrorsList(validationResult.error.details);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: cardData.cardNumber,
            expiry_month: cardData.expiryMonth,
            expiry_year: cardData.expiryYear,
            cvc: cardData.cvc,
            postal_zip_code: cardData.zip,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
      setJoiErrorsList([]);
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
    }
  };

  useEffect(() => {
    switchBtn(cardData);
  }, [cardData]);

  useEffect(() => {
    if (!isOrderLoading && isRefreshCartLoading) {
      navigate("/confirmation");
    }
  }, [isOrderLoading, isRefreshCartLoading]);

  return (
    <>
      <h1 className="h5 text-light-grey fw-bold mb-3">PAYMENT METHOD</h1>
      <form className="auth-form" onSubmit={(e) => handleSubmitPayForm(e)}>
        <div className="row g-2 mb-4">
          <div className="col-12">
            <div>
              <label htmlFor="cardNumberInput" className="form-label fw-light mb-1">
                Card Number
              </label>
              <input defaultValue={cardData.cardNumber ? cardData.cardNumber : ""} type="number" id="cardNumberInput" className="form-control shadow-none" name="cardNumber" placeholder="Enter card number" onChange={getCardData} />
            </div>
            {joiErrorsList.map((error, index) =>
              error.path[0] === "cardNumber" ? (
                <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                  {error.message.replace("N", " n")}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="expiryMonthInput" className="form-label fw-light mb-1">
                Card Expiry Month
              </label>
              <input defaultValue={cardData.expiryMonth ? cardData.expiryMonth : ""} type="number" id="expiryMonthInput" className="form-control shadow-none" name="expiryMonth" placeholder="Enter card expiry month" onChange={getCardData} />
            </div>
            {joiErrorsList.map((error, index) =>
              error.path[0] === "expiryMonth" ? (
                <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                  {error.message.replace("M", " m")}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="expiryYearInput" className="form-label fw-light mb-1">
                Card Expiry Year
              </label>
              <input defaultValue={cardData.expiryYear ? cardData.expiryYear : ""} type="number" id="expiryYearInput" className="form-control shadow-none" name="expiryYear" placeholder="Enter card expiry year" onChange={getCardData} />
            </div>
            {joiErrorsList.map((error, index) =>
              error.path[0] === "expiryYear" ? (
                <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                  {error.message.replace("Y", " y")}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="cvcInput" className="form-label fw-light mb-1">
                Card CVC Number
              </label>
              <input defaultValue={cardData.cvc ? cardData.cvc : ""} type="number" id="cvcInput" className="form-control shadow-none" name="cvc" placeholder="Enter Card Validation Code" onChange={getCardData} />
            </div>
            {joiErrorsList.map((error, index) =>
              error.path[0] === "cvc" ? (
                <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                  {error.message}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="zipInput" className="form-label fw-light mb-1">
                ZIP / Postal code
              </label>
              <input defaultValue={cardData.zip ? cardData.zip : ""} type="number" id="zipInput" className="form-control shadow-none" name="zip" placeholder="Enter ZIP / postal code" onChange={getCardData} />
            </div>
            {joiErrorsList.map((error, index) =>
              error.path[0] === "zip" ? (
                <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                  {error.message.replace("zip", "Postal code")}
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className="row justify-content-between g-3">
          <div className="col-12 col-md-4 order-last order-md-first">
            <button className="btn d-flex justify-content-center align-items-center chk-form-btn w-100" onClick={() => backStep()} disabled={isOrderLoading || isRefreshCartLoading ? true : false}>
              <i className="fa-solid fa-arrow-left me-2"></i>BACK TO INFO
            </button>
          </div>
          <div className="col-12 col-md-6 order-first order-md-last">
            <button type="submit" className="btn common-btn w-100" disabled={disableSubmitBtn || isOrderLoading || isRefreshCartLoading || isDiscountLoading ? true : false}>
              PAY {checkoutToken.total_with_tax.formatted_with_code}
              {isOrderLoading || isDiscountLoading ? <div className="fa fa-spinner fa-spin ms-2"></div> : ""}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
