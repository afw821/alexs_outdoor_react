import React, { Component } from "react";
import { getProductByPKId } from "./../services/productService";
import { getCategoryByPKId } from "./../services/categoryService";
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
    userQuantity: 1,
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

  addQuantity = () => {
    this.setState({ userQuantity: this.state.userQuantity + 1 });
  };

  subtractQuantity = () => {
    if (this.state.userQuantity === 1) return;
    this.setState({ userQuantity: this.state.userQuantity - 1 });
  };

  async componentDidMount() {
    const { data: product } = await getProductByPKId(
      this.props.match.params.id
    );
    const { data: category } = await getCategoryByPKId(product.CategoryId);

    this.setState({ data: this.mapToViewModel(product, category) });
  }

  render() {
    const { data, userQuantity } = this.state;
    return (
      <div className="row" style={{ marginTop: "155px" }}>
        <div className="col-6 d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
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
              className="col-6 d-flex justify-content-center"
              style={{ borderBottom: "2px solid black" }}
            >
              <h2>{data.name}</h2>
            </div>
          </div>
          <div className="row mt-4">
            <div
              className="col-6 d-flex justify-content-center"
              style={{ borderBottom: "2px solid black" }}
            >
              <p>{data.description}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6" style={{ borderBottom: "2px solid black" }}>
              <div className="row">
                <div className="col-4">
                  <div className="def-number-input number-input">
                    <button
                      onClick={this.subtractQuantity}
                      className="minus"
                    ></button>
                    <input
                      className="quantity"
                      name="quantity"
                      value={userQuantity}
                      onChange={() => console.log("change")}
                      type="number"
                    />
                    <button
                      onClick={this.addQuantity}
                      className="plus"
                    ></button>
                  </div>
                </div>
                <div className="col-4">
                  <p>${data.price}</p>
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
