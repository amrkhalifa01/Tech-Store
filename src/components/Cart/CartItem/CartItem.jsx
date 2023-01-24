import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { productsContext } from "../../../Context/Store";
import Images from "../../../images/images";
import { commerce } from "../../../lib/commerce";
import styles from "./CartItem.module.scss";

export default function CartItem({ item }) {
  let { updateCartQuantity, isUpdateLoading, removeFromCart, isRemoveLoading, goToProductDetails } = useContext(productsContext);
  let [prodQty, setProdQty] = useState(1);

  const fetchProduct = async () => {
    let currentProduct = await commerce.products.retrieve(item.product_id);
    let currentProdQty = currentProduct.inventory.available;
    setProdQty(currentProdQty);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className={`row py-3 align-items-center ${styles.row_brdr}`}>
      <div className="col-11 col-lg-5 order-first">
        <div className="d-flex align-items-center my-2 my-lg-0 mouse-pointer" onClick={() => goToProductDetails(item.product_id)}>
          <div className={styles.cart_product_img_container}>
            <LazyLoadImage placeholderSrc={Images.strockSmall} effect="blur" src={item.image.url} alt="cart product" className="w-100" />
          </div>
          <h4 className="h6 mb-0 px-2 text-dark-grey cart-product-name">{item.product_name}</h4>
        </div>
      </div>
      <div className="col-lg-2 order-1">
        <h4 className="h6 my-1 my-lg-0 text-dark-grey cart-product-name">
          <span className="fw-bold d-d-inline-block d-lg-none me-2">PRICE:</span>
          {item.price.formatted_with_code}
        </h4>
      </div>
      <div className="col-lg-2 order-2">
        <div className="d-flex align-items-center my-1 my-lg-0">
          <span className="fw-bold d-d-inline-block d-lg-none me-2 fs-6 text-dark-grey cart-product-name">QUANTITY:</span>
          <div className="px-2 rounded-pill quantity-box">
            <button className={`quantity-btn btn p-0 ${isUpdateLoading || item.quantity === 1 ? "disabled" : ""}`} onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="mx-3 quantity">{item.quantity}</span>
            <button className={`quantity-btn btn p-0 ${isUpdateLoading || item.quantity === prodQty ? "disabled" : ""}`} onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-lg-2 order-3">
        <h4 className="h6 mt-1 mt-lg-0 mb-0 text-dark-grey">
          <span className="fw-bold d-d-inline-block d-lg-none me-2 cart-product-name">SUPTOTAL:</span>
          {item.line_total.formatted_with_code}
        </h4>
      </div>
      <div className="col-1 col-lg-1 order-0 order-lg-last">
        <button className={`${styles.del_prod} btn p-0 ${isRemoveLoading ? "disabled" : ""}`} onClick={() => removeFromCart(item.id)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
