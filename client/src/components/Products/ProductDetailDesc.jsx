import React from "react";

const ProductDetailDesc = ({ data }) => {
  return (
    <div
      className="col-10 d-flex justify-content-center"
      style={{ borderBottom: "2px solid black" }}
    >
      <p>{data.description}</p>
    </div>
  );
};

export default ProductDetailDesc;
