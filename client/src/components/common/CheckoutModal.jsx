import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { getCartTableOptions } from "./../../utils/cartOptions";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const CheckoutModal = ({
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
}) => {
  function makePurchase(productsInCart) {
    productsInCart.forEach(function (product, index) {
      const userQuant = product.quantity;
      const ProductId = product.product.id;
      const purchaseName = `UserId# ${user.id} ${user.lastName}, ${user.firstName} - ID# ${ProductId} / ${product.product.name}`;
      const result = handlePurchase(
        userQuant,
        ProductId,
        purchaseName,
        user.id
      );
      console.log("result from purchase", result);
    });
  }

  return (
    <MDBModal
      isOpen={isOpen}
      //toggle={toggle}
      fullHeight
      position="top"
    >
      <MDBModalHeader>
        {user.firstName}, review your purchase information below and make any
        changes
      </MDBModalHeader>
      <MDBModalBody>
        <table className="table">
          <TableHead options={getCartTableOptions()} />
          <TableBody
            items={productsInCart}
            handleHover={handleHover}
            handleLeave={handleLeave}
            handleRemoveFromCart={handleRemoveFromCart}
            handleChangeQuantity={handleChangeQuantity} //deprecated
            calculateQuantity={calculateQuantity}
            calculatePrice={calculatePrice}
            removeBtn={removeBtn}
          />
        </table>
      </MDBModalBody>
      <MDBModalBody></MDBModalBody>

      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={closeModal}>
          Close
        </MDBBtn>
        <MDBBtn color="primary" onClick={() => makePurchase(productsInCart)}>
          Purchase
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default CheckoutModal;
