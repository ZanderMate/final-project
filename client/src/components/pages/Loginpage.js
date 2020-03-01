import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import NavTabs from '../navtabs'
import Container from '../Jumbotron'

class LoginForm extends Component {

    state = {
        email:"",
        password:""
    }


    handleChange = (event) =>{
        console.log(event.target)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/login', {
                email: this.state.email,
                password: this.state.password
            })
    }

    render() {
        return (
            <div>
                <NavTabs />
                <Container>
                    <div className="text-center">
                        <img src="./assets/images/placeholder-logo.png" alt="placeholder logo" />
                    </div>
                    <br />
                    <br />
                    <h1 className="text-center">Login to your Tigris Account</h1>
                    <br />
                    <form className="text-center">
                        <div className="text-center">
                            <p>Email:</p>
                        </div>
                        <div className="text-center">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <div className="text-center">
                            <p>Password: </p>
                        </div>
                        <div className="text-center">
                            <input className="form-input"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-7"></div>
                        <button
                            className="btn btn-primary col-1 col-mr-auto"

                            onClick={this.handleSubmit}
                            type="submit">Login</button>
                    </form>
                </Container>
            </div>
        )
    }
}


export default LoginForm