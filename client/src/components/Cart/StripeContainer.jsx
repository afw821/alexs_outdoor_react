import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./StripeForm";

const PUBLIC_KEY =
  "pk_test_51HPq8RA4jGUOIiwlAOGSSgUpJiAnuF7UqT2HLnf6SxSb2vaMlBM6PjwytLyKOR5xL4mRjwexPRzczvlLefyrxpIB00Xhst7EN9";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <StripeForm />
    </Elements>
  );
};

export default Stripe;
