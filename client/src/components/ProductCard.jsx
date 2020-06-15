import React from "react";
import _arrayBufferToBase64 from "../utils/toBase64String";
import { Link } from "react-router-dom";

const ProductCard = ({ products, user, handleDelete }) => {
  return products.map((product) => (
    <div className="col-4 d-flex justify-content-center" key={product.id}>
      <div
        className="card"
        style={{
          width: "18rem",
          minWidth: "288px",
          minHeight: "378px",
          marginBottom: "60px",
        }}
      >
        <img
          className="card-img-top"
          src={`data:image/png;base64,${(product.imgSrc = _arrayBufferToBase64(
            product.data.data
          ))}`}
          alt="Card image cap"
          style={{ height: "200px", width: "200px" }}
        />
        <div className="card-body">
          <div className="row title-row">
            <div className="col d-flex justify-content-center title-col">
              <h5 className="card-title">{product.name}</h5>
            </div>
          </div>
          <div className="row price-row">
            <div className="col d-flex justify-content-center price-col">
              <p className="card-text" style={{ color: "black" }}>
                <strong>${product.price}</strong>
              </p>
            </div>
          </div>
          <div className="row shop-btn-row">
            <div className="col d-flex justify-content-center shop-btn-col">
              <Link to={`/product/${product.id}`} className="btn btn-primary">
                Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ProductCard;
