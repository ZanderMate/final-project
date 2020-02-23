import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogInPage from './pages/Loginpage';
import Home from './pages/home';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Storefront from './pages/Storefront';
import AddItem from './pages/additem'
import Cart from './pages/Cart';
import ItemSearch from './pages/itemsearch'

const CommerceWrapper = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LogInPage} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/item-search" component={Search} />
                <Route path="/storefront/:businessName" component={Storefront} />
                <Route exact path="/add-item" component={AddItem} />
                <Route exact path="/cart" component={Cart} />
                <Route exact part="/itemsearch" component={ItemSearch} />

            </Router>
        </div>
    )
}

export default CommerceWrapper;