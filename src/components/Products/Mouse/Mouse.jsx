import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function Mouse() {
  let { fetchProducts } = useContext(productsContext);
  let [mouses, setMouses] = useState({});
  let [isMousesLoading, setIsMousesLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.mouse, 8, 1, setMouses, setIsMousesLoading);
  }, []);

  return (
    <>
      {isMousesLoading ? (
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
              <h1 className="mb-0">MOUSE</h1>
              <h2 className="mb-0">MOUSE</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {mouses.data.map((mouse, index) => (
                  <Product product={mouse} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {mouses.meta ? mouses.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(mouses.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.mouse} limit={8} setCategory={setMouses} setCategoryLoading={setIsMousesLoading} pagination={mouses.meta.pagination} /> : "" : ""}
    </>
  );
}
