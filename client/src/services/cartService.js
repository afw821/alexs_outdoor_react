import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getCarts() {
  return http.get(apiUrl + "/carts");
}

export function addItemToCart(name, quantity, UserId, ProductId) {
  const obj = {
    name: name,
    quantity: quantity,
    UserId: UserId,
    ProductId: ProductId,
  };
  return http.post(apiUrl + "/carts", obj);
}

export function getCartByUserId(userId) {
  return http.get(apiUrl + `/carts/byUserId/${userId}`);
}

export function deleteCart(cartId) {}
