import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getProducts() {
  return http.get(apiUrl + "/products");
}

export function addProduct(formData) {
  //auth token passed here
  console.log("Form data from addProduct", formData);
  //const config = { data: { token: sessionStorage.getItem("token") } };
  return http.post(apiUrl + "/products", formData);
}

export function getProductByPKId(productId) {
  // no auth
  return http.get(apiUrl + `/products/byPK/${productId}`);
}

export function updateProductQuant(userQuant, productId) {
  //no auth but may need to add
  const obj = {
    userQuant: userQuant,
  };
  return http.put(apiUrl + `/products/byPK/purchase/${productId}`, obj);
}

export function updateProduct(product, productId) {
  //auth
  return http.post(apiUrl + `/products/byPK/${productId}`, product);
}

export function deleteProduct(productId) {
  //auth
  const config = {
    data: {
      token: sessionStorage.getItem("token"),
    },
  };
  return http.delete(apiUrl + `/products/byPK/${productId}`, config);
}
