import React from "react";

const ProductDetailName = ({ data }) => {
  return (
    <div
      className="col-10 d-flex justify-content-center"
      style={{ borderBottom: "2px solid black" }}
    >
      <h2>{data.name}</h2>
    </div>
  );
};

export default ProductDetailName;
