import React, { Component } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  makePayment,
  createPaymentMethod,
} from "../../services/paymentService";

const StripeForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const billing_details = {};
    const elements = useElements();
    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await createPaymentMethod(
      "card",
      card,
      billing_details
    );

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await makePayment(amount, id);

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("StripeForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("StripeForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};

export default StripeForm;
