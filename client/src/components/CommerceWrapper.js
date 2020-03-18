import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import LoginForm from './pages/Loginpage';
import Storefront from './pages/Storefront';
import AddItem from './pages/Add';
import Cart from './pages/Cart';
import Categories from './pages/Categories';

const CommerceWrapper = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={LoginForm} />
                <Route path="/storefront" component={Storefront} />
                <Route path="/add" component={AddItem} />
                <Route path="/cart" component={Cart} />
                <Route path="/search" component={Categories} />
            </Router>
        </div>
    )
}

export default CommerceWrapper;