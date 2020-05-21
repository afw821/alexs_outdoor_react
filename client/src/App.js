import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './components/home';

class App extends Component{


  render() {
    return(
    <div className="container-fluid">
      <Switch>
        <Route path="/home" component={Home}/>
        <Redirect from="/" exact to="/home"/>
      </Switch>
    </div>

    );
  }
}

export default App;
