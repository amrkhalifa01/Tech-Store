import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function LiquidCooling() {
  let { fetchProducts } = useContext(productsContext);
  let [liquidCooling, setLiquidCooling] = useState({});
  let [isLcLoading, setIsLcLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.liquidCooling, 8, 1, setLiquidCooling, setIsLcLoading);
  }, []);

  return (
    <>
      {isLcLoading ? (
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
              <h1 className="mb-0">LIQUID COOLING</h1>
              <h2 className="mb-0">LIQUID COOLING</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {liquidCooling.data.map((LiquidCoolingProduct, index) => (
                  <Product product={LiquidCoolingProduct} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {liquidCooling.meta ? liquidCooling.meta.pagination.total_pages !== 1 ? <Pagination pages={[...Array(liquidCooling.meta.pagination.total_pages)].fill(1).map((element, index) => index + 1)} fetchCategoryProducts={fetchProducts} categoryId={categories.liquidCooling} limit={8} setCategory={setLiquidCooling} setCategoryLoading={setIsLcLoading} pagination={liquidCooling.meta.pagination} /> : "" : ""}
    </>
  );
}
