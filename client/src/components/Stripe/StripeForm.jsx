import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeForm = () => {
  return (
    <div style={{ maxWidth: "400px" }}>
      <CardElement />
    </div>
  );
};

export default StripeForm;
