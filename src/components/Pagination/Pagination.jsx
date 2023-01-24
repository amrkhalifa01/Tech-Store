import React, { useEffect, useRef } from "react";

export default function Pagination({ fetchCategoryProducts, pages, categoryId, limit, setCategory, setCategoryLoading, pagination }) {
  let hexagonsWrapper = useRef(null);
  let prevBtn = useRef(null);
  let nextBtn = useRef(null);

  useEffect(() => {
    let children = Array.from(hexagonsWrapper.current.children);

    children.forEach((child) => {
      child.addEventListener("click", function () {
        children.forEach((child) => {
          child.classList.remove("active-hexagon");
        });
        this.classList.add("active-hexagon");
      });
    });

    prevBtn.current.addEventListener("click", function () {
      children.forEach((child) => {
        child.classList.remove("active-hexagon");
      });
      children.map((child) => {
        if (child.innerText == pagination.current_page - 1) {
          child.classList.add("active-hexagon");
        }
      });
    });
    nextBtn.current.addEventListener("click", function () {
      children.forEach((child) => {
        child.classList.remove("active-hexagon");
      });
      children.map((child) => {
        if (child.innerText == pagination.current_page + 1) {
          child.classList.add("active-hexagon");
        }
      });
    });
  }, [pagination.current_page]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <button className={`me-2 pagination-prev ${pagination.current_page === 1 ? "disabled opacity-50" : "opacity-100"}`} disabled={pagination.current_page === 1 ? true : false} onClick={() => (pagination.current_page !== 1 ? fetchCategoryProducts(categoryId, limit, --pagination.current_page, setCategory, setCategoryLoading) : null)} ref={prevBtn}>
        <i className="fa-solid fa-angles-left text-dark-grey"></i>
      </button>
      <div className="d-flex" ref={hexagonsWrapper}>
        {pages.map((page, index) => (
          <button key={index} className={`hexagon mx-1 border-0 ${pagination.current_page === 1 && index === 0 ? "active-hexagon" : ""}`} onClick={() => fetchCategoryProducts(categoryId, limit, page, setCategory, setCategoryLoading)}>
            <span className="hexagon-inner">{page}</span>
          </button>
        ))}
      </div>
      <button className={`ms-2 pagination-next ${pagination.current_page === pagination.total_pages ? "disabled opacity-50" : "opacity-100"}`} disabled={pagination.current_page === pagination.total_pages ? true : false} onClick={() => (pagination.current_page !== pagination.total_pages ? fetchCategoryProducts(categoryId, limit, ++pagination.current_page, setCategory, setCategoryLoading) : null)} ref={nextBtn}>
        <i className="fa-solid fa-angles-right text-dark-grey"></i>
      </button>
    </div>
  );
}
