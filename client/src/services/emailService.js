import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function sendEmail(name, email, message) {
  const data = {
    name,
    email,
    message,
  };
  return http.post(deployedApiUrl + "/messages", data);
}
