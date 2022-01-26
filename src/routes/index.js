import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Customer from "../pages/Customer/Customer";
import CustomerInfo from "../pages/CustomerInfo/CustomerInfo";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Customer" component={Customer} />
        <Route exact path="/CustomerInfo/:key" component={CustomerInfo} />
      </Switch>
    </Router>
  );
}
