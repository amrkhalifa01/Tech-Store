import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticationContext } from "../../../Context/Store";

export default function AddressForm(props) {
  let { next, clientData, setClientData, shippingCountry, shippingSubdivision, shippingOption, setShippingCountry, setShippingSubdivision, setShippingOption, shippingCountriesHTML, isCountriesLoading, shippingSubdivisionsHTML, isSubdivisionsLoading, shippingOptions, isOptionsLoading } = props;
  let { client } = useContext(authenticationContext);

  let [joiErrorsList, setJoiErrorsList] = useState([]);

  let [disableSubmitBtn, setDisableSubmitBtn] = useState(true);

  const getClientData = (e) => {
    const client = { ...clientData };
    client[e.target.name] = e.target.value;
    setClientData(client);
    switchBtn(client);
  };

  const switchBtn = (clientData) => {
    if (clientData.firstName.length !== 0 && clientData.lastName.length !== 0 && clientData.address1.length !== 0 && clientData.city.length !== 0 && clientData.email.length !== 0 && clientData.zip.length !== 0 && clientData.shippingCountry && clientData.shippingSubdivision && clientData.shippingOption && !isCountriesLoading && !isSubdivisionsLoading && !isOptionsLoading) {
      setDisableSubmitBtn(false);
    } else {
      setDisableSubmitBtn(true);
    }
  };

  const validateAddressForm = () => {
    const scheme = Joi.object({
      firstName: Joi.string().alphanum().min(3).max(15).required(),
      lastName: Joi.string().alphanum().min(3).max(15).required(),
      address1: Joi.string().min(3).max(50).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
        .required(),
      city: Joi.string().min(3).max(30).required(),
      zip: Joi.string().pattern(new RegExp("^[0-9]{4,8}$")).message("Enter valid ZIP / Postal Code").required(),
      shippingCountry: Joi.string().pattern(new RegExp("^[a-zA-Z]{2}$")).message("Country ID is not valid").required(),
      shippingSubdivision: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{1,3}$")).message("Subdivision ID is not valid").required(),
      shippingOption: Joi.string().pattern(new RegExp("^ship_[a-zA-Z0-9]{14}$")).message("Shipping option ID is not valid").required(),
    });
    return scheme.validate(clientData, { abortEarly: false });
  };

  const submitAddressForm = (e) => {
    e.preventDefault();
    const validationResult = validateAddressForm();
    if (validationResult.error) {
      setJoiErrorsList(validationResult.error.details);
    } else {
      next(clientData);
      setJoiErrorsList([])
    }
  };

  const setRegisterDate = () => {
    let currentClient = { ...clientData };
    currentClient.firstName = client.first_name;
    currentClient.lastName = client.last_name;
    currentClient.email = client.email;
    setClientData(currentClient);
  };

  useEffect(() => {
    if (clientData.firstName.length === 0 && clientData.lastName.length === 0 && clientData.email.length === 0) {
      setRegisterDate();
    }
  }, []);

  useEffect(() => {
    clientData.shippingCountry = shippingCountry;
    clientData.shippingSubdivision = shippingSubdivision;
    clientData.shippingOption = shippingOption;
  }, [shippingCountry, shippingSubdivision, shippingOption]);

  useEffect(() => {
    switchBtn(clientData);
  }, [isCountriesLoading, isSubdivisionsLoading, isOptionsLoading]);

  return (
    <form className="auth-form" onSubmit={submitAddressForm}>
      <h1 className="h5 text-light-grey fw-bold mb-3">PERSONAL INFORMATION</h1>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <div>
            <label htmlFor="firstNameInput" className="form-label fw-light mb-1">
              First Name
            </label>
            <input defaultValue={clientData.firstName ? clientData.firstName : ""} type="text" id="firstNameInput" className="form-control shadow-none" name="firstName" placeholder="Enter your first name" onChange={getClientData} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "firstName" ? (
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
            <label htmlFor="lastNameInput" className="form-label fw-light mb-1">
              Last Name
            </label>
            <input defaultValue={clientData.lastName ? clientData.lastName : ""} type="text" id="lastNameInput" className="form-control shadow-none" name="lastName" placeholder="Enter your last name" onChange={getClientData} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "lastName" ? (
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
            <label htmlFor="addressInput" className="form-label fw-light mb-1">
              Address
            </label>
            <input defaultValue={clientData.address1 ? clientData.address1 : ""} type="text" id="addressInput" className="form-control shadow-none" name="address1" placeholder="Enter your address" onChange={getClientData} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "address1" ? (
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
            <label htmlFor="emailInput" className="form-label fw-light mb-1">
              Email Address
            </label>
            <input defaultValue={clientData.email ? clientData.email : ""} type="email" id="emailInput" className="form-control shadow-none" name="email" placeholder="Enter valid email" onChange={getClientData} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "email" ? (
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
            <label htmlFor="cityInput" className="form-label fw-light mb-1">
              Town
            </label>
            <input defaultValue={clientData.city ? clientData.city : ""} type="text" id="cityInput" className="form-control shadow-none" name="city" placeholder="Enter your city" onChange={getClientData} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "city" ? (
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
            <input defaultValue={clientData.zip ? clientData.zip : ""} type="text" id="zipInput" className="form-control shadow-none" name="zip" placeholder="Enter your ZIP / postal code" onChange={getClientData} />
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
      <h2 className="h5 text-light-grey fw-bold mb-3">SHIPPING INFORMATION</h2>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <div>
            <label className="form-label fw-light mb-1 d-flex align-items-center">Shipping Country {isCountriesLoading ? <i className="fa fa-spinner fa-spin ms-1 mb-0"></i> : ""}</label>
            <select name="shippingCountry" className="form-select shadow-none" aria-label="Default select example" defaultValue={clientData.shippingCountry ? clientData.shippingCountry : shippingCountry ? shippingCountry : ""} onChange={(e) => setShippingCountry(e.target.value)} dangerouslySetInnerHTML={shippingCountriesHTML ? { __html: shippingCountriesHTML } : ""} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "shippingCountry" ? (
              <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                {error.message.replace("C", " c")}
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div className="col-md-6">
          <div>
            <label className="form-label fw-light mb-1">Shipping Subdivision {isSubdivisionsLoading ? <i className="fa fa-spinner fa-spin ms-1 mb-0"></i> : ""}</label>
            <select name="shippingSubdivision" className="form-select shadow-none" aria-label="Default select example" defaultValue={clientData.shippingSubdivision ? clientData.shippingSubdivision : shippingSubdivision ? shippingSubdivision : ""} onChange={(e) => setShippingSubdivision(e.target.value)} dangerouslySetInnerHTML={shippingSubdivisionsHTML ? { __html: shippingSubdivisionsHTML } : ""} />
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "shippingSubdivision" ? (
              <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                {error.message.replace("S", " s")}
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div className="col-12">
          <div>
            <label className="form-label fw-light mb-1">Shipping Options {isOptionsLoading ? <i className="fa fa-spinner fa-spin ms-1 mb-0"></i> : ""}</label>
            <select className="form-select shadow-none" aria-label="Default select example" name="shippingOption" defaultValue={clientData.shippingOption ? clientData.shippingOption : shippingOption ? shippingOption : ""} onChange={(e) => setShippingOption(e.target.value)}>
              {shippingOptions.map((option, index) => (
                <option value={option.id} key={index} className="option">
                  {option.description} - {option.price.formatted_with_code}
                </option>
              ))}
            </select>
          </div>
          {joiErrorsList.map((error, index) =>
            error.path[0] === "shippingOption" ? (
              <div key={index} className="alert alert-danger py-1 px-2 mt-2 mb-0">
                {error.message.replace("O", " o")}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Link to="/cart" type="submit" className="btn d-flex align-items-center chk-form-btn">
          <i className="fa-solid fa-arrow-left me-2"></i>BACK TO CART
        </Link>
        <div>
          <button type="submit" className="btn common-btn" disabled={disableSubmitBtn}>
            NEXT
          </button>
        </div>
      </div>
    </form>
  );
}
