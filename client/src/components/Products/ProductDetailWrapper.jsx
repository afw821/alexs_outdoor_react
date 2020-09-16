import React from "react";
import ProductDetailName from "./ProductDetailName";
import ProductDetailDesc from "./ProductDetailDesc";
import QuantitySelector from "../Shared/QuantitySelector";
import {
  MDBJumbotron,
  MDBIcon,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBBtn,
} from "mdbreact";
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
    <div
      className={`${
        isCol
          ? "col d-flex justify-content-center product-details-wrapper"
          : `product-details-wrapper ${clientWidth > 1500 ? "col-6" : "col-7"}`
      }`}
    >
      <MDBJumbotron>
        <MDBCardBody>
          <MDBCardTitle className="h2 d-flex justify-content-center">
            <ProductDetailName data={data} />
          </MDBCardTitle>

          <MDBCardText className="d-flex justify-content-center">
            <ProductDetailDesc data={data} />
          </MDBCardText>
          <hr className="my-4" />
          <div className="pt-2">
            <div className="row">
              <div className="col d-flex flex-row">
                <QuantitySelector
                  clientWidth={clientWidth}
                  handleChangeQuantity={handleChangeQuantity}
                  calculateQuantity={calculateQuantity}
                  product={state}
                  renderedFromDetails={true}
                />

                <MDBBtn
                  onClick={() => handleAddToCart(state)}
                  className="btn btn-sm btn-primary mt-2 d-flex justify-content-center ml-5"
                  style={{ width: "25%", maxHeight: "36px" }}
                >
                  <MDBIcon icon="cart-plus" size="2x" />
                </MDBBtn>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex flex-row">
                <strong className="ml-4" style={{ fontSize: "2rem" }}>
                  ${calculatePrice(data.price, state.quantity)}
                </strong>
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBJumbotron>
    </div>
  );
};

export default ProductDetailWrapper;
