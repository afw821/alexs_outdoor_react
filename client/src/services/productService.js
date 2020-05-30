import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getProducts() {
  return http.get(apiUrl + "/products");
}

export function addProduct(formData) {
  console.log("file from addProduct", formData);
  return http.post(apiUrl + "/products", formData);
}

export function getProductById(productId) {}

export function deleteProduct(productId) {}
