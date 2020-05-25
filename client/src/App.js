import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import RegisterForm from './components/RegisterForm';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route path="/addProduct" component={ProductForm} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="/addProduct" />
        </Switch>
      </div>
    );
  }
}

export default App;
