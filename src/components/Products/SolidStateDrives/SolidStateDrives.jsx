import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function SolidStateDrives() {
  let { fetchProducts } = useContext(productsContext);
  let [sSDrives, setSSDrives] = useState({});
  let [isSSDLoading, setIsSSDLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.solidStateDrive, 8, 1, setSSDrives, setIsSSDLoading);
  }, []);

  return (
    <>
      {isSSDLoading ? (
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
              <h1 className="mb-0">SOLID STATE DRIVE</h1>
              <h2 className="mb-0">SOLID STATE DRIVE</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {sSDrives.data.map((sSDrive, index) => (
                  <Product product={sSDrive} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {sSDrives.meta ? sSDrives.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(sSDrives.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.solidStateDrive} limit={8} setCategory={setSSDrives} setCategoryLoading={setIsSSDLoading} pagination={sSDrives.meta.pagination} /> : "" : ""}
    </>
  );
}
