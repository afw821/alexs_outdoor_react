import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function sendEmailContact(name, email, message) {
  const data = {
    name,
    email,
    message,
  };
  return http.post(deployedApiUrl + "/messages/contact", data);
}

export function sendEmailRegister(fromEmail, name) {
  const data = {
    fromEmail,
    name,
  };
  return http.post(deployedApiUrl + "/messages/register", data);
}

export function sendEmailPurchase(name, toEmail, html, userId) {
  const data = {
    name: name,
    toEmail: toEmail,
    html: html,
    userId: userId,
  };

  return http.post(deployedApiUrl + "/messages/purchase", data);
}

export function sendEmailForgotPW(email) {
  return http.post(deployedApiUrl + `/forgotPassword/${email}`);
}
