import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getPurchases() {} // not in use

export function purchase(name, UserId, ProductId, quantity, stripePaymentId) {
  const obj = {
    name: name,
    quantity: quantity,
    UserId: UserId,
    ProductId: ProductId,
    token: sessionStorage.getItem("token"),
    stripePaymentId: stripePaymentId,
  };
  return http.post(apiUrl + "/purchases", obj);
}
