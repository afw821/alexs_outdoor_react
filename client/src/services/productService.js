import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getProducts() {
  return http.get(deployedApiUrl + "/products");
}

export function addProduct(formData) {
  return http.post(deployedApiUrl + "/products", formData);
}

export function getProductByPKId(productId) {
  return http.get(deployedApiUrl + `/products/byPK/${productId}`);
}

export function updateProductQuant(userQuant, productId) {
  const obj = {
    userQuant: userQuant,
  };
  return http.put(deployedApiUrl + `/products/byPK/purchase/${productId}`, obj);
}

export function updateProduct(product, productId) {
  return http.post(deployedApiUrl + `/products/byPK/${productId}`, product);
}

export function deleteProduct(productId) {
  return http.delete(deployedApiUrl + `/products/byPK/${productId}`);
}
