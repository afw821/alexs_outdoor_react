import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getCategories() {
  return http.get(apiUrl + "/categories");
}

export function addCategory(category) {
  const obj = {
    name: category,
    token: sessionStorage.getItem("token"),
  };
  return http.post(apiUrl + "/categories", obj);
}

export function getCategoryByPKId(categoryId) {
  return http.get(apiUrl + `/categories/byPK/${categoryId}`);
}

export function deleteCategory(categoryId) {}
