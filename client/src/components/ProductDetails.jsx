import React, { Component } from "react";
import { getProductByPKId } from "./../services/productService";
import { getCategoryByPKId } from "./../services/categoryService";
import QuantitySelector from "./common/QuantitySelector";
import _arrayBufferToBase64 from "./../utils/toBase64String";
import "../input.css";

class ProductDetails extends Component {
  state = {
    data: {
      category: {
        id: "",
        name: "",
      },
      description: "",
      id: "", //productId
      imgSrc: "",
      inStock: "",
      name: "",
      price: "",
    },
    quantity: 1,
  };

  mapToViewModel(product, category) {
    return {
      category: {
        id: category.id,
        name: category.name,
      },
      description: product.description,
      id: product.id,
      imgSrc: _arrayBufferToBase64(product.data.data),
      inStock: product.inStock,
      name: product.name,
      price: product.price,
    };
  }

  addOrSubtract = (isAdd) => {
    return isAdd ? this.state.quantity + 1 : this.state.quantity - 1;
  };

  calculateQuantity = (qunatity, index, isAdd) => {
    if (!isAdd && this.state.quantity === 1) return; //if we are subtracting we don't want to go below 1

    this.setState({ quantity: this.addOrSubtract(isAdd) });
  };

  calculatePrice = (price, quantity) => {
    const totalPrice = price * quantity;
    return parseFloat(totalPrice.toFixed(2));
  };

  async componentDidMount() {
    const { data: product } = await getProductByPKId(
      this.props.match.params.id
    );
    const { data: category } = await getCategoryByPKId(product.CategoryId);

    this.setState({ data: this.mapToViewModel(product, category) });
  }

  render() {
    const { data, quantity } = this.state;
    const { handleAddToCart, clientWidth, user } = this.props;
    return (
      <div className="row" style={{ marginTop: "155px" }}>
        <div className="col-6 d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <div className="card" style={{ width: "50%" }}>
                <img
                  className="card-img-top"
                  src={`data:image/png;base64,${data.imgSrc}`}
                  alt="picture of product"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div
              className="col-7 d-flex justify-content-center"
              style={{ borderBottom: "2px solid black" }}
            >
              <h2>{data.name}</h2>
            </div>
          </div>
          <div className="row mt-4">
            <div
              className="col-7 d-flex justify-content-center"
              style={{ borderBottom: "2px solid black" }}
            >
              <p>{data.description}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div
              className="col-sm-7"
              style={{ borderBottom: "2px solid black" }}
            >
              <div className="row">
                <div className="col-sm-7">
                  <QuantitySelector
                    clientWidth={clientWidth}
                    calculateQuantity={this.calculateQuantity}
                    product={this.state}
                  />
                </div>
                <div className="col-sm-5">
                  <button
                    onClick={() => handleAddToCart(this.state)}
                    className="btn btn-sm btn-primary mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>${this.calculatePrice(data.price, quantity)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
