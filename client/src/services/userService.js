import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export async function register(
  firstName,
  lastName,
  address,
  address2,
  city,
  state,
  zipCode,
  email,
  password,
  isAdmin
) {
  const obj = {
    firstName,
    lastName,
    address,
    address2,
    city,
    state,
    zipCode,
    email,
    password,
    isAdmin,
  };
  console.log("u service register", obj);
  const { data: user } = await http.post(apiUrl + "/users", obj);

  return user;
}

export async function getUserById(id) {
  const user = await http.get(apiUrl + `/users/${id}`);

  return user;
}

export async function updateUser(
  id,
  firstName,
  lastName,
  address,
  address2,
  city,
  state,
  zipCode,
  email
) {
  const reqBody = {
    firstName,
    lastName,
    address,
    address2,
    city,
    state,
    zipCode,
    email,
  };
  const result = await http.put(apiUrl + `/users/${id}`, reqBody);
  console.log("user from user service put", result);

  return result;
}

export default {
  register,
};
