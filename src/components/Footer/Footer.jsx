import React from "react";
import { Link } from "react-router-dom";
import Images from "../../images/images";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className="mt-5">
      <div className={`${styles.footer_heading} bg-color-stroke`}>
        <div className="bg-black bg-opacity-75 py-4">
          <div className="container py-2 px-4 px-md-5">
            <div className="row g-4 g-xl-0 justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-xl-3 order-0">
                <div className="mb-4">
                  <img src={Images.navLogo} alt="Footer logo" className={styles.footer_logo} />
                </div>
                <div className={styles.contact}>
                  <p className="mb-1 text-light-grey">
                    <i className="fa-solid fa-phone me-2"></i>01234567890
                  </p>
                  <p className="mb-0 text-light-grey">
                    <i className="fa-solid fa-envelope me-2"></i>store@techstore.com
                  </p>
                </div>
              </div>
              <div className="col-6 col-md-4 col-xl-2 order-md-3">
                <h5 className="text-white fw-bold">Company</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      About Tech Store
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Delivery Information
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-4 col-xl-2 order-md-4">
                <h5 className="text-white fw-bold">Help</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Customer Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Contact US
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Warranty
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className={styles.footer_link}>
                      Payment Methods
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-4 col-xl-2 order-md-5">
                <h5 className="text-white fw-bold">Products</h5>
                <ul className="list-unstyled ">
                  <li>
                    <Link to="/category/motherboard" className={styles.footer_link}>
                      Motherboards
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/processor" className={styles.footer_link}>
                      Processors
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/memory" className={styles.footer_link}>
                      Memory (RAM)
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/power-supply" className={styles.footer_link}>
                      Power Supply
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/case" className={styles.footer_link}>
                      Case
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-6 col-xl-3 order-md-1 order-xl-last">
                <div className="mb-4">
                  <h4 className="text-white fw-bold">Follow US</h4>
                </div>
                <div className="d-flex">
                  <a href="https://www.facebook.com/" className="text-decoration-none" target="_blank" rel="noreferrer">
                    <div className="social-circle">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                  </a>
                  <a href="https://www.instagram.com/" className="text-decoration-none" target="_blank" rel="noreferrer">
                    <div className="social-circle">
                      <i className="fa-brands fa-instagram"></i>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/" className="text-decoration-none" target="_blank" rel="noreferrer">
                    <div className="social-circle">
                      <i className="fa-brands fa-youtube"></i>
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/" className="text-decoration-none" target="_blank" rel="noreferrer">
                    <div className="social-circle">
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`p-3 ${styles.footer}`}>
        <div className="container px-2 px-md-5">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-0 text-light-grey">🔰 2022 AAK, Inc. All rights reserved.</p>
            </div>
            <div>
              <i className="fa-brands fa-cc-visa fa-2x mx-1 text-green"></i>
              <i className="fa-brands fa-cc-mastercard fa-2x mx-1 text-green"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
