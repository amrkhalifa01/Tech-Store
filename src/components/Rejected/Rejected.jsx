import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../Context/Store";
import styles from "./Rejected.module.scss";

export default function Rejected() {
  let { checkoutProcessError, checkoutErrorCode, navigate } = useContext(productsContext);

  useEffect(() => {
    if (checkoutProcessError.length === 0 || checkoutErrorCode.length === 0) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <div className="nav-height"></div>
      <div className="custom-height flex-column d-flex-rules">
        <h1 className={`${styles.reject_heading} mb-1`}>{checkoutErrorCode}</h1>
        <h2 className={styles.reject_sub_head}>OOPS ! WE ARE SORRY FOR THIS</h2>
        <p className={`${styles.caption} mb-2`}>{checkoutProcessError}</p>
        <Link to="/home" className={styles.reject_to_home}>
          Return to home page
        </Link>
      </div>
    </>
  );
}
