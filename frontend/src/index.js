import React from "react";
import ReactDom from "react-dom";
import "bulma/css/bulma.css";
import axios from 'axios';
import App from "./App";


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common["Content-Type"] = "application/json";



  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token99");
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
ReactDom.render(<App />, document.getElementById("root"));
