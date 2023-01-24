import axios from "axios";
import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { authenticationContext, productsContext } from "../../Context/Store";

export default function Login() {
  let { authApiBaseUrl, saveClientData } = useContext(authenticationContext);
  let { navigate } = useContext(productsContext);

  let [isLoginLoading, setIsLoginLoading] = useState(false);

  let [apiError, setApiError] = useState("");

  let [joiErrorList, setJoiErrorList] = useState([]);

  let [clientData, setClientData] = useState({
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
    setIsLoginLoading(true);
    if (validateResult.error) {
      setJoiErrorList(validateResult.error.details);
      setIsLoginLoading(false);
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
      let { data } = await axios.post(`${authApiBaseUrl}signin`, clientData);
      if (data.message === "success") {
        localStorage.setItem("clientToken", data.token);
        saveClientData();
        navigate("/home");
        setIsLoginLoading(false);
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
          title: "Signed in successfully",
        });
      } else {
        setApiError(data.message);
        setIsLoginLoading(false);
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
        <div className="form-container rounded-4 login-form">
          <div className="bg-black bg-opacity-75 rounded-3 text-white p-5">
            <h1 className="h2 fw-light mb-3">Login</h1>
            <form className="auth-form" onSubmit={sendClientData}>
              <div className="mb-3">
                <label htmlFor="email-input" className="form-label fw-light mb-1">
                  Email address
                </label>
                <input type="email" className="form-control shadow-none" name="email" id="email-input" placeholder="enter your email address" onChange={getClientDate} />
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
                <input type="password" className="form-control shadow-none" autoComplete="on" name="password" id="password-input" placeholder="enter your password" onChange={getClientDate} />
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
                <button className="btn common-btn">LOG IN{isLoginLoading ? <i className="fa fa-spinner fa-spin ms-2"></i> : ""}</button>
              </div>
            </form>
          </div>
          <div className="form-icon">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </div>
        </div>
      </div>
    </>
  );
}
