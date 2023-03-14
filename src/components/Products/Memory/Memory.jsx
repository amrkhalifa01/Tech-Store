import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function Memory() {
  let { fetchProducts } = useContext(productsContext);
  let [memory, setMemory] = useState({});
  let [isMemoryLoading, setIsMemoryLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.memory, 8, 1, setMemory, setIsMemoryLoading);
  }, []);

  return (
    <>
      {isMemoryLoading ? (
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
              <h1 className="mb-0">MEMORY (RAM)</h1>
              <h2 className="mb-0">MEMORY (RAM)</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {memory.data.map((memoryProduct, index) => (
                  <Product product={memoryProduct} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {memory.meta ? (
        memory.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(memory.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.memory}
            limit={8}
            setCategory={setMemory}
            setCategoryLoading={setIsMemoryLoading}
            pagination={memory.meta.pagination}
            items={memory}
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
