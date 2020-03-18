import React, { Component, setState } from 'react';
const axios = require('axios');

class ShowAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.category,
            storeData: props.storeData,
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
                console.log(this.state.storeData.email)
            })
    }

    addToCart(e) {
        e.preventDefault();
        let name;
        let image;
        let price;
        const id = e.target.id;
        const email = this.state.storeData.email
        for (var i = 0; i < this.state.data.length; i++) {
            if (e.target.value === this.state.data[i].name) {
                name = this.state.data[i].name;
                image = this.state.data[i].imgsource;
                price = this.state.data[i].price;
            }
        }
        axios.post(`/api/cart`, {
            name: name,
            price: price,
            image: image,
            id: id,
            email: email
        })
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
                            <div className="card third col-3 text-center" key={result._id}>
                                <img className="card-img-top image-card third" style={{ minHeight: 450 }} src={result.imgsource} alt="item card" />
                                <div className="card-body">
                                    <h5 className="card-title">{result.cardName}</h5>
                                    <p className="card-text">{result.type_line}</p>
                                    <p className="card-text">${result.price}</p>
                                    <button
                                        type="submit"
                                        id={result._id}
                                        value={result.name}
                                        className="btn btn-primary"
                                        onClick={this.addToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                        <h2 className="subtitle" style={{ fontSize: 28 }}>Nothing to Buy</h2>
                    )
                }
            </div>
        )
    }
}

export default ShowAll;