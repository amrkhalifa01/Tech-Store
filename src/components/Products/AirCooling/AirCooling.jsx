import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function AirCooling() {
  let { fetchProducts } = useContext(productsContext);
  let [airCooling, setAirCooling] = useState({});
  let [isAcLoading, setIsAcLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.airCooling, 8, 1, setAirCooling, setIsAcLoading);
  }, []);

  return (
    <>
      {isAcLoading ? (
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
              <h1 className="mb-0">AIR COOLING</h1>
              <h2 className="mb-0">AIR COOLING</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {airCooling.data.map((airCoolingProduct, index) => (
                  <Product product={airCoolingProduct} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {airCooling.meta ? (
        airCooling.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(airCooling.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.airCooling}
            limit={8}
            setCategory={setAirCooling}
            setCategoryLoading={setIsAcLoading}
            pagination={airCooling.meta.pagination}
            items={airCooling}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
}
