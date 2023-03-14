import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function PowerSupply() {
  let { fetchProducts } = useContext(productsContext);
  let [powerSupply, setPowerSupply] = useState({});
  let [isPsLoading, setIsPsLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.powerSupply, 8, 1, setPowerSupply, setIsPsLoading);
  }, []);

  return (
    <>
      {isPsLoading ? (
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
              <h1 className="mb-0">POWER SUPPLY UNIT</h1>
              <h2 className="mb-0">POWER SUPPLY UNIT</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {powerSupply.data.map((powerSupplyProduct, index) => (
                  <Product product={powerSupplyProduct} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {powerSupply.meta ? (
        powerSupply.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(powerSupply.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.powerSupply}
            limit={8}
            setCategory={setPowerSupply}
            setCategoryLoading={setIsPsLoading}
            pagination={powerSupply.meta.pagination}
            items={powerSupply}
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
