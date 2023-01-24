import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function GamingMonitors() {
  let { fetchProducts } = useContext(productsContext);
  let [gamingMonitors, setGamingMonitors] = useState({});
  let [isGmonitorsLoading, setIsGmonitorsLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.gamingMonitor, 8, 1, setGamingMonitors, setIsGmonitorsLoading);
  }, []);

  return (
    <>
      {isGmonitorsLoading ? (
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
              <h1 className="mb-0">GAMING MONITORS</h1>
              <h2 className="mb-0">GAMING MONITORS</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {gamingMonitors.data.map((gamingMonitor, index) => (
                  <Product product={gamingMonitor} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {gamingMonitors.meta ? gamingMonitors.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(gamingMonitors.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.gamingMonitor} limit={8} setCategory={setGamingMonitors} setCategoryLoading={setIsGmonitorsLoading} pagination={gamingMonitors.meta.pagination} /> : "" : ""}
    </>
  );
}
