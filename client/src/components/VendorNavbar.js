import React from "react";
import { Link } from "react-router-dom";

const VendorNavtabs = () => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/storefront/" className={window.location.pathname === "/storefront/:businessName" ? "nav-link active" : "nav-link"}>
                    Storefront
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/add" className={window.location.pathname === "/add" ? "nav-link active" : "nav-link"}>
                    Add an Item
                </Link>
            </li>
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

export default VendorNavtabs;