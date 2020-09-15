import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getPurchases() {}

export function purchase(name, UserId, ProductId, quantity) {
  const obj = {
    name: name,
    quantity: quantity,
    UserId: UserId,
    ProductId: ProductId,
  };
  return http.post(deployedApiUrl + "/purchases", obj);
}
