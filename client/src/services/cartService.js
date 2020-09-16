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

export function updateCart(id, name, quantity, UserId, ProductId) {
  const reqBody = {
    name,
    quantity,
    UserId,
    ProductId,
  };
  return http.put(apiUrl + `/carts/byPKId/${id}`, reqBody);
}

export function getCartByUserId(userId) {
  return http.get(apiUrl + `/carts/byUserId/${userId}`);
}
//delete cart by PK Id
export function deleteCartByPkId(cartId) {
  return http.delete(apiUrl + `/carts/byPK/${cartId}`);
}
