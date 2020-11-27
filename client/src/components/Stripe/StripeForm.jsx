import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeForm = () => {
  const options = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        border: "1px solid lightgray",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "blue" },
        "::placeholder": { color: "black" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  return (
    <div style={{ maxWidth: "400px" }}>
      <CardElement options={options} />
    </div>
  );
};

export default StripeForm;
