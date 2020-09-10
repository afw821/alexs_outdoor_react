import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const AdminProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const { isAdmin } = auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAdmin) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default AdminProtectedRoute;
