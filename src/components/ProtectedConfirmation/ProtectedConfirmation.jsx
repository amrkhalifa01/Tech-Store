import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { productsContext } from "../../Context/Store";

export default function ProtectedConfirmation({ children }) {
  let { isRefreshCartLoading, order } = useContext(productsContext);
  if (!isRefreshCartLoading && !order.id) {
    return <Navigate to={"/cart"} />;
  } else {
    return children;
  }
}
