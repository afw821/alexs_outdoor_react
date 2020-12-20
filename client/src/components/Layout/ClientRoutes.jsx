import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserDetails from "../Account/UserDetails";
import Products from "../Products/Products";
import ProductDetails from "../Products/ProductDetails";
import ProtectedRoute from "../Shared/ProtectedRoute";
import UpdatePassword from "../Account/UpdatePassword";
import CartDetails from "../Cart/CartDetails";
import ContactForm from "../Contact/ContactForm";
import AdminProtectedRoute from "../Shared/AdminProctedRoute";
import Home from "../Home/Home";
import Logout from "../Logout/Logout";
import AdminPortal from "../Admin/AdminPortal";
import RegisterForm from "../Register/RegisterForm";
import NotFound from "../Shared/NotFound";
import LoginForm from "../Login/LoginForm";
import ForgotPWEmailForm from "./../Forgot_PW/ForgotPWEmailForm";
import UpdateForgottenPWForm from "../Forgot_PW/UpdateForgottenPWForm";
import ExpiredLink from "./../Forgot_PW/ExpiredLink";
const ClientRoutes = ({
  user,
  clientWidth,
  handleRemoveFromCart,
  handleSetActiveTab,
  calculateQuantity,
  totalPrice,
  productsInCart,
  handleAddToCart,
  activeTab,
}) => {
  return (
    <Switch>
      <ProtectedRoute
        path="/account/:id"
        exact
        render={(props) => (
          <UserDetails {...props} user={user} clientWidth={clientWidth} />
        )}
      />
      <ProtectedRoute
        path="/updatePassword/:id"
        exact
        render={(props) => (
          <UpdatePassword {...props} user={user} clientWidth={clientWidth} />
        )}
      />
      <ProtectedRoute
        path="/cart/:id"
        exact
        render={(props) => (
          <CartDetails
            {...props}
            handleRemoveFromCart={handleRemoveFromCart}
            handleSetActiveTab={handleSetActiveTab}
            calculateQuantity={calculateQuantity}
            totalPrice={totalPrice}
            productsInCart={productsInCart}
            user={user}
            clientWidth={clientWidth}
          />
        )}
      />
      <ProtectedRoute
        path="/product/:id"
        render={(props) => (
          <ProductDetails
            {...props}
            handleAddToCart={handleAddToCart}
            user={user}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route
        path="/:userId/:token"
        exact
        render={(props) => (
          <UpdateForgottenPWForm
            {...props}
            user={user}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <AdminProtectedRoute
        path="/adminPortal"
        exact
        render={(props) => (
          <AdminPortal {...props} user={user} clientWidth={clientWidth} />
        )}
      />
      <Route
        path="/products"
        exact
        render={(props) => (
          <Products
            {...props}
            user={user}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route
        path="/register"
        render={(props) => (
          <RegisterForm
            {...props}
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route
        path="/login"
        render={(props) => (
          <LoginForm
            {...props}
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route path="/passwordRecovery" component={ForgotPWEmailForm} />
      <Route path="/expiredLink" component={ExpiredLink} />
      <Route path="/contact" component={ContactForm} />
      <Route path="/logout" component={Logout} />
      <Route
        path="/home"
        render={(props) => (
          <Home
            {...props}
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route path="/not-found" component={NotFound} />
      <Redirect from="/" exact to="/home" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default ClientRoutes;
