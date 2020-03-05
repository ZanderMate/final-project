import React from "react";
import { Link } from "react-router-dom";

const ClientNavbar = () => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/search" className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}>
                    Item Search
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/cart" className={window.location.pathname === "/cart" ? "nav-link active" : "nav-link"}>
                    Cart
                </Link>
            </li>
        </ul>
    )
}

export default ClientNavbar;