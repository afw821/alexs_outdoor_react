import React from "react";
import ProductDetailName from "./ProductDetailName";
import ProductDetailDesc from "./ProductDetailDesc";
import QuantitySelector from "../Shared/QuantitySelector";
import { MDBBtn, MDBIcon } from "mdbreact";

const ProductDetailWrapper = ({
  data,
  clientWidth,
  handleChangeQuantity,
  calculateQuantity,
  state,
  handleAddToCart,
  calculatePrice,
  isCol,
}) => {
  return (
    <div className={`${isCol ? "col" : "col-6"}`}>
      <div className="product-details-wrapper">
        <div className="row">
          <ProductDetailName data={data} />
        </div>
        <div className="row mt-4">
          <ProductDetailDesc data={data} />
        </div>
        <div className="row mt-4">
          <div
            className="col-sm-10"
            style={{ borderBottom: "2px solid black" }}
          >
            <div className="row">
              <div className="col-sm-4">
                <QuantitySelector
                  clientWidth={clientWidth}
                  handleChangeQuantity={handleChangeQuantity}
                  calculateQuantity={calculateQuantity}
                  product={state}
                />
              </div>
              <div className="col-sm-8" style={{ paddingLeft: "80px" }}>
                <MDBBtn
                  onClick={() => handleAddToCart(state)}
                  className="btn btn-sm btn-primary mt-2 d-flex justify-content-center"
                  style={{ width: "25%" }}
                >
                  <MDBIcon icon="cart-plus" size="2x" />
                </MDBBtn>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>${calculatePrice(data.price, state.quantity)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailWrapper;
