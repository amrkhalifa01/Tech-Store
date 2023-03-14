import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function MousePad() {
  let { fetchProducts } = useContext(productsContext);
  let [mousePads, setMousePads] = useState({});
  let [isMousePadsLoading, setIsMousePadsLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.mousePad, 8, 1, setMousePads, setIsMousePadsLoading);
  }, []);

  return (
    <>
      {isMousePadsLoading ? (
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
              <h1 className="mb-0">MOUSE PAD</h1>
              <h2 className="mb-0">MOUSE PAD</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {mousePads.data.map((mousePad, index) => (
                  <Product product={mousePad} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {mousePads.meta ? (
        mousePads.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(mousePads.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.mousePad}
            limit={8}
            setCategory={setMousePads}
            setCategoryLoading={setIsMousePadsLoading}
            pagination={mousePads.meta.pagination}
            items={mousePads}
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
