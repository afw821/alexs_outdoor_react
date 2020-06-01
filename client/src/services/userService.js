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
  password,
  isAdmin
) {
  console.log('made it into register');
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
    isAdmin
  };
  const { data: user } = await http.post(apiUrl + "/users", obj);
}

export async function getUserById(id) {
  const user = await http.get(apiUrl + `/users/${id}`);

  return user;
}

export default {
  register,
};
