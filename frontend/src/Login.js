import React, { Component } from "react";
import axios from "axios";
import './styles/login.scss';

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    loading: false,
  };

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, error: null });
  };

  handleClick = () => {
    // console.log('clickedd')
    axios
      .post("http://localhost:8000/api/v1/users/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((result) => {
        this.props.onLogin(result.data.token);
      })
      .catch((err) =>
        this.setState({ error: err.response.data.error.message })
      );
  };

  render() {
    return (
      <div className="loginForm">
        {this.state.error && (
          <div className="notification is-warning">{this.state.error}</div>
        )}
        {/* {this.state.email} */}
        <div className="field">
          <label className="label">Имэйл</label>
          <input
            className="input"
            name="email"
            type="text"
            onChange={this.handleType}
          />
        </div>

        <div className="field">
          <label className="label">Нууц үг</label>
          <input
            className="input"
            name="password"
            type="password"
            onChange={this.handleType}
          />
        </div>

        <div className="field">
          <button className="button is-link" onClick={this.handleClick}>
            Нэвтрэх
          </button>
        </div>
      </div>
    );
  }
}
