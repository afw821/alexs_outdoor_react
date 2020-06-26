import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import auth from "./services/authService";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import UserDetails from "./components/UserDetails";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartDetails from "./components/CartDetails";
import { addItemToCart } from "./services/cartService";
import { regenerateToken, loginWithJwt } from "./services/authService";
import ContactForm from "./components/ContactForm";

class App extends Component {
  state = {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      isAdmin: "",
      Purchases: [{}],
      Carts: [{}],
    },
  };

  componentDidMount() {
    console.log("cdm from App.js state", this.state.user);
    const user = auth.getCurrentUser();

    this.setState({ user });
  }

  handleAddToCart = async (state) => {
    try {
      const { data: product, userQuantity } = state;
      const productName = product.name;
      const description = product.description;
      const inStock = product.inStock;
      const userId = this.state.user.id;
      const productId = product.id;
      //add item to cart
      const { data } = await addItemToCart(
        `user-cart-${userId}`,
        userQuantity,
        userId,
        productId
      );

      const user = { ...this.state.user };
      user.Carts.push(data);
      this.setState({ user });

      //refresh issue (same as in AccountEditForm.jsx line 115)
      //we have to do this to regenerate a new JWT so the user can be read off of it
      const { data: token } = await regenerateToken(user);

      if (token) {
        loginWithJwt(token);
        //window.location = `/cart/${userId}`;
      }
    } catch (ex) {
      if (ex.response.status === 400) toast.error(ex.response.data);
    }
  };
  render() {
    const { user, count } = this.state;
    console.log("count from render in app", count);
    console.log("render from App.js state", this.state.user);

    const h100 = {
      minHeight: "100vh" /* will cover the 100% of viewport */,
      overflow: "hidden",
      display: "block",
      position: "relative",
      paddingBottom: "209px", //this needs to be the height of the footer
      backgroundColor: "#fdf9f3" /* height of your footer */,
    };
    return (
      <>
        <ToastContainer />
        <NavBar count={count} user={user} />
        <div style={h100} className="container-fluid">
          <Switch>
            <ProtectedRoute
              path="/account/:id"
              exact
              render={(props) => (
                <UserDetails {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              path="/cart/:id"
              exact
              render={(props) => (
                <CartDetails {...props} user={this.state.user} />
              )}
            />
            <Route
              path="/product/:id"
              render={(props) => (
                <ProductDetails
                  {...props}
                  handleAddToCart={this.handleAddToCart}
                  user={this.state.user}
                />
              )}
            />
            <ProtectedRoute
              path="/addProduct"
              exact
              render={(props) => (
                <ProductForm {...props} user={this.state.user} />
              )}
            />
            <Route
              path="/products"
              exact
              render={(props) => <Products {...props} user={this.state.user} />}
            />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/contact" component={ContactForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
