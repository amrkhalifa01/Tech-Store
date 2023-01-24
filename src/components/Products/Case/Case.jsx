import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function Case() {
  let { fetchProducts } = useContext(productsContext);
  let [cases, setCases] = useState({});
  let [isCasesLoading, setIsCasesLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.case, 8, 1, setCases, setIsCasesLoading);
  }, []);

  return (
    <>
      {isCasesLoading ? (
        <div className="loader-container">
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="min-vh-100">
            <div className="nav-height"></div>
            <div className="products-heading my-4">
              <h1 className="mb-0">CASE</h1>
              <h2 className="mb-0">CASE</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {cases.data.map((caseProduct, index) => (
                  <Product product={caseProduct} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {cases.meta ? cases.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(cases.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.case} limit={8} setCategory={setCases} setCategoryLoading={setIsCasesLoading} pagination={cases.meta.pagination} /> : "" : ""}
    </>
  );
}
