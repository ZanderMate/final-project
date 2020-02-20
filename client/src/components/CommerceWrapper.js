import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientLogInPage from './clientloginpage';
import VendorLogInPage from './vendorloginpage';

const CommerceWrapper = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/clientlogin" component={ClientLogInPage} />
                    <Route exact path="/vendorlogin" component={VendorLogInPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default CommerceWrapper;