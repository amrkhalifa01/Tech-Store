import React from "react";
import { Outlet } from "react-router-dom";

export default function Category() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
