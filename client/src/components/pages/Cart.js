import React, { Component } from 'react';
import ClientNavbar from '../ClientNavbar';
import VendorNavbar from '../VendorNavbar'
import Jumbotron from '../Jumbotron';
import Container from '../Container';
import { MtgCardViewer } from 'mtg-card-viewer';
import Footer from '../Footer';
const axios = require('axios');

class Cart extends Component {
    state = {
        data: "",
        storeData: JSON.parse(localStorage.getItem("store"))
    }

    buyCard(e) {
        const id = e.target.id
        console.log(id);
        axios.delete(`/api/cart/${id}`)
            .then(
                axios.delete(`/api/items/${id}`)
                    .then(result => {
                        console.log("You bought an item!")
                        window.location.reload();
                    })
            )
    }

    componentDidMount() {
        const email = this.state.storeData.email
        console.log(email);
        axios.get(`/api/cart/${email}`)
            .then((results) => {
                this.setState({ data: results.data })
            })
    }

    buyFullCart = (e) => {
        e.preventDefault();
        
    }

    reducerFunction = (accumulator, currentValue) => accumulator + currentValue;

    render() {
        const prices = []
        const itemObj = this.state.data ? this.state.data.map(item => {
            prices.push(item.price)
        }) : null

        const priceTotal = prices.length > 0 ? prices.reduce(this.reducerFunction) : null

        return (
            <div>
                {this.state.storeData.userType === "customer" ? (
                    <ClientNavbar />
                ) : (
                        <VendorNavbar />
                    )}
                <Jumbotron>
                    <h1 className="text-center">{this.state.storeData.email.toUpperCase()}'S CART</h1>
                </Jumbotron>
                <Container>
                    {this.state.data.length > 0 ? (
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Card Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">To Buy</th>
                                </tr>
                            </thead>


                            <tbody>
                                {this.state.data.map((result) => (
                                    <tr key={result._id}>
                                        <td><b><MtgCardViewer searchTerm={result.name} /></b></td>
                                        <td>{result.price}</td>
                                        <td>
                                            <button
                                                type="submit"
                                                value={result.name}
                                                className="btn btn-cart"
                                                onClick={this.buyCard}
                                                id={result.id}
                                            >
                                                Buy!
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                                <tr>
                                    <td></td>
                                    <td><b>Price Total</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><b>${priceTotal.toFixed(2)}</b></td>
                                    <td>
                                        <input
                                            className="text-center btn-cart btn"
                                            value="Buy Full Cart!"
                                        ></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                            <h2 className="text-center subtitle" style={{ fontSize: 28 }}>Nothing in Cart</h2>
                        )}
                </Container>
                <Footer />
            </div>
        )
    }
}

export default Cart;