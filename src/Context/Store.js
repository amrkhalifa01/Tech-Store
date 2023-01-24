import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commerce } from "../lib/commerce";

export let productsContext = createContext(0);
export let authenticationContext = createContext(0);

export default function Store({ children }) {
  let navigate = useNavigate();
  let authApiBaseUrl = "https://sticky-note-fe.vercel.app/";

  let [client, setClient] = useState(null);

  let [cart, setCart] = useState({});
  let [isCartLoading, setIsCartLoading] = useState(true);
  let [isAddLoading, setIsAddLoading] = useState(false);
  let [isUpdateLoading, setIsUpdateLoading] = useState(false);
  let [isRemoveLoading, setIsRemoveLoading] = useState(false);
  let [isEmptyLoading, setIsEmptyLoading] = useState(false);
  let [isRefreshCartLoading, setIsRefreshCartLoading] = useState(false);

  let [isCheckoutLoading, setIsCheckoutLoading] = useState(true);
  let [checkoutToken, setCheckoutToken] = useState(null);

  let [isOrderLoading, setIsOrderLoading] = useState(false);
  let [order, setOrder] = useState({});

  let [checkoutProcessError, setCheckoutProcessError] = useState("");
  let [checkoutErrorCode, setCheckoutErrorCode] = useState("");

  const fetchProducts = async (category_id, limit, page, callBack, callBackLoad) => {
    callBackLoad(true);
    const response = await commerce.products.list({ category_id, limit, page });
    callBack(response);
    callBackLoad(false);
  };

  const fetchCart = async () => {
    setIsCartLoading(true);
    const response = await commerce.cart.retrieve();
    setCart(response);
    setIsCartLoading(false);
  };

  const addToCart = async (productId, quantity) => {
    setIsAddLoading(true);
    const response = await commerce.cart.add(productId, quantity);
    setCart(response);
    setIsAddLoading(false);
  };

  const updateCartQuantity = async (productId, quantity) => {
    setIsUpdateLoading(true);
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response);
    setIsUpdateLoading(false);
  };

  const removeFromCart = async (productId) => {
    setIsRemoveLoading(true);
    const response = await commerce.cart.remove(productId);
    setCart(response);
    setIsRemoveLoading(false);
  };

  const emptyCart = async () => {
    setIsEmptyLoading(true);
    const response = await commerce.cart.empty();
    setCart(response);
    setIsEmptyLoading(false);
  };

  const refreshCart = async () => {
    setIsRefreshCartLoading(true);
    let response = await commerce.cart.refresh();
    setCart(response);
    setIsRefreshCartLoading(false);
  };

  const goToProductDetails = (productId) => {
    navigate({
      pathname: `/product`,
      search: `?id=${productId}`,
    });
  };

  const generateCheckoutToken = async () => {
    try {
      setIsCheckoutLoading(true);
      let checkoutToken = await commerce.checkout.generateTokenFrom("cart", cart.id);
      setCheckoutToken(checkoutToken);
      setIsCheckoutLoading(false);
    } catch (error) {
      setCheckoutErrorCode("503");
      setCheckoutProcessError("We have a problem now, please try again at another time");
      refreshCart();
    }
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      setIsOrderLoading(true);
      const response = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(response);
      refreshCart();
      setIsOrderLoading(false);
    } catch (error) {
      setCheckoutErrorCode("422");
      setCheckoutProcessError("Incomplete payment process, there is a product of your order that has run out of stock while you complete the payment process");
      refreshCart();
    }
  };

  function saveClientData() {
    let encodedClientToken = localStorage.getItem("clientToken");
    let decodedClientToken = jwtDecode(encodedClientToken);
    setClient(decodedClientToken);
  }

  function logout() {
    setClient(null);
    localStorage.removeItem("clientToken");
  }

  useEffect(() => {
    fetchCart();
    if (localStorage.getItem("clientToken")) {
      saveClientData();
    }
  }, []);

  useEffect(() => {
    if (cart.id && cart.line_items.length !== 0) {
      generateCheckoutToken();
    }
  }, [cart]);

  let productContextLifting = {
    navigate,
    fetchProducts,
    goToProductDetails,
    cart,
    isCartLoading,
    fetchCart,
    isAddLoading,
    addToCart,
    isEmptyLoading,
    emptyCart,
    isUpdateLoading,
    updateCartQuantity,
    isRemoveLoading,
    removeFromCart,
    checkoutToken,
    isCheckoutLoading,
    setCheckoutToken,
    order,
    isOrderLoading,
    handleCaptureCheckout,
    isRefreshCartLoading,
    checkoutProcessError,
    checkoutErrorCode,
  };

  let authLifting = {
    saveClientData,
    logout,
    client,
    authApiBaseUrl,
  };

  return (
    <>
      <productsContext.Provider value={{ ...productContextLifting }}>
        <authenticationContext.Provider value={{ ...authLifting }}>{children}</authenticationContext.Provider>
      </productsContext.Provider>
    </>
  );
}
