import React from "react";
import _arrayBufferToBase64 from "../../utils/toBase64String";
import { Link } from "react-router-dom";

const ProductCard = ({
  products,
  user,
  handleDelete,
  handleToggleUpdate,
  handleSetActiveTab,
  clientWidth,
}) => {
  const renderStyles = (clientWidth) => {
    if (clientWidth > 1360) {
      return "d-flex justify-content-center col-4";
    } else if (clientWidth < 1360 && clientWidth > 1000) {
      return "d-flex justify-content-end col-6";
    } else if (clientWidth < 1000 && clientWidth > 900) {
      return "d-flex justify-content-center col-4";
    } else if (clientWidth < 900 && clientWidth > 600) {
      return "d-flex justify-content-center col-6";
    } else if (clientWidth < 600) {
      return "d-flex justify-content-center col-12";
    }
  };

  return products.map((product, index) => (
    <div className={renderStyles(clientWidth)} key={product.id}>
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
          <div className="row in-stock-row">
            {product.inStock === 0 ? (
              <div className="col d-flex justify-content-center stock-col">
                <p className="card-title" style={{ color: "red" }}>
                  Out of Stock
                </p>
              </div>
            ) : (
              <div className="col d-flex justify-content-center stock-col">
                <p className="card-title" style={{ color: "green" }}>
                  Only {product.inStock} in Stock
                </p>
              </div>
            )}
          </div>
          <div className="row price-row">
            <div className="col d-flex justify-content-center price-col">
              <p className="card-text" style={{ color: "black" }}>
                <strong>${product.price}</strong>
              </p>
            </div>
          </div>
          <div className="row shop-button-row">
            <div className="col d-flex justify-content-center">
              {user && product.inStock > 0 && (
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Shop
                </Link>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="btn btn-primary"
                  onClick={() => handleSetActiveTab("Login")}
                >
                  Login to Shop
                </Link>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              {user && user.isAdmin && (
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              )}
              {user && user.isAdmin && (
                <button
                  type="button"
                  onClick={() => handleToggleUpdate(product.id, index)}
                  className="btn btn-info btn-sm"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ProductCard;
