import React from "react";
import Loader from "react-loader-spinner";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { getCartTableOptions } from "./../../utils/cartOptions";
import { regenerateToken, loginWithJwt } from "../../services/authService";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { toast } from "react-toastify";

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
  showLoader,
  handleToggleLoader,
}) => {
  async function makePurchase(productsInCart) {
    handleToggleLoader();
    productsInCart.forEach(async function (product, index) {
      try {
        const userQuant = product.quantity;
        const ProductId = product.product.id;
        const purchaseName = `UserId# ${user.id} ${user.lastName}, ${user.firstName} - ID# ${ProductId} / ${product.product.name}`;
        const result = await handlePurchase(
          userQuant,
          ProductId,
          purchaseName,
          user.id
        );
        if (result.status === 200 && index === 0) {
          setTimeout(() => {
            toast.info("Purchase was successful!");
            handleToggleLoader();
          }, 2000);
        }
        if (result.status === 200) {
          console.log("result from purchase", result);
          console.log("props user", user);
          const userClone = { ...user };
          userClone.Purchases.push(result.data);
          if (index === 0) {
            const { data: token } = await regenerateToken(userClone);
            console.log("tooooken", token);
            if (token) loginWithJwt(token);
          }
        }
      } catch (error) {
        toast.info("Error Making Purchase");
      }
    });
  }

  return (
    <>
      <Loader
        style={{
          top: "200px",
          left: "50%",
          zIndex: "10000000000",
          position: "absolute",
        }}
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={4000}
        visible={showLoader}
      />
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
    </>
  );
};

export default CheckoutModal;
