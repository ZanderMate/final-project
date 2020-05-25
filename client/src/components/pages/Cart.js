import React, { Component } from 'react';
import ClientNavbar from '../ClientNavbar';
import VendorNavbar from '../VendorNavbar'
import NormalJumbotron from '../Jumbotron';
import Container from '../Container';
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
                console.log(this.state.data);
            })
    }

    buyFullCart = e => {
        //go through items array that is the same as array
        e.preventDefault();
        let cart = this.state.data;
        console.log(cart);
        // let items = []
        axios.get('/api/items')
            .then(res => {
                let items = res.data;
                cart.forEach(cartItem => {
                    console.log(items, "items in loop")
                    if (items.some(item => item._id === cartItem.id)) {
                        axios.delete(`/api/items/${cartItem.id}`)
                            .then(res => {
                                console.log("deleted item for search page!")
                            })
                    }
                })
                this.emptyCart(e);
            })
    }

    removeItem = e => {
        e.preventDefault();
        const id = e.target.id
        axios.delete(`/api/cart/${id}`)
            .then(res => {
                console.log("Removed item from cart!");
                window.location.reload();
            })
    }

    emptyCart = e => {
        e.preventDefault();
        axios.delete('/api/cart')
            .then(res => {
                console.log('You have cleared cart!')
                window.location.reload();
            })
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
                <NormalJumbotron>
                    <h1 className="text-center">{this.state.storeData.email.toUpperCase()}'S CART</h1>
                </NormalJumbotron>
                <Container>
                    {this.state.data.length > 0 ? (
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Card Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">To Buy</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((result) => (
                                    <tr key={result._id}>
                                        <td><b><img src={result.image} className="zoom" alt="cart item" style={{maxHeight: 40}}/></b></td>
                                        <td><b>{result.name}</b></td>
                                        <td>{result.price.toFixed(2)}</td>
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
                                        <td>
                                            <input
                                                type="submit"
                                                value="Remove Item"
                                                className="btn btn-cart"
                                                id={result.id}
                                                onClick={this.removeItem}
                                            />
                                        </td>
                                    </tr>

                                ))}
                                <tr>
                                    <td />
                                    <td>Price Total:</td>
                                    <td><b>${priceTotal.toFixed(2)}</b></td>
                                    <td>
                                        <input
                                            className="text-center btn-cart btn"
                                            value="Buy Full Cart!"
                                            type="submit"
                                            onClick={this.buyFullCart}
                                        ></input>
                                    </td>
                                    <td>
                                        <input
                                            className="text-center btn-cart btn"
                                            value="Clear Cart"
                                            type="submit"
                                            onClick={this.emptyCart}
                                        />
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