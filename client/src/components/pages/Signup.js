import React, { useState } from 'react';
import Jumbotron from '../Jumbotron';
import NavTabs from '../navtabs';
import axios from 'axios';
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
            <NavTabs />
            <Jumbotron>
                <div className="text-center">
                    <img src="./assets/images/placeholder-logo.png" alt="placeholder logo" />
                </div>
                <br />
                <br />
                <h1 className="text-center">Sign Up for a Tigris Account!</h1>
                <br />
                <div className="text-center">
                    <div style={{ display: userType === 'customer' ? 'none' : 'block' }}>
                        <p>Business Name</p>
                        <input
                            type="text"
                            name="businessName"
                            value={businessName}
                            placeholder="Business Name"
                            onChange={e => setBusinessName(e.target.value)} />
                    </div>
                    <br />
                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        required />
                    <br />
                    <br />
                    <p>Password</p>
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
                    <input
                        type="submit"
                        value="Sign Up"
                        className="btn"
                        onClick={handleFormSubmit}
                    />
                </div>
            </Jumbotron>
        </div >
    )
}

export default Signup;