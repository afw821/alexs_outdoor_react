import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function getCategories() {
  return http.get(deployedApiUrl + "/categories");
}

export function addCategory(category) {
  const obj = {
    name: category,
  };
  return http.post(deployedApiUrl + "/categories", obj);
}

export function getCategoryByPKId(categoryId) {
  return http.get(deployedApiUrl + `/categories/byPK/${categoryId}`);
}

export function deleteCategory(categoryId) {}
