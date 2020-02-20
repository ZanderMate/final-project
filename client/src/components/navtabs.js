import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/" className={window.location.pathname === "/clientlogin" ? "nav-link active" : "nav-link"}>
                    Client
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/" className={window.location.pathname === "/clientlogin" ? "nav-link active" : "nav-link"}>
                    Vendor
                </Link>
            </li>
        </ul>
    )
}

export default NavTabs;