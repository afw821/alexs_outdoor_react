import React from "react";
import _arrayBufferToBase64 from "../utils/toBase64String";
import { Link } from "react-router-dom";

const ProductCard = ({ products, user, handleDelete }) => {
  return products.map((product) => (
    <div className="col-4" key={product.id}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={`data:image/png;base64,${(product.imgSrc = _arrayBufferToBase64(
            product.data.data
          ))}`}
          alt="Card image cap"
        />
        <div className="card-body">
          <div className="row title-row">
            <div className="col d-flex justify-content-center title-col">
              <h5 className="card-title">{product.name}</h5>
            </div>
          </div>
          <div className="row price-row">
            <div className="col d-flex justify-content-center price-col">
              <p className="card-text">${product.price}</p>
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
