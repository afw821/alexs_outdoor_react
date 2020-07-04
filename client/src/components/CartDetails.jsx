import React, { Component } from "react";
import { getProductByPKId } from "../services/productService";
import { deleteCartByPkId } from "../services/cartService";
import _arrayBufferToBase64 from "../utils/toBase64String";
import { updateCart } from "../services/cartService";
import { getUserById } from "../services/userService";
import { regenerateToken, loginWithJwt } from "../services/authService";
import { toast } from "react-toastify";
import TableHead from "./common/TableHead";
import TableBody from "./common/TableBody";
import TotalRow from "./common/TotalRow";
import CheckoutModal from "./common/CheckoutModal";

class CartDetails extends Component {
  state = {
    removeBtn: {
      row: null,
      show: false,
    },
    showModal: false,
  };

  calculatePrice = (quantity, price) => {
    const total = quantity * price;

    return parseFloat(total.toFixed(2));
  };

  handleHover = (e, index) => {
    e.currentTarget.style.backgroundColor = "whitesmoke";
    this.setState({ removeBtn: { row: index, show: true } });
  };

  handleLeave = (e, index) => {
    e.currentTarget.style.backgroundColor = "#fdf9f3";
    this.setState({ removeBtn: { row: null, show: false } });
  };
  handleChangeQuantity() {}

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { showModal } = this.state;
    const {
      productsInCart,
      totalPrice,
      user,
      handleRemoveFromCart,
      calculateQuantity,
    } = this.props;
    if (productsInCart.length === 0)
      return <h1 style={{ marginTop: "100px" }}>Cart is Empty</h1>;
    const options = [
      {
        id: 1,
        header: "Name",
      },
      {
        id: 2,
        header: "Quantity",
      },
      {
        id: 3,
        header: "Price",
      },
      {
        id: 4,
        header: "",
      },
    ];
    return (
      <>
        <CheckoutModal isOpen={showModal} closeModal={this.toggleModal} />
        <div
          className="row d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div className="col-8">
            <table className="table">
              <TableHead options={options} />
              <TableBody
                items={productsInCart}
                handleHover={this.handleHover}
                handleLeave={this.handleLeave}
                handleRemoveFromCart={handleRemoveFromCart}
                handleChangeQuantity={this.handleChangeQuantity} //deprecated
                calculateQuantity={calculateQuantity}
                calculatePrice={this.calculatePrice}
                removeBtn={this.state.removeBtn}
              />
            </table>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <TotalRow totalPrice={totalPrice} toggleModal={this.toggleModal} />
          </div>
        </div>
      </>
    );
  }
}

export default CartDetails;
