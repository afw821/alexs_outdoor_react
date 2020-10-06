import React, { Component } from "react";
import _arrayBufferToBase64 from "../../utils/toBase64String";
import CheckoutModal from "./CheckoutModal";
import TotalRow from "./TotalRow";
import { getCartTableOptions } from "../../utils/tableHeaderOptions";
import { purchase } from "../../services/purchaseService";
import { toast } from "react-toastify";
import { updateProductQuant } from "../../services/productService";
import { getTableRowOptions } from "./../../utils/tableRowOptions";
import Table from "./../Shared/Table";

class CartDetails extends Component {
  state = {
    removeBtn: {
      row: null,
      show: false,
    },
    showModal: false,
    showLoader: false,
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
  handleChangeQuantity = () => {};

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handlePurchase = async (userQuant, ProductId, name, UserId) => {
    try {
      console.log("making purchase cart details handlePurchase.");
      const updateResult = await updateProductQuant(userQuant, ProductId);
      const result = await purchase(name, UserId, ProductId, userQuant);
      return result;
    } catch (ex) {
      if (ex.response.status === 400) toast.error(ex.response.data);
    }
  };
  handleToggleLoader = () => {
    this.setState({ showLoader: !this.state.showLoader });
  };

  renderTableHeaderOptions = (clientWidth) => {
    const { cartOptions } = getCartTableOptions();
    if (clientWidth < 560) {
      //need to splice the first
      return cartOptions.slice(1);
    } else {
      return cartOptions;
    }
  };

  renderTableRowOptions = (
    calculateQuantity,
    clientWidth,
    handleRemoveFromCart,
    removeBtn,
    calculatePrice
  ) => {
    const { trItems: allOptions } = getTableRowOptions(
      null,
      calculateQuantity,
      this.handleChangeQuantity,
      clientWidth,
      handleRemoveFromCart,
      removeBtn,
      calculatePrice
    );
    if (clientWidth < 561) return allOptions.slice(1);
    else return allOptions;
  };

  render() {
    const { showModal, removeBtn } = this.state;

    const {
      productsInCart,
      totalPrice,
      user,
      handleRemoveFromCart,
      calculateQuantity,
      clientWidth,
      handleSetActiveTab,
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
          showLoader={this.state.showLoader}
          handleToggleLoader={this.handleToggleLoader}
          clientWidth={clientWidth}
        />

        <div
          className={`row ${
            clientWidth > 360 ? "d-flex justify-content-center" : "cart-padding"
          }`}
          style={{ marginTop: "100px" }}
        >
          <div className="col-8">
            <Table
              options={this.renderTableHeaderOptions(clientWidth)}
              items={productsInCart}
              handleHover={this.handleHover}
              handleLeave={this.handleLeave}
              trItems={this.renderTableRowOptions(
                calculateQuantity,
                clientWidth,
                handleRemoveFromCart,
                removeBtn,
                this.calculatePrice
              )}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <TotalRow
              totalPrice={totalPrice}
              toggleModal={this.toggleModal}
              clientWidth={clientWidth}
              handleSetActiveTab={handleSetActiveTab}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CartDetails;
