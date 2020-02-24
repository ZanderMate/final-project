import React from 'react';
import Container from '../Jumbotron';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <div className="text-center">
                <img src="./assets/images/placeholder-logo.png" alt="placeholder logo" />
            </div>
            <br />
            <br />
            <h2 className="text-center">Welcome to Tigris Shopping!</h2>
            <br />
            <div className="text-center">
                <Link to="/signup" className="btn btn-primary">Sign-Up</Link>
            </div>
            <br />
            <div className="text-center">
                <Link to="/login" className="btn btn-primary">Log-In</Link>
            </div>
            <br />
        </Container>
    )
}

export default Home;