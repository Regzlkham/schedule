import React, { Component, useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styles/globals.scss';
import './styles/home.scss';

import Login from "./Login";
import Teachers from "./Teachers";
import NavBar from "./NavBar";

export default class App extends Component {
  state = {
    token: null,
  };

  handleLogin = (token) => {
    this.setState({ token });
    localStorage.setItem("token99", token);
    this.router.history.push("/teachers");
  };

  handleLogout = () => {
    localStorage.removeItem("token99");
    // console.log("logged out");
    this.setState({ token: null });
    this.router.history.push("/");
  };

  render() {
    return (
      <Router ref={(router) => (this.router = router)}>
        {/* {this.state.token} */}
        <NavBar onLogout={this.handleLogout} />
        <div className="container">
          <Switch>
            <Route exact path="/teachers" component={Teachers} />
            <Route
              path="/"
              render={() => <Login onLogin={this.handleLogin} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
