import React, { useState } from 'react';
import Container from '../Container';
import NavTabs from '../navtabs';
import axios from 'axios';

const Signup = () => {
    const [businessName, setBusinessName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState("customer");

    const addInfo = () => {
        if (userType === "vendor") {
            axios.post('/api/vendorlogin', {
                businessName: businessName,
                email: email,
                password: password,
                userType: userType
            })
                .then(res => {
                    if (res.data) {
                        setBusinessName("");
                        setEmail("");
                        setPassword("");
                        setUserType("customer");
                    }
                })
                .catch(err => console.log(err))
        }
        else if (userType === "customer") {
            axios.post('/api/clientlogin', {
                email: email,
                password: password,
            })
                .then(res => {
                    if (res.data) {
                        setEmail("");
                        setPassword("");
                        setUserType("customer");

                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        addInfo();
    };

    return (
        <div>
            <NavTabs />
            <Container>
                <div className="text-center">
                    <img src="./assets/images/placeholder-logo.png" alt="placeholder logo" />
                </div>
                <br />
                <br />
                <h2 className="text-center">Sign Up for a Tigris Account!</h2>
                <br />
                <div className="text-center">
                    <div style={{ display: userType === 'customer' ? 'none' : 'block' }}>
                        <p>Business Name</p>
                        <input type="text" name="businessName" placeholder="Business Name" onChange={e => setBusinessName(e.target.value)} />
                    </div>
                    <br />
                    <p>Email</p>
                    <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                    <br />
                    <br />
                    <p>Password</p>
                    <input type="text" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                    <br />
                    <br />
                    <input type="radio" value="customer" name="userType" onClick={() => setUserType('customer')} checked={userType === 'customer'} />
                    <label class="checkbox-container"> Customer </label>
                    <br />
                    <input type="radio" value="vendor" name="userType" onClick={() => setUserType('vendor')} checked={userType === 'vendor'} />                <span class="checkmark" />
                    <label class="checkbox-container"> Vendor </label>
                    <br />
                    <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-primary"
                        onClick={handleFormSubmit}
                    />
                </div>
            </Container >
        </div >
    )
}

export default Signup;