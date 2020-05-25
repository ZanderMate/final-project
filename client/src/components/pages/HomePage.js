import React from 'react';
import LoginJumbotron from '../LoginJumbotron';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <LoginJumbotron>
            <div className="text-center">
                <img src="./assets/images/Tigris[1].png" alt="placeholder logo" />
            </div>
            <br />
            <br />
            <h1 className="text-center">Welcome to Tigris Shopping!</h1>
            <br />
            <div className="text-center">
                <Link to="/signup" className="btn">Sign-Up</Link>
            </div>
            <br />
            <div className="text-center">
                <Link to="/login" className="btn">Log-In</Link>
            </div>
            <br />
        </LoginJumbotron>
    )
}

export default HomePage;