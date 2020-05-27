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

class App extends Component {
  state = { user: null };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar user={user} />
        <div style={{ backgroundColor: "#fdf9f3" }} className="container-fluid">
          <Switch>
            <Route path="/account/:id" component={UserDetails} />
            <Route path="/addProduct" component={ProductForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
