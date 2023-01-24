import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productsContext } from "../../Context/Store";
import Images from "../../images/images";
import { categories, commerce } from "../../lib/commerce";
import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product";
import styles from "./Search.module.scss";

export default function Search() {
  let { navigate } = useContext(productsContext);

  let [searchParams, setSearchParams] = useSearchParams();
  let searchWords = searchParams.get("query");

  let [searchResults, setSearchResults] = useState({});
  let [isSearchLoading, setIsSearchLoading] = useState(true);

  let [categorySearch, setCategorySearch] = useState(null);

  let [notFoundWord, setNotFoundWord] = useState("products");

  const getSearchResult = async (category, limit, page, callBack, callBackLoad, sortBy = "name", sortDirection = "asc") => {
    try {
      callBackLoad(true);
      const response = await commerce.products.list({ category_id: category, query: searchWords, limit, page, sortBy, sortDirection });
      callBack(response);
      callBackLoad(false);
    } catch (error) {
      navigate("/not-found");
    }
  };

  useEffect(() => {
    if (searchWords == null) {
      navigate("/not-found");
    }
    getSearchResult(categorySearch, 20, 1, setSearchResults, setIsSearchLoading);
  }, []);

  useEffect(() => {
    getSearchResult(categorySearch, 20, 1, setSearchResults, setIsSearchLoading);
  }, [searchWords, categorySearch]);

  return (
    <>
      <div className="container">
        <div className="nav-height"></div>
        <div className="products-heading my-4">
          <h1 className="mb-0">SEARCH RESULTS</h1>
          <h2 className="mb-0">SEARCH RESULTS</h2>
        </div>
        <div className="row align-items-center g-3">
          <div className="col-md-4 order-1">
            <div className="text-center">
              <button className="btn common-btn w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#filterBar" aria-controls="filterBar">
                <i className="fa-solid fa-sliders me-2"></i>Filter
              </button>
              <div className="offcanvas offcanvas-start border-0 bg-color-stroke offcanvas-customize" data-bs-scroll="false" id="filterBar" aria-labelledby="offcanvasExampleLabel">
                <div className="bg-black bg-opacity-75 h-100">
                  <button className="close-offcanvas" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="h-100">
                      <div className="offcanvas-header p-4">
                        <h5 className="offcanvas-title fw-bold text-white" id="offcanvasExampleLabel">
                          Filter by category
                        </h5>
                      </div>
                      <div className="offcanvas-body py-0 h-100">
                        <div className="position-relative mb-3">
                          <button type="button" className={`dropdown-item d-flex align-items-center justify-content-between px-3 py-2 rounded-2 ${styles.filter_bar_btn}`} data-bs-toggle="dropdown" aria-expanded="false">
                            Pc Componenet<i className="fa-solid fa-angle-down ms-2"></i>
                          </button>
                          <ul className="dropdown-menu w-100 px-2 bg-light-grey">
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.motherboardIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.motherboard);
                                      setNotFoundWord("motherboards");
                                    }}>
                                    Motherboard
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.processorIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.processor);
                                      setNotFoundWord("processors");
                                    }}>
                                    Processor
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.memoryIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.memory);
                                      setNotFoundWord("memory products");
                                    }}>
                                    Memory (RAM)
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.graphicCardIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.graphicCard);
                                      setNotFoundWord("graphic cards");
                                    }}>
                                    Graphic Card
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.caseIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.case);
                                      setNotFoundWord("stand-alone cases");
                                    }}>
                                    Case
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.powerSupplyIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.powerSupply);
                                      setNotFoundWord("power supply units");
                                    }}>
                                    Power Supply Unit
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.liquidCoolingIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.liquidCooling);
                                      setNotFoundWord("liquid cooling products");
                                    }}>
                                    Liquid Cooling
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.airCoolingIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.airCooling);
                                      setNotFoundWord("air cooling products");
                                    }}>
                                    Air Cooling
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.ssdIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.solidStateDrive);
                                      setNotFoundWord("solid state drives");
                                    }}>
                                    Solid State Drive
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.hddIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.hardDrive);
                                      setNotFoundWord("hard drives");
                                    }}>
                                    Hard Drive
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className={styles.category_icon}>
                            <img src={Images.monitorIcon} className="w-100" alt="motherboad icon" />
                          </div>
                          <div className={styles.filter_btn_container}>
                            <button
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                              className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                              onClick={() => {
                                setCategorySearch(categories.gamingMonitor);
                                setNotFoundWord("gaming monitors");
                              }}>
                              Gaming Monitor
                            </button>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className={styles.category_icon}>
                            <img src={Images.chairIcon} className="w-100" alt="motherboad icon" />
                          </div>
                          <div className={styles.filter_btn_container}>
                            <button
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                              className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                              onClick={() => {
                                setCategorySearch(categories.gamingChairs);
                                setNotFoundWord("gaming chairs");
                              }}>
                              Gaming Chair
                            </button>
                          </div>
                        </div>
                        <div className="position-relative mb-3">
                          <button type="button" className={`dropdown-item d-flex align-items-center justify-content-between px-3 py-2 rounded-2 ${styles.filter_bar_btn}`} data-bs-toggle="dropdown" aria-expanded="false">
                            Accessories<i className="fa-solid fa-angle-down ms-2"></i>
                          </button>
                          <ul className="dropdown-menu w-100 px-2 bg-light-grey">
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.mouseIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.mouse);
                                      setNotFoundWord("mouses");
                                    }}>
                                    Mouse
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.mousePadIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.mousePad);
                                      setNotFoundWord("mouse pads");
                                    }}>
                                    Mouse Pad
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.keyboardIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.keyboard);
                                      setNotFoundWord("keyboards");
                                    }}>
                                    Keyboard
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <div className={styles.category_icon}>
                                  <img src={Images.headsetIcon} className="w-100" alt="motherboad icon" />
                                </div>
                                <div className={styles.filter_btn_container}>
                                  <button
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`}
                                    onClick={() => {
                                      setCategorySearch(categories.gamingHeadset);
                                      setNotFoundWord("gaming headsets");
                                    }}>
                                    Gaming Headset
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <button
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            className={`dropdown-item px-3 py-2 rounded-2 text-start ${styles.filter_bar_btn}`}
                            onClick={() => {
                              setCategorySearch(null);
                              setNotFoundWord("products");
                            }}>
                            All products
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 order-start order-md-2">
            <h3 className="h6 fw-bold text-dark-grey text-center">
              Search For
              <i className="fa-solid fa-quote-left text-green ms-2 me-1 fa-2xs"></i>
              {searchWords}
              <i className="fa-solid fa-quote-right text-green ms-1 fa-2xs"></i>
            </h3>
          </div>
          <div className="col-md-4 order-3">
            <div className="text-center">
              <div className="position-relative mb-3">
                <button type="button" className="btn common-btn w-100" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-arrow-down-wide-short me-2"></i>Sort By
                </button>
                <ul className="dropdown-menu w-100 px-2 bg-light-grey">
                  <li>
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <div className={styles.category_icon}>
                        <i className="fa-solid fa-arrow-down-a-z text-green"></i>
                      </div>
                      <div className={styles.filter_btn_container}>
                        <button aria-label="Close" className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`} onClick={() => getSearchResult(categorySearch, 20, 1, setSearchResults, setIsSearchLoading, "name", "asc")}>
                          Name From A to Z
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <div className={styles.category_icon}>
                        <i className="fa-solid fa-arrow-down-z-a text-green"></i>
                      </div>
                      <div className={styles.filter_btn_container}>
                        <button aria-label="Close" className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`} onClick={() => getSearchResult(categorySearch, 20, 1, setSearchResults, setIsSearchLoading, "name", "desc")}>
                          Name from Z to A
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <div className={styles.category_icon}>
                        <i className="fa-solid fa-arrow-down-9-1 text-green"></i>
                      </div>
                      <div className={styles.filter_btn_container}>
                        <button aria-label="Close" className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`} onClick={() => getSearchResult(categorySearch, 20, 1, setSearchResults, setIsSearchLoading, "price", "desc")}>
                          Price from expensive to cheap
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <div className={styles.category_icon}>
                        <i className="fa-solid fa-arrow-down-1-9 text-green"></i>
                      </div>
                      <div className={styles.filter_btn_container}>
                        <button aria-label="Close" className={`dropdown-item px-3 rounded-pill ${styles.filter_bar_btn}`} onClick={() => getSearchResult(categorySearch, 20, 1, setSearchResults, setIsSearchLoading, "price", "asc")}>
                          Price from cheap to expensive
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.search_section}>
        {isSearchLoading ? (
          <div className={`loader-container ${styles.loader_container}`}>
            <div className="loader triangle">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>
          </div>
        ) : (
          <div className={`container ${searchResults.data ? "pb-5 pt-3 pt-md-5" : ""}`}>
            <div className="row justify-content-center g-3">
              {searchResults.data ? (
                searchResults.data.map((searchResult, index) => <Product product={searchResult} key={index} />)
              ) : (
                <div className={`d-flex flex-column justify-content-center align-items-center ${styles.section_height}`}>
                  <img src={Images.sadFace} alt="sad face" className={`mb-2 ${styles.sad_face}`} />
                  <h4 className="h5 mb-3 text-center">Sorry, there are no {notFoundWord} matching your search words</h4>
                  <Link to="/home" className={styles.search_to_home}>
                    <i className="fa-solid fa-arrow-left me-2"></i>Back to home
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        {searchResults.meta ? searchResults.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(searchResults.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={getSearchResult} categoryId={categorySearch} limit={20} setCategory={setSearchResults} setCategoryLoading={setIsSearchLoading} pagination={searchResults.meta.pagination} /> : "" : ""}
      </div>
    </>
  );
}
