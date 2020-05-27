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
  console.log("user service obj", obj);
  const { data: user } = await http.post(apiUrl + "/users", obj);
  console.log("user from service", user);
}

export default {
  register,
};
