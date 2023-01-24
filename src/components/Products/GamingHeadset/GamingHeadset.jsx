import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function GamingHeadset() {
  let { fetchProducts } = useContext(productsContext);
  let [gamingHeadsets, setGamingHeadsets] = useState({});
  let [isGheadsetLoading, setIsGheadsetLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.gamingHeadset, 8, 1, setGamingHeadsets, setIsGheadsetLoading);
  }, []);

  return (
    <>
      {isGheadsetLoading ? (
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
              <h1 className="mb-0">GAMING HEADSET</h1>
              <h2 className="mb-0">GAMING HEADSET</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {gamingHeadsets.data.map((gamingHeadset, index) => (
                  <Product product={gamingHeadset} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {gamingHeadsets.meta ? gamingHeadsets.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(gamingHeadsets.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.gamingHeadset} limit={8} setCategory={setGamingHeadsets} setCategoryLoading={setIsGheadsetLoading} pagination={gamingHeadsets.meta.pagination} /> : "" : ""}
    </>
  );
}
