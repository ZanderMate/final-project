import React, { Component } from 'react';
import ClientNavbar from '../ClientNavbar';
import Container from '../Jumbotron';
const axios = require('axios');

class Cart extends Component {
    state = {
        email: this.props.match.params.email,
        data: ""
    }

    componentDidMount() {
        const { email } = this.props.match.params
        axios.get(`/api/cart/${email}`)
            .then((data) => { console.log(data) })
    }

    render() {
        return (
            <div>
                <ClientNavbar />
                <Container>
                    <h1 className="text-center">{this.state.email.toUpperCase()}'S CART</h1>
                </Container>
                <div>
                    {this.state.data.length > 0 ? (
                        <div className="card-deck">
                            {this.state.data.map((result) => (
                                <div className="card third">
                                    <img className="card-img-top" src={result.imgsource} alt="mtg card" />
                                    <div className="card-body">
                                        <h5 className="card-title">{result.cardName}</h5>
                                        <p className="card-text">{result.type_line}</p>
                                        <p className="card-text">${result.price}</p>
                                        <button
                                            type="submit"
                                            value={result.cardName}
                                            className="btn btn-primary">
                                            Add to Cart
                                    </button>
                                    </div>
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