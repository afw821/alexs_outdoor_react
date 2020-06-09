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
import { addItemToCart } from "./services/cartService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartDetails from "./components/CartDetails";

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
      Purchases: [],
      Carts: [],
    },
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log("cdm app user", user);

    this.setState({ user });
  }

  handleAddToCart = async (state) => {
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
    console.log("user cloned object", user);
    user.Carts.push(data);
    console.log("user after push", user);
    this.setState({ user });
  };
  render() {
    const { user, count } = this.state;
    console.log("render app user", user);
    // console.log(this.state.user.Carts.length);
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
            <Route path="/addProduct" component={ProductForm} />
            <Route
              path="/products"
              exact
              render={(props) => <Products {...props} user={this.state.user} />}
            />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
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
