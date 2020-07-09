import React, { Component } from "react";
import { updateProductQuant } from "../services/productService";
import _arrayBufferToBase64 from "../utils/toBase64String";
import TableHead from "./common/TableHead";
import TableBody from "./common/TableBody";
import TotalRow from "./common/TotalRow";
import CheckoutModal from "./common/CheckoutModal";
import { purchase } from "../services/purchaseService";
import { getCartTableOptions } from "../utils/cartOptions";
import { toast } from "react-toastify";
import { result } from "lodash";

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

  handlePurchase = async (userQuant, ProductId, name, UserId) => {
    try {
      await updateProductQuant(userQuant, ProductId);
      const result = await purchase(name, UserId, ProductId, userQuant);
      return result;
    } catch (ex) {
      toast.error("There was an error making your purchase");
    }
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
      return (
        <div style={{ marginTop: "100px" }} className="row">
          <div className="col d-flex justify-content-center">
            <h2>{user.firstName}, your cart is Empty</h2>
          </div>
        </div>
      );
    return (
      <>
        <CheckoutModal
          user={user}
          isOpen={showModal}
          handlePurchase={this.handlePurchase}
          closeModal={this.toggleModal}
          productsInCart={productsInCart}
          handleHover={this.handleHover}
          handleLeave={this.handleLeave}
          handleRemoveFromCart={handleRemoveFromCart}
          handleChangeQuantity={this.handleChangeQuantity}
          calculateQuantity={calculateQuantity}
          calculatePrice={this.calculatePrice}
          removeBtn={this.state.removeBtn}
        />
        <div
          className="row d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div className="col-8">
            <table className="table">
              <TableHead options={getCartTableOptions()} />
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
