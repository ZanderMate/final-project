import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogInPage from './pages/Loginpage';
import Home from './pages/home';
import Signup from './pages/Signup'

const CommerceWrapper = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LogInPage} />
                <Route exact path="/signup" component={Signup} />
            </Router>
        </div>
    )
}

export default CommerceWrapper;