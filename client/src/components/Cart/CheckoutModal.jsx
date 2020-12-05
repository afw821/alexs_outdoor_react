import React, { useState } from "react";
import Loader from "../Shared/Loader";
import Table from "..//Shared/Table";
import { getCartTableOptions } from "../../utils/tableHeaderOptions";
import { getTableRowOptions } from "./../../utils/tableRowOptions";
import { makePurchase } from "../../utils/makePurchase";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBadge,
} from "mdbreact";
import {
  makePayment,
  createPaymentMethod,
} from "../../services/paymentService";
import { toast } from "react-toastify";
import StripePaymentWrapper from "./../Stripe/StripePaymentWrapper";

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
  //local state

  const [paymentInProcess, setInProcess] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [displayValidation, setDisplayValidation] = useState(false);
  const [cardError, setError] = useState({});
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
    //table row options for table
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
  //Stripe Payment Billing details
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

  const handleSubmitPurchasePayment = async (e) => {
    //changes button text
    setInProcess(true);
    //handles posting purchase and processing STRIPE payment
    e.preventDefault();
    //process payment on stripe server
    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await createPaymentMethod(
      "card",
      card,
      billing_details,
      stripe
    );

    if (!error) {
      //console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id: stripePaymentId } = paymentMethod;
        const { data } = await makePayment(totalPrice, stripePaymentId);

        //console.log("Stripe 35 | data", data.success);
        if (data.success) {
          //post the putchase to the database
          await makePurchase(
            productsInCart,
            handleToggleLoader,
            user,
            stripePaymentId
          );
          toast.success("Payment Was Successful!");
          setInProcess(false);
        }
      } catch (error) {
        toast.error("Payment Was Unsuccessful");
      }
    } else {
      //user didn't enter correct info
      console.log("error", error);
      if (
        error.message === "Your card number is incomplete." ||
        error.message === "Your card number is invalid." ||
        error.message
      ) {
        //toast.error("Error creating payment on Stripe server", error.message);
        setDisplayValidation(true);
        setError({ displayMessage: true, message: error.message });
        setInProcess(false);
      }
    }
  };

  const { cartOptions } = getCartTableOptions();
  //makes CC form mobile responsive
  const calculatePadding = (clientWidth) => {
    switch (true) {
      case clientWidth > 975:
        return { padding: "0 25%" };
      case clientWidth <= 975 && clientWidth >= 500:
        return { padding: "0 15%" };
      case clientWidth < 500:
        return { padding: "0 5%" };
    }
  };

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
              <div
                className="col width-col"
                style={calculatePadding(clientWidth)}
              >
                <StripePaymentWrapper
                  user={user}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  clientWidth={clientWidth}
                  error={cardError}
                  handleResetError={setError}
                />
              </div>
            </div>
          </MDBModalBody>

          <MDBModalFooter>
            <strong>{totalPrice}</strong>

            <MDBBtn color="secondary" onClick={closeModal}>
              Close
            </MDBBtn>

            <MDBBtn type="submit" color="primary">
              {paymentInProcess ? "Making Payment..." : "Purchase"}
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </>
  );
};

export default CheckoutModal;
