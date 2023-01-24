import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedCheckout({ children }) {
  if (!localStorage.getItem("clientToken")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
