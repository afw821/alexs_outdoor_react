import React, { Component } from "react";
import Loader from "../Shared/Loader";
import Table from "..//Shared/Table";
import TableHead from "../Shared/TableHead";
import TableBody from "../Shared/TableBody";
import { getCartTableOptions } from "../../utils/tableHeaderOptions";
import { purchase } from "../../services/purchaseService";
import { regenerateToken, loginWithJwt } from "../../services/authService";
import { sendEmailPurchase } from "../../services/emailService";
import { toast } from "react-toastify";
import { updateProductQuant } from "../../services/productService";
import { getTableRowOptions } from "./../../utils/tableRowOptions";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

class CheckoutModal extends Component {
  makePurchase = async (productsInCart) => {
    const { firstName, lastName, email } = this.props.user;
    this.props.handleToggleLoader();
    const message = `Here is you purchase information ${firstName}`;
    console.log(this.props.user);
    console.log("products in the cart", productsInCart);
    const result = await sendEmailPurchase(
      `${lastName}, ${firstName}`,
      email,
      message,
      email
      //productsInCart
    );
    console.log("result from send email", result);
    productsInCart.forEach(async (product, index) => {
      try {
        console.log("purchaseeee", product);
        const userQuant = product.quantity;
        const ProductId = product.product.id;
        const purchaseName = `UserId# ${this.props.user.id} ${this.props.user.lastName}, ${this.props.user.firstName} - ID# ${ProductId} / ${product.product.name}`;

        const { data: updateResult } = await updateProductQuant(
          userQuant,
          ProductId
        );
        if (updateResult) {
          var purchaseResult = await purchase(
            purchaseName,
            this.props.user.id,
            ProductId,
            userQuant
          );
        }

        if (purchaseResult.status === 200 && index === 0) {
          setTimeout(() => {
            toast.info("Purchase was successful!");
            this.props.handleToggleLoader();
          }, 2000);
        }
        if (purchaseResult.status === 200) {
          const userClone = { ...this.props.user };
          userClone.Purchases.push(purchaseResult.data);
          if (index === 0) {
            const { data: token } = await regenerateToken(userClone);
            if (token) loginWithJwt(token);
          }
        }
      } catch (ex) {
        if (ex.response.status === 400) toast.error(ex.response.data);
      }
    });
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
    const {
      isOpen,
      closeModal,
      user,
      handlePurchase,
      productsInCart,
      handleHover,
      handleLeave,
      handleRemoveFromCart,
      handleChangeQuantity,
      calculateQuantity,
      calculatePrice,
      removeBtn,
      showLoader,
      handleToggleLoader,
      clientWidth,
    } = this.props;

    const { cartOptions } = getCartTableOptions();
    return (
      <>
        <MDBModal isOpen={isOpen} fullHeight position="top">
          <MDBModalHeader>
            {user.firstName}, review your purchase information below and make
            any changes
          </MDBModalHeader>
          <MDBModalBody>
            <Table
              options={cartOptions}
              items={productsInCart}
              handleHover={handleHover}
              handleLeave={handleLeave}
              trItems={this.renderTableRowOptions(
                calculateQuantity,
                clientWidth,
                handleRemoveFromCart,
                removeBtn,
                calculatePrice
              )}
            />
          </MDBModalBody>
          <MDBModalBody>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <Loader showLoader={showLoader} />
              </div>
            </div>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={closeModal}>
              Close
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => this.makePurchase(productsInCart)}
            >
              Purchase
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </>
    );
  }
}

export default CheckoutModal;