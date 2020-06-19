import React, { useEffect } from "react";
import auth from "../services/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/register";
  });
  return null;
};

export default Logout;
