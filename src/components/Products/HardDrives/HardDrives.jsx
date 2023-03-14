import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function HardDrives() {
  let { fetchProducts } = useContext(productsContext);
  let [hDrives, setHDrives] = useState({});
  let [isHdLoading, setIsHdLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.hardDrive, 8, 1, setHDrives, setIsHdLoading);
  }, []);

  return (
    <>
      {isHdLoading ? (
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
              <h1 className="mb-0">HARD DRIVE</h1>
              <h2 className="mb-0">HARD DRIVE</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {hDrives.data.map((hardDrive, index) => (
                  <Product product={hardDrive} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {hDrives.meta ? (
        hDrives.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(hDrives.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.hardDrive}
            limit={8}
            setCategory={setHDrives}
            setCategoryLoading={setIsHdLoading}
            pagination={hDrives.meta.pagination}
            items={hDrives}
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
