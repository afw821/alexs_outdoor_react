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

export function sendEmailPurchase(name, email, message, toEmail, purchaseObj) {
  console.log("purchase obj stringify", JSON.stringify(purchaseObj));
  const data = {
    name: name,
    email: email,
    message: message,
    toEmail: toEmail,
    purchaseObj: JSON.stringify(purchaseObj),
  };
  return http.post(deployedApiUrl + "/messages/purchase", data);
}
