import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl, deployedApiUrl } from "../config.json";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl + "/auth", {
    email,
    password,
  });
  sessionStorage.setItem("token", jwt);
}

export function updatePassword(email, oldPassword, newPassword) {
  const reqBody = {
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  const result = http.put(apiUrl + "/auth/updatePassword", reqBody);

  return result;
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem("token", jwt);
}

export function logout() {
  sessionStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem("token");

    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return sessionStorage.getItem("token");
}

export async function regenerateToken(user) {
  const token = await http.post(apiUrl + "/auth/generateToken/", user);

  return token;
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
