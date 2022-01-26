import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Aile from "../pages/Aile";
import Login from "../pages/Login/Login";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />

        <Route exact path="/Home" component={Home} />
        <Route exact path="/Aile" component={Aile} />
      </Switch>
    </Router>
  );
}
