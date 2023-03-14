import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../../Context/Store";
import { categories } from "../../../lib/commerce";
import Pagination from "../../Pagination/Pagination";
import Product from "../../Product/Product";

export default function GraphicCards() {
  let { fetchProducts } = useContext(productsContext);
  let [graphicCards, setGraphicCards] = useState({});
  let [isGcardsLoading, setIsGcardsLoading] = useState(true);

  useEffect(() => {
    fetchProducts(categories.graphicCard, 8, 1, setGraphicCards, setIsGcardsLoading);
  }, []);

  return (
    <>
      {isGcardsLoading ? (
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
              <h1 className="mb-0">GRAPHIC CARDS</h1>
              <h2 className="mb-0">GRAPHIC CARDS</h2>
            </div>
            <div className="pb-5 pt-2">
              <div className="row justify-content-center g-3">
                {graphicCards.data.map((graphicCard, index) => (
                  <Product product={graphicCard} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {graphicCards.meta ? (
        graphicCards.meta.pagination.total_pages !== 1 ? (
          <Pagination
            pages={[...Array(graphicCards.meta.pagination.total_pages)]
              .fill(1)
              .map((element, index) => index + 1)
              .slice(0, 5)}
            fetchCategoryProducts={fetchProducts}
            categoryId={categories.graphicCard}
            limit={8}
            setCategory={setGraphicCards}
            setCategoryLoading={setIsGcardsLoading}
            pagination={graphicCards.meta.pagination}
            items={graphicCards}
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
