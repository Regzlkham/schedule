import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Teachers extends Component {
state = {
    error: null,
    loading: false,
    teachers: [],
};

componentDidMount = () => {
    this.setState({ loading: true });
    axios
        .get("http://localhost:8000/api/v1/teachers")
        .then((result) =>
        this.setState({ loading: false, teachers: result.data.data })
        )
    .catch((err) => this.setState({ loading: false, error: err.response }));
};

render() {
    return (
    <div>
        <h1 className="title">Хичээлийн хуваарь зохиох</h1>
        {this.state.loading ? (
            <div>Түр хүлээнэ үү...</div>
        ) : (
            <div className="container mt-3 mb-3">
            </div>
            )}
        </div>
        );
    }
}
