import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export async function register(
  firstName,
  lastName,
  address,
  address2,
  city,
  state,
  zip,
  email,
  password
) {
  const obj = {
    firstName,
    lastName,
    address,
    address2,
    city,
    state,
    zip,
    email,
    password,
  };
  const { data: user } = await http.post(apiUrl + "/users", obj);
}

export async function getUserById(id) {
  const user = await http.get(apiUrl + `/users/${id}`);
  console.log("user", user);
  return user;
}

export default {
  register,
};
