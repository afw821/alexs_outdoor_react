import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export async function createPaymentMethod(type, card, billing_details, stripe) {
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
  amount = amount.toString().replace(".", "");

  const data = {
    amount,
    id,
  };

  console.log("data", data);
  return http.post(deployedApiUrl + "/stripe/charge", data);
}
