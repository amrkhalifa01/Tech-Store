import React, { useContext } from "react";
import styles from "./Navbar.module.scss";
import Images from "../../images/images";
import { Link, useLocation } from "react-router-dom";
import { authenticationContext, productsContext } from "../../Context/Store";
import Swal from "sweetalert2";

export default function Navbar() {
  let { cart, emptyCart, isCartLoading, isAddLoading, isUpdateLoading, isRemoveLoading, isEmptyLoading, isRefreshCartLoading, navigate } = useContext(productsContext);

  let { client, logout } = useContext(authenticationContext);

  let url = useLocation();

  const onLogout = () => {
    if (cart.line_items.length !== 0) {
      Swal.fire({
        title: "Are you sure to logout?",
        text: "Your cart items will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#07db96",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          emptyCart();
          navigate("/home");
          logout();
        }
      });
    } else {
      logout();
      navigate("/home");
    }
  };

  const goToSearch = (e) => {
    e.preventDefault();
    let searchText = e.currentTarget[0].value.toLowerCase();
    navigate({
      pathname: `/search`,
      search: `?query=${searchText}`,
    });
  };

  return (
    <>
      <header className={url.pathname === "/search" ? styles.custom_header_zindex : ""}>
        <div className="bg-color-stroke">
          <div className="bg-black bg-opacity-75 py-2">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center py-2">
                <button className="btn border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav">
                  <i className="fa-solid fa-bars text-white"></i>
                </button>
                <div className="offcanvas offcanvas-start border-0 bg-color-stroke offcanvas-customize" data-bs-scroll="false" id="mobileNav" aria-labelledby="offcanvasExampleLabel">
                  <div className="bg-black bg-opacity-75 h-100">
                    <button className="close-offcanvas" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="d-flex flex-column justify-content-between h-100">
                      <div>
                        <div className="offcanvas-header p-4">
                          <h5 className="offcanvas-title fw-bold text-white" id="offcanvasExampleLabel">
                            Shop Now
                          </h5>
                        </div>
                        <div className="offcanvas-body py-0">
                          <div className="mb-3">
                            <button type="button" className={`btn dropdown-toggle w-100 text-white ${styles.btn_mint}`} data-bs-toggle="dropdown" aria-expanded="false">
                              PC Component
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <Link className="dropdown-item p-0" to="category/motherboard">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Motherboard
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/processor">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Processors
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/memory">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Memory (RAM)
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/graphic-card">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Graphic Cards
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/case">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Case
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/power-supply">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Power Supply
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/liquid-cooling">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Liquid Cooling
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/air-cooling">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Air Colling
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/solid-state-drive">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Solid State Drives
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item p-0" to="category/hard-drive">
                                  <button data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                    Hard Drives
                                  </button>
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <Link to="category/gaming-monitor" className="mb-3 d-block">
                            <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${styles.btn_mint} bg-transparent w-100 px-3 py-1 text-center`}>
                              Gaming Monitors
                            </button>
                          </Link>
                          <Link to="category/gaming-chair" className="mb-3 d-block">
                            <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${styles.btn_mint} bg-transparent w-100 px-3 py-1 text-center`}>
                              Gaming Chairs
                            </button>
                          </Link>
                          <button type="button" className={`btn dropdown-toggle w-100 text-white ${styles.btn_mint}`} data-bs-toggle="dropdown" aria-expanded="false">
                            Accessories
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <Link className="dropdown-item p-0" to="category/mouse">
                                <button type="button" data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                  Mouse
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item p-0" to="category/mouse-pad">
                                <button type="button" data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                  Mouse Pad
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item p-0" to="category/keyboard">
                                <button type="button" data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                  Keyboard
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item p-0" to="category/gaming-headset">
                                <button type="button" data-bs-dismiss="offcanvas" aria-label="Close" className="border-0 bg-transparent w-100 px-3 py-1 text-start">
                                  Gaming Headset
                                </button>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="mb-4">
                          {client ? (
                            <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${styles.btn_mint} bg-transparent w-100 px-3 py-1 text-center mb-3 d-block`} onClick={onLogout}>
                              {client.first_name} {client.last_name}
                              <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                            </button>
                          ) : (
                            <>
                              <Link to="login" className="mb-3 d-block">
                                <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${styles.btn_mint} bg-transparent w-100 px-3 py-1 text-center`}>
                                  Login
                                </button>
                              </Link>
                              <Link to="register" className="mb-3 d-block">
                                <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${styles.btn_mint} bg-transparent w-100 px-3 py-1 text-center`}>
                                  Register
                                </button>
                              </Link>
                            </>
                          )}
                        </div>
                        <div className="d-flex justify-content-center">
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
                <Link to="home">
                  <img src={Images.navLogo} alt="" className={styles.logo} />
                </Link>
                <div className={`${styles.search_box} d-none d-lg-block`}>
                  <form onSubmit={goToSearch} className="d-flex" role="search">
                    <input className="form-control me-2 shadow-none input-brdr-green" type="search" aria-label="Search" placeholder="Search..." required />
                    <button className={`btn ${styles.nav_search_btn}`} type="submit">
                      Search
                    </button>
                  </form>
                </div>
                <div>
                  <ul className="d-flex align-items-center list-unstyled mb-0">
                    {client ? (
                      <li className="mx-2 d-none d-lg-block">
                        <button className={`bg-transparent border-0 ${styles.sub_nav_link}`} onClick={onLogout}>
                          {client.first_name} {client.last_name}
                          <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                        </button>
                      </li>
                    ) : (
                      <>
                        <li className="mx-2 d-none d-lg-block">
                          <Link to="login" className={styles.sub_nav_link}>
                            Login
                          </Link>
                        </li>
                        <li className="mx-2 d-none d-lg-block">
                          <Link to="register" className={styles.sub_nav_link}>
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                    <li className={`${styles.cart} mx-2`}>
                      <Link to="cart" className={styles.sub_nav_link}>
                        <div className={styles.cart_icon}>
                          <img src={Images.cart} alt="cart icon" />
                          <span className={styles.cart_count}>{isCartLoading ? <i className="fa fa-spinner fa-spin"></i> : isAddLoading || isUpdateLoading || isRemoveLoading || isEmptyLoading || isRefreshCartLoading ? <i className="fa fa-spinner fa-spin"></i> : cart.total_items}</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container light-brdr-bottom d-lg-none">
          <div className="p-2">
            <form onSubmit={goToSearch} className="d-flex align-items-center" role="search">
              <input className="form-control me-2 shadow-none input-brdr-green" type="search" aria-label="Search" placeholder="Search..." />
              <button className={`btn ${styles.mob_search_btn}`} type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <nav className="navbar navbar-expand-md d-none d-lg-block p-0">
          <div className="container light-brdr-bottom p-2">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-0">
                <li className="nav-item dropdown">
                  <Link className={`nav-link ${styles.nav_link}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    PC Component <i className="fa-solid fa-angle-down"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="category/motherboard">
                        Motherboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/processor">
                        Processors
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/memory">
                        Memory (RAM)
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/graphic-card">
                        Graphic Cards
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/case">
                        Case
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/power-supply">
                        Power Supply
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/liquid-cooling">
                        Liquid Cooling
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/air-cooling">
                        Air Colling
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/solid-state-drive">
                        Solid State Drives
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/hard-drive">
                        Hard Drives
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${styles.nav_link}`} to="category/gaming-monitor">
                    Gaming Monitors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${styles.nav_link}`} to="category/gaming-chair">
                    Gaming Chairs
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className={`nav-link ${styles.nav_link}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Accessories <i className="fa-solid fa-angle-down"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="category/mouse">
                        Mouse
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/mouse-pad">
                        Mouse Pad
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/keyboard">
                        Keyboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="category/gaming-headset">
                        Gaming Headset
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-0">
                <li className="nav-item">
                  <a className={`nav-link ${styles.nav_link}`} href="https://www.facebook.com/">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${styles.nav_link}`} href="https://www.instagram.com/">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${styles.nav_link}`} href="https://www.youtube.com/">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${styles.nav_link}`} href="https://www.linkedin.com/">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
