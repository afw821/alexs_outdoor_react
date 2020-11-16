import http from "./httpService";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { apiUrl, deployedApiUrl } from "../config.json";
const stripe = useStripe();

export async function createPaymentMethod(type, card, billing_details) {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type,
    card,
    billing_details,
  });

  return {
    error,
    paymentMethod,
  };
}

export function makePayment(amount, id) {
  const data = {
    amount,
    id,
  };
  return http.post(apiUrl + "/stripe/charge", data);
}
