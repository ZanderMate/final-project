import React, { Component } from 'react';
import ClientNavbar from '../ClientNavbar';
import VendorNavbar from '../VendorNavbar'
import Jumbotron from '../Jumbotron';
import Container from '../Container';
import { MtgCardViewer } from 'mtg-card-viewer';
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
                console.log(results.data);
                this.setState({ data: results.data })
            })
    }

    render() {
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
                    <div>
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
                                            <td><MtgCardViewer searchTerm={result.name} /></td>
                                            <td>{result.price}</td>
                                            <td>
                                                <button
                                                    type="submit"
                                                    value={result.name}
                                                    className="btn btn-primary"
                                                    onClick={this.buyCard}
                                                    id={result.id}
                                                >
                                                    Buy!
                                            </button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        ) : (
                                <h2 className="text-center">Nothing in Cart</h2>
                            )}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Cart;