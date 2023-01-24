import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function GamingChairs() {
  let { fetchProducts } = useContext(productsContext);
  let [gamingChairs, setGamingChairs] = useState({});
  let [isGchairsLoading, setIsGchairsLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.gamingChairs, 8, 1, setGamingChairs, setIsGchairsLoading);
  }, []);

  return (
    <>
      {isGchairsLoading ? (
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
              <h1 className="mb-0">GAMING CHAIRS</h1>
              <h2 className="mb-0">GAMING CHAIRS</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {gamingChairs.data.map((gamingChair, index) => (
                  <Product product={gamingChair} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {gamingChairs.meta ? gamingChairs.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(gamingChairs.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.gamingChairs} limit={8} setCategory={setGamingChairs} setCategoryLoading={setIsGchairsLoading} pagination={gamingChairs.meta.pagination} /> : "" : ""}
    </>
  );
}
