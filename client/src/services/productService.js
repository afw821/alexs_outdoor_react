import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getProducts() {
  return http.get(deployedApiUrl + "/projects");
}

export function addProduct() {
    const obj = {};
  return http.post(apiUrl + "/products", obj);
}

export function getProductById(projectId) {
  

}

export function deleteProduct(id) {
  
}