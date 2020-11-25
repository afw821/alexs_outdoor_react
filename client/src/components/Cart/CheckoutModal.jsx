import React, { useState } from "react";
import Loader from "../Shared/Loader";
import Table from "..//Shared/Table";
import { getCartTableOptions } from "../../utils/tableHeaderOptions";
import { getTableRowOptions } from "./../../utils/tableRowOptions";
import StripeContainer from "../Stripe/StripeContainer";
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
import { toast } from "react-toastify";
import { MDBJumbotron, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import AccountInfo from "./../Account/AccountInfo";

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
  const [activeTab, setActveTab] = useState("1");
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
    } else
      toast.error("Error creating payment on Stripe server", error.message);
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
              <div className="col-4"></div>
              <div className="col-4">
                <MDBNav className="nav-tabs mt-5">
                  <MDBNavItem>
                    <MDBNavLink
                      link
                      to="#"
                      active={true}
                      //onClick={this.toggle("1")}
                      role="tab"
                    >
                      Home
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      link
                      to="#"
                      active={false}
                      //onClick={this.toggle("2")}
                      role="tab"
                    >
                      Profile
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={activeTab}>
                  <MDBTabPane tabId="1" role="tabpanel">
                    <p className="mt-2"></p>
                  </MDBTabPane>
                  <MDBTabPane tabId="2" role="tabpanel">
                    <p className="mt-2"></p>
                    <p></p>
                  </MDBTabPane>
                  <MDBTabPane tabId="3" role="tabpanel">
                    <p className="mt-2"></p>
                  </MDBTabPane>
                </MDBTabContent>
              </div>
            </div>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4">
                <MDBJumbotron>
                  <p className="lead">
                    Please Fill Out Credit Card Information Below
                  </p>
                  <p className="">
                    Payments are processed by{" "}
                    <a href="www.stripe.com" target="_blank">
                      Stripe
                    </a>
                    , a third party payment processing API
                  </p>
                  <hr className="my-2" />
                  <p className="d-flex justify-content-center">Account Info</p>
                  <p>
                    <div className="row">
                      <div className="col" style={{ margin: "0 25%" }}>
                        <AccountInfo
                          showAccountInfoRow={true}
                          expandRow={true}
                          clientWidth={clientWidth}
                          user={user}
                        />
                      </div>
                    </div>
                  </p>
                  <p>Billing info Same as Account Info?</p>
                  <p>
                    <StripeContainer />
                  </p>
                </MDBJumbotron>
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
