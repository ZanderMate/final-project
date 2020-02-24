import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogInPage from './pages/Loginpage';
import Home from './pages/home';
import Signup from './pages/Signup';
import Storefront from './pages/Storefront';
import AddItem from './pages/additem'


const CommerceWrapper = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={LogInPage} />
                <Route path="/storefront/:businessName" component={Storefront} />
                <Route path="/add-item/:businessName" component={AddItem} />
            </Router>
        </div>
    )
}

export default CommerceWrapper;