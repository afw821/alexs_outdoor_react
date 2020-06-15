import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getProducts() {
  return http.get(apiUrl + "/products");
}

export function addProduct(formData) {
  return http.post(apiUrl + "/products", formData);
}

export function getProductByPKId(productId) {
  return http.get(apiUrl + `/products/byPK/${productId}`);
}

export function deleteProduct(productId) {}
