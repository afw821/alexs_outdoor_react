import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getCategories() {
  return http.get(apiUrl + "/categories");
}

export function addCategory() {
  return http.post(apiUrl + "/categories");
}

export function getProductById(productId) {}

export function deleteProduct(productId) {}
