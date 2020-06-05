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
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    },
  };

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }
  render() {
    const { user } = this.state;
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
        <NavBar user={user} />
        <div style={h100} className="container-fluid">
          <Switch>
            <ProtectedRoute
              path="/account/:id"
              exact
              render={(props) => (
                <UserDetails {...props} user={this.state.user} />
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
