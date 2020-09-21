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

export function sendEmailPurchase(name, toEmail, purchaseObj) {
  console.log("purchase obj ", purchaseObj);
  let html;
  const data = {
    name: name,
    toEmail: toEmail,
    html: html,
  };
  console.log("data from email service", data);
  //return http.post(apiUrl + "/messages/purchase", data);
}
