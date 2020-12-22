import http from "./httpService";
import { apiUrl, deployedApiUrl } from "../config.json";

export function updatePassword(email, oldPassword, newPassword) {
  const reqBody = {
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword,
    token: sessionStorage.getItem("token"),
  };
  const result = http.put(deployedApiUrl + "/auth/updatePassword", reqBody);

  return result;
}

export function updateForgetPw(userId, token, newPassword) {
  const reqBody = {
    userId: userId,
    token: token,
    password: newPassword,
  };
  const result = http.put(
    deployedApiUrl + `/forgotPassword/${userId}/${token}`,
    reqBody
  );

  return result;
}
