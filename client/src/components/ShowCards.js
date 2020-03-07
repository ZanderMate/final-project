import React, { Component } from 'react';
const axios = require('axios');

class ShowCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }
        this.addToCart = this.addToCart.bind(this);

    }

    componentDidMount() {
        axios.get(`/api/items`)
            .then((result) => {
                this.setState({
                    data: result.data
                })
                console.log(this.state.data)
            })
    }

    addToCart(e) {
        e.preventDefault();
        let name;
        let image;
        let price;
        const id = e.target.id;
        for (var i = 0; i < this.state.data.length; i++) {
            if (e.target.value === this.state.data[i].cardName) {
                name = this.state.data[i].cardName;
                image = this.state.data[i].imgsource;
                price = this.state.data[i].price;
            }
        }
        axios.post(`/api/cart/${id}`, {
            name: name,
            price: price,
            image: image,
            id: id
        })
            .then(result => {
                console.log('added to cart!')
                window.location.href = '/cart';
            })
    }

    render() {
        return (
            <div>
                {this.state.data.length > 0 ? (
                    <div className="card-deck justify-content-center">
                        {this.state.data.map((result) => (
                            <div className="card third col-3" key={result._id}>
                                <img className="card-img-top" src={result.imgsource} alt="mtg card" />
                                <div className="card-body">
                                    <h5 className="card-title">{result.cardName}</h5>
                                    <p className="card-text">{result.type_line}</p>
                                    <p className="card-text">${result.price}</p>
                                    <button
                                        type="submit"
                                        id={result._id}
                                        value={result.cardName}
                                        className="btn btn-primary"
                                        onClick={this.addToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                        <h2>Nothing to Buy</h2>
                    )
                }
            </div>
        )
    }
}

export default ShowCards;