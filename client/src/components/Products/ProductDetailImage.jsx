import React from "react";

const ProductDetailImage = ({ data, alt }) => {
  return (
    <div
      className="card img-responsive"
      style={{ width: "400px", height: "400px" }}
    >
      <img
        className="card-img-top img-responsive"
        src={`data:image/png;base64,${data.imgSrc}`}
        alt={alt}
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default ProductDetailImage;
