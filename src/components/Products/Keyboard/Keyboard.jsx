import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function Keyboard() {
  let { fetchProducts } = useContext(productsContext);
  let [keyboards, setKeyboards] = useState({});
  let [isKbLoading, setIsKbLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.keyboard, 8, 1, setKeyboards, setIsKbLoading);
  }, []);

  return (
    <>
      {isKbLoading ? (
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
              <h1 className="mb-0">KEYBOARD</h1>
              <h2 className="mb-0">KEYBOARD</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {keyboards.data.map((keyboard, index) => (
                  <Product product={keyboard} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {keyboards.meta ? (
        keyboards.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(keyboards.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.keyboard}
            limit={8}
            setCategory={setKeyboards}
            setCategoryLoading={setIsKbLoading}
            pagination={keyboards.meta.pagination}
            items={keyboards}
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
