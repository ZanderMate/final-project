import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/login" className={window.location.pathname === "/clientlogin" ? "nav-link active" : "nav-link"}>
                    Log In
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/signup" className={window.location.pathname === "/vendorlogin" ? "nav-link active" : "nav-link"}>
                    Sign Up
                </Link>
            </li>
        </ul>
    )
}

export default NavTabs;