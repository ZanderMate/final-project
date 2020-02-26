import React from "react";
import NavTabs from "../navtabs";
import Container from '../Jumbotron';

const LoginPage = () => {

    const LogIn = () => {
        
    }
    

    return (
        <div>
            <NavTabs />
            <Container>
                <div className="text-center">
                    <img src="./assets/images/placeholder-logo.png" alt="placeholder logo" />
                </div>
                <br />
                <br />
                <h1 className="text-center">Log In to your Tigris Account!</h1>
                <br />
                <form method="post" className="text-center">
                    <p>Email</p>
                    <input type="text" name="email" placeholder="E-mail" />
                    <br />
                    <br />
                    <p>Password</p>
                    <input type="text" name="password" placeholder="Password" />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="Log In"
                        className="btn btn-primary"
                        onClick={LogIn}
                    />
                </form>
            </Container>
        </div>
    )
}

export default LoginPage