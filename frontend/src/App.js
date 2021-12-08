import React, { Component, useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';
import './styles/home.scss';

import Login from "./Login";
import Teachers from "./Teachers";
import Room from "./Room";
import Classes from "./Classes";
import Teach from "./Teach";
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
      { this.state.token  && <NavBar onLogout={this.handleLogout} />} 
    
          <Switch>
         
          <Route exact path="/teachers" component={Teachers} />
            <Route exact path="/teach" component={Teach} />
            <Route exact path="/room" component={Room} />
            <Route exact path="/classes" component={Classes} />
            <Route
            path="/"
            render={() => <Login onLogin={this.handleLogin} />}
          />
          </Switch>
            </Router>
    );
  }
}
