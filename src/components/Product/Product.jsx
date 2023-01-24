import React, { useContext, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { productsContext } from "../../Context/Store";
import Images from "../../images/images";

export default function Product({ product }) {
  let { goToProductDetails, addToCart, isAddLoading, cart } = useContext(productsContext);
  let [productAvailability, setProductAvailability] = useState(true);
  let addProdBtn = useRef(null);

  const onAddProduct = () => {
    let cartItems = cart.line_items;
    let currentProduct = cartItems.filter((cartItem) => cartItem.product_id === product.id);
    let cartItemsIds = cart.line_items.map((cartItem) => cartItem.product_id);
    let productInCart = cartItemsIds.includes(product.id);
    if ((product.inventory.available === 1 && productInCart) || product.inventory.available === 0 || (currentProduct.length !== 0 && currentProduct[0].quantity + 1 > product.inventory.available)) {
      setProductAvailability(false);
      setTimeout(() => setProductAvailability(true), 2000);
    } else {
      addToCart(product.id, 1);
      addProdBtn.current.setAttribute("disabled", true);
    }
  };

  useEffect(() => {
    if (!isAddLoading) {
      addProdBtn.current.removeAttribute("disabled");
    }
  }, [isAddLoading]);

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className={`product border rounded-3 w-100 h-100 d-flex flex-column ${product.inventory.available === 0 ? "alert-out-of-stock" : ""}`}>
        <div className="d-flex flex-column justify-content-between flex-grow-1 mouse-pointer p-3 pb-0" onClick={() => goToProductDetails(product.id)}>
          <h3 className="h6 mb-4 text-dark-grey">{product.name}</h3>
          <div className="flex-grow-1 d-flex-rules mb-4 rounded-3 overflow-hidden">
            <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={product.image.url} className="img-dimensions" alt={product.image.id} />
          </div>
          <h4 className="h5 fw-bold text-green mb-4 mt-2">{product.price.formatted_with_code}</h4>
        </div>
        <div className="p-3 pt-0">
          <button className={`btn w-100 ${!productAvailability || product.inventory.available === 0 ? "out-of-stock mouse-not-allowed" : "common-btn"} d-flex-rules`} onClick={() => onAddProduct()} ref={addProdBtn}>
            {!productAvailability || product.inventory.available === 0 ? (
              <>
                Out Of Stock<i className="fa-solid fa-exclamation ms-2"></i>
              </>
            ) : (
              <>
                Add To Cart<i className="fa-solid fa-cart-arrow-down ms-2"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
