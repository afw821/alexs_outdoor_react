import React, { Component } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { getCartTableOptions } from "./../../utils/cartOptions";
import { regenerateToken, loginWithJwt } from "../../services/authService";
import { updateProductQuant } from "../../services/productService";
import { purchase } from "../../services/purchaseService";
import { sendEmailPurchase } from "../../services/emailService";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { toast } from "react-toastify";
import Loader from "./Loader";

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
    return (
      <>
        <MDBModal
          isOpen={isOpen}
          //toggle={toggle}
          fullHeight
          position="top"
        >
          <MDBModalHeader>
            {user.firstName}, review your purchase information below and make
            any changes
          </MDBModalHeader>
          <MDBModalBody>
            <table className="table">
              <TableHead
                clientWidth={clientWidth}
                options={getCartTableOptions()}
              />
              <TableBody
                items={productsInCart}
                handleHover={handleHover}
                handleLeave={handleLeave}
                handleRemoveFromCart={handleRemoveFromCart}
                handleChangeQuantity={handleChangeQuantity} //deprecated
                calculateQuantity={calculateQuantity}
                calculatePrice={calculatePrice}
                removeBtn={removeBtn}
                clientWidth={clientWidth}
              />
            </table>
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
