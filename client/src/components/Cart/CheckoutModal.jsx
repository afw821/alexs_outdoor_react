import React from "react";
import Loader from "../Shared/Loader";
import Table from "..//Shared/Table";
import { getCartTableOptions } from "../../utils/tableHeaderOptions";
import { getTableRowOptions } from "./../../utils/tableRowOptions";
import StripeContainer from "../Cart/StripeContainer";
import { makePurchase } from "../../utils/makePurchase";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import {
  makePayment,
  createPaymentMethod,
} from "../../services/paymentService";

const CheckoutModal = ({
  isOpen,
  closeModal,
  user,
  productsInCart,
  handleHover,
  handleLeave,
  handleRemoveFromCart,
  calculateQuantity,
  calculatePrice,
  removeBtn,
  showLoader,
  handleChangeQuantity,
  handleToggleLoader,
  clientWidth,
  totalPrice,
}) => {
  //stripe payment
  const elements = useElements();
  const stripe = useStripe();

  const renderTableRowOptions = (
    calculateQuantity,
    clientWidth,
    handleRemoveFromCart,
    removeBtn,
    calculatePrice
  ) => {
    const { trItems: allOptions } = getTableRowOptions(
      null,
      calculateQuantity,
      handleChangeQuantity,
      clientWidth,
      handleRemoveFromCart,
      removeBtn,
      calculatePrice
    );
    if (clientWidth < 561) return allOptions.slice(1);
    else return allOptions;
  };

  const handleSubmitPurchasePayment = async (e) => {
    e.preventDefault();
    //post the putchase to the database
    makePurchase(productsInCart, handleToggleLoader, user);
    //process payment on stripe server
    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await createPaymentMethod(
      "card",
      card,
      billing_details,
      stripe
    );

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await makePayment(totalPrice, id);

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("StripeForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("StripeForm.js 28 | ", error);
      }
    } else alert(error.message);
  };

  const billing_details = {
    address: {
      city: user.city,
      country: "US",
      line1: user.address,
      line2: user.address2,
      postal_code: user.zipCode,
      state: user.state,
    },
    phone: "7706422208",
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  };
  const { cartOptions } = getCartTableOptions();
  return (
    <>
      <MDBModal isOpen={isOpen} fullHeight position="top">
        <MDBModalHeader>
          {user.firstName}, review your purchase information below and make any
          changes
        </MDBModalHeader>
        <MDBModalBody>
          <Table
            options={cartOptions}
            items={productsInCart}
            handleHover={handleHover}
            handleLeave={handleLeave}
            trItems={renderTableRowOptions(
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
        <form onSubmit={handleSubmitPurchasePayment}>
          <MDBModalBody>
            <div className="row">
              <div className="col">
                <StripeContainer
                  amount={totalPrice}
                  billing_details={billing_details}
                />
              </div>
            </div>
          </MDBModalBody>

          <MDBModalFooter>
            <strong>{totalPrice}</strong>

            <MDBBtn color="secondary" onClick={closeModal}>
              Close
            </MDBBtn>

            <MDBBtn
              type="submit"
              color="primary"
              // onClick={() =>
              //   makePurchase(productsInCart, handleToggleLoader, user)
              // }
            >
              Purchase
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </>
  );
};

export default CheckoutModal;
