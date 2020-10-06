import React, { Component } from "react";
import { getProductByPKId } from "../../services/productService";
import { getCategoryByPKId } from "../../services/categoryService";
import _arrayBufferToBase64 from "../../utils/toBase64String";
import ProductDetailImage from "./ProductDetailImage";
import ProductDetailWrapper from "./ProductDetailWrapper";
import { toast } from "react-toastify";
import "../../input.css";

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
    if (this.state.quantity >= this.state.data.inStock && isAdd) {
      toast.info(
        `Oops, we only have ${this.state.data.inStock} left in stock!`
      );
      return (this.state.quantity = this.state.data.inStock);
    }
    return isAdd ? this.state.quantity + 1 : this.state.quantity - 1;
  };

  handleChangeQuantity = () => {}; //deprecated

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
    const {
      handleAddToCart,
      clientWidth,
      user,
      handleChangeQuantity,
    } = this.props;
    return (
      <>
        <div className="row" style={{ marginTop: "155px" }}>
          <div
            className={`${
              clientWidth < 1000 ? "col mb-5" : "col-4"
            } d-flex justify-content-center`}
          >
            <ProductDetailImage alt="picture of product" data={data} />
          </div>
          {clientWidth < 1000 ? (
            ""
          ) : (
            <ProductDetailWrapper
              data={data}
              clientWidth={clientWidth}
              handleChangeQuantity={this.handleChangeQuantity}
              calculateQuantity={this.calculateQuantity}
              state={this.state}
              handleAddToCart={handleAddToCart}
              calculatePrice={this.calculatePrice}
              isCol={false}
            />
          )}
        </div>
        {clientWidth > 1000 ? (
          ""
        ) : (
          <div className="row product-desc-row">
            <ProductDetailWrapper
              data={data}
              clientWidth={clientWidth}
              handleChangeQuantity={this.handleChangeQuantity}
              calculateQuantity={this.calculateQuantity}
              state={this.state}
              handleAddToCart={handleAddToCart}
              calculatePrice={this.calculatePrice}
              isCol={true}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProductDetails;
