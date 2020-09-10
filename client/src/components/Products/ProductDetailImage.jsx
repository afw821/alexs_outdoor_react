import React from "react";

const ProductDetailImage = ({ data, alt }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="card" style={{ width: "55%" }}>
          <img
            className="card-img-top"
            src={`data:image/png;base64,${data.imgSrc}`}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailImage;
