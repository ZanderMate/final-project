import React, { useState } from 'react';
import HomeJumbotron from '../HomeJumbotron';
import NavTabs from '../navtabs';
import Form from '../Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
const bcrypt = require('bcryptjs');

const Signup = () => {
    const [businessName, setBusinessName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("customer");

    const addInfo = () => {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
        axios.post('/api/signup', {
            businessName: businessName,
            email: email,
            password: hashPassword,
            userType: userType,
            urlName: encodeURI(businessName)
        })
            .then(res => {
                setBusinessName("");
                setEmail("");
                setPassword("");
                setUserType("customer");
                console.log("Added vendor to database!")
                window.location.href = "/login"
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        addInfo();
    };

    return (
        <div>
            <HomeJumbotron
                style={{ minHeight: "100vh" }}
            >
                <div className="text-center">
                    <img src="./assets/images/Tigris[1].png" alt="placeholder logo" />
                </div>
                <br />
                <br />
                <Form>
                    <h1 className="text-center">Sign Up for a Tigris Account!</h1>
                    <br />
                    <div className="text-center">
                        <div style={{ display: userType === 'customer' ? 'none' : 'block' }}>
                            <p><b>Business Name</b></p>
                            <input
                                type="text"
                                name="businessName"
                                value={businessName}
                                placeholder="Business Name"
                                onChange={e => setBusinessName(e.target.value)} />
                        </div>
                        <br />
                        <p><b>Email</b></p>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            required />
                        <br />
                        <br />
                        <p><b>Password</b></p>
                        <input
                            type="text"
                            name="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            required />
                        <br />
                        <br />
                        <input
                            type="radio"
                            value="customer"
                            name="userType"
                            onChange={() => setUserType('customer')}
                            onClick={() => setUserType('customer')}
                            checked={userType === 'customer'} />
                        <label> Customer </label>
                        <br />
                        <input
                            type="radio"
                            value="vendor"
                            name="userType"
                            onChange={() => setUserType('vendor')}
                            onClick={() => setUserType('vendor')}
                            checked={userType === 'vendor'} />
                        <label> Vendor </label>
                        <br />
                        <br />
                        <input
                            type="submit"
                            value="Sign Up"
                            className="btn"
                            onClick={handleFormSubmit}
                        />
                        <br />
                        <br />
                        <p style={{fontSize: 14}}>Already Have an Account?</p>
                        <div className="text-center">
                            <Link to="/login" className="btn">Log In</Link>
                        </div>
                    </div>
                </Form>
            </HomeJumbotron>
        </div >
    )
}

export default Signup;