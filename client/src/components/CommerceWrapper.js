import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './pages/Loginpage';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Storefront from './pages/Storefront';
import AddItem from './pages/Add'
import Search from './pages/Search'
import Cart from './pages/Cart'


const CommerceWrapper = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={LoginForm} />
                <Route path="/storefront" component={Storefront} />
                <Route path="/add" component={AddItem} />
                <Route exact path="/search" component={Search} />
                <Route path="/cart" component={Cart} />
            </Router>
        </div>
    )
}

export default CommerceWrapper;