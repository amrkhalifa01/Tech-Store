import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function Motherboard() {
  let { fetchProducts } = useContext(productsContext);
  let [motherboards, setMotherboards] = useState({});
  let [isMbLoading, setIsMbLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.motherboard, 8, 1, setMotherboards, setIsMbLoading);
  }, []);

  return (
    <>
      {isMbLoading ? (
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
              <h1 className="mb-0">MOTHERBOARDS</h1>
              <h2 className="mb-0">MOTHERBOARDS</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {motherboards.data.map((motherboard, index) => (
                  <Product product={motherboard} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {motherboards.meta ? motherboards.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(motherboards.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.motherboard} limit={8} setCategory={setMotherboards} setCategoryLoading={setIsMbLoading} pagination={motherboards.meta.pagination} /> : "" : ""}
    </>
  );
}
