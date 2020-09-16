import React from "react";

const ProductDetailDesc = ({ data }) => {
  return (
    <div className="col-10 d-flex justify-content-center">
      <p>{data.description}</p>
    </div>
  );
};

export default ProductDetailDesc;
