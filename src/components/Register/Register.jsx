import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import { authenticationContext, productsContext } from "../../Context/Store";

export default function Register() {
  let { authApiBaseUrl } = useContext(authenticationContext);
  let { navigate } = useContext(productsContext);

  let [isRegLoading, setIsRegLoading] = useState(false);

  let [apiError, setApiError] = useState("");

  let [joiErrorList, setJoiErrorList] = useState([]);

  let [clientData, setClientData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  function getClientDate(e) {
    let client = { ...clientData };
    client[e.target.name] = e.target.value;
    setClientData(client);
  }

  async function sendClientData(e) {
    e.preventDefault();
    let validateResult = validateRegisterForm();
    setIsRegLoading(true);
    if (validateResult.error) {
      setJoiErrorList(validateResult.error.details);
      setIsRegLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "Something wrong, check your data",
      });
    } else {
      setJoiErrorList([]);
      let { data } = await axios.post(`${authApiBaseUrl}signup`, clientData);
      if (data.message === "success") {
        navigate("/login");
        setIsRegLoading(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        });
      } else {
        setApiError(data.message);
        setIsRegLoading(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: "Something wrong, check your data",
        });
      }
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().alphanum().message('"first_name" must be string').min(3).max(15).required(),
      last_name: Joi.string().alphanum().message('"last_name" must be string').min(3).max(15).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$")).message("Entre Valid Password - Minimum eight characters, at least one letter AND one number").required(),
    });
    return scheme.validate(clientData, { abortEarly: false });
  }

  useEffect(() => {
    if (localStorage.getItem("clientToken")) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="nav-height mb-5"></div>
      <div className="custom-height container d-flex-rules">
        <div className="form-container rounded-4 register-form">
          <div className="bg-black bg-opacity-75 rounded-3 text-white p-5">
            <h1 className="h2 fw-light mb-3">Register</h1>
            <form className="auth-form" onSubmit={sendClientData}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="fName-input" className="form-label fw-light mb-1">
                      First name
                    </label>
                    <input type="text" className="form-control shadow-none" id="fName-input" name="first_name" placeholder="enter your first name" onChange={getClientDate} />
                    {joiErrorList.map((error, index) => {
                      if (error.path[0] === "first_name") {
                        return (
                          <div key={index} className="alert alert-danger py-1 mb-0 mt-2">
                            {error.message.replace("_", " ")}
                          </div>
                        );
                      }
                      return "";
                    })}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lName-input" className="form-label fw-light mb-1">
                      Last name
                    </label>
                    <input type="text" className="form-control shadow-none" id="lName-input" name="last_name" placeholder="enter your last name" onChange={getClientDate} />
                    {joiErrorList.map((error, index) => {
                      if (error.path[0] === "last_name") {
                        return (
                          <div key={index} className="alert alert-danger py-1 mb-0 mt-2">
                            {error.message.replace("_", " ")}
                          </div>
                        );
                      }
                      return "";
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email-input" className="form-label fw-light mb-1">
                  Email address
                </label>
                <input type="email" className="form-control shadow-none" id="email-input" name="email" placeholder="enter your email address" onChange={getClientDate} />
                {joiErrorList.map((error, index) => {
                  if (error.path[0] === "email") {
                    return (
                      <div key={index} className="alert alert-danger py-1 mb-0 mt-2">
                        {error.message}
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
              <div className="mb-3">
                <label htmlFor="password-input" className="form-label fw-light mb-1">
                  Password
                </label>
                <input type="password" className="form-control shadow-none" autoComplete="on" id="password-input" name="password" placeholder="enter your password" onChange={getClientDate} />
                {joiErrorList.map((error, index) => {
                  if (error.path[0] === "password") {
                    return (
                      <div key={index} className="alert alert-danger py-1 mb-0 mt-2">
                        {error.message}
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
              {apiError ? <div className="alert alert-danger py-2">{apiError}</div> : ""}
              <div>
                <button className={`btn common-btn ${isRegLoading ? "disabled" : ""}`}>REGISTER{isRegLoading ? <i className="fa fa-spinner fa-spin ms-2"></i> : ""}</button>
              </div>
            </form>
          </div>
          <div className="form-icon">
            <i className="fa-solid fa-user-plus"></i>
          </div>
        </div>
      </div>
    </>
  );
}
