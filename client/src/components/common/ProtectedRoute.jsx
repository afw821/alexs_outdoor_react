import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  console.log("protected route");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) {
          console.log("!auth.getCurrentUser()");
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          console.log("made it into the else");
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
