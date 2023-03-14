import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function Processors() {
  let { fetchProducts } = useContext(productsContext);
  let [processors, setProcessors] = useState({});
  let [isProLoading, setIsProLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.processor, 8, 1, setProcessors, setIsProLoading);
  }, []);

  return (
    <>
      {isProLoading ? (
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
              <h1 className="mb-0">PROCESSORS</h1>
              <h2 className="mb-0">PROCESSORS</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {processors.data.map((processor, index) => (
                  <Product product={processor} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {processors.meta ? (
        processors.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(processors.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.processor}
            limit={8}
            setCategory={setProcessors}
            setCategoryLoading={setIsProLoading}
            pagination={processors.meta.pagination}
            items={processors}
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
