import React, { Component } from 'react';
import ClientNavbar from '../ClientNavbar';
import Container from '../Jumbotron';
const axios = require('axios');

class Cart extends Component {
    state = {
        email: this.props.match.params.email,
        data: "",
        storeData: JSON.parse(localStorage.getItem("store"))
    }

    buyCard(e) {
        const id = e.target.id
        axios.delete(`/api/cart/${id}`)
            .then(
                axios.delete(`/api/items/${id}`)
                .then(result => {
                    console.log("You bought an item!")
                })
            )
    }

    componentDidMount() {
        const email = this.state.storeData.email
        console.log(email);
        axios.get(`/api/cart/${email}`)
            .then((results) => {
                console.log(results.data);
                this.setState({ data: results.data })
            })
    }

    render() {
        return (
            <div>
                <ClientNavbar />
                <Container>
                    <h1 className="text-center">{this.state.storeData.email.toUpperCase()}'S CART</h1>
                </Container>
                <div>
                    {this.state.data.length > 0 ? (
                        <div className="list-group">
                            {this.state.data.map((result) => (
                                <div className="list-group-item" key={this.state.storeData._id}>
                                    <p><b>{result.name}</b> ${result.price}
                                        <button
                                            type="submit"
                                            value={result.cardName}
                                            className="btn btn-primary"
                                            onClick={this.buyCard}
                                            id={result._id}
                                        >
                                            Buy!
                                    </button>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                            <h2 className="text-center">Nothing in Cart</h2>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Cart;