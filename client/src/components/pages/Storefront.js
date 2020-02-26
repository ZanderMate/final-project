import React, { Component } from 'react';
import VendorNavbar from '../VendorNavbar';
import Container from '../Jumbotron'
import axios from 'axios';

let data = [];

export default class Storefront extends Component {

    state = {
        businessName: this.props.match.params.businessName,
        name: "",
        typeLine: "",
        imageSrc: "",
        price: ""
    }

    componentDidMount() {
        const { businessName } = this.props.match.params
        console.log(businessName);
        axios.get(`/api/items/${businessName}`)
            .then((data) => {
                console.log(data)
            })
    }

    render() {
        return (
            <div>
                <VendorNavbar />
                <Container>
                    <h1 className="text-center">{this.state.businessName.toUpperCase()}'S STOREFRONT</h1>
                    <br />
                    <br />
                </Container>
                <h3><b><u>Items to Sell:</u></b></h3>
                <div>
                    {data.length > 0 ? (
                        <div class="card-deck">
                            {data.map((result) => (
                                <div class="card">
                                    <img class="card-img-top" src={result.imageSrc} alt="mtg card" />
                                    <div class="card-body">
                                        <h5 class="card-title">{result.name}</h5>
                                        <p class="card-text">{result.typeLine}</p>
                                        <p class="card-text">{result.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                            <h2>Nothing to Sell</h2>
                        )}
                </div>
            </div >
        )
    }
}