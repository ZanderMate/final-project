import React, { Component } from 'react';
const axios = require('axios');

export default class ShowCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }
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

    addToCart() {
        axios.post('/api/cart/:email')
            .then(result => {
                console.log('added to cart!')
            })
    }

    render() {
        return (
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