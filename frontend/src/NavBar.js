import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ onLogout }) {
    return (
    <nav className="navbar">
        <div className="container">
        <div className="navbar-start">
            <Link className="navbar-item" to="/teachers">
            Хуваарь
            </Link>
            <Link className="navbar-item" to="/teach">
            Багш
            </Link>
            <Link className="navbar-item" to="/classes">
            Анги
            </Link>
            <a className="navbar-item" onClick={onLogout}>
            Гарах
            </a>
            </div>
        </div>
    </nav>
    );
}
