import React, { Component } from 'react';
import VendorNavbar from '../VendorNavbar';
import Container from '../Jumbotron'
import axios from 'axios';


export default class Storefront extends Component {

    state = {
        name: "",
        typeLine: "",
        imageSrc: "",
        price: "",
        items: [],
        storeData: JSON.parse(localStorage.getItem("store"))
    }

    componentDidMount() {
        const vendor = this.state.storeData.urlName
        console.log(this.state.storeData.urlName)
        axios.get(`/api/items/${vendor}`)
            .then((data) => {
                console.log("test", data)
                this.setState({ "items": data.data });
            })
    }


    render() {

        return (
            <div>
                <VendorNavbar />
                <Container>
                    <h1 className="text-center">{this.state.storeData.businessName.toUpperCase()}'S STOREFRONT</h1>
                    <br />
                    <br />
                </Container>
                <h3><b><u>Items to Sell:</u></b></h3>
                <div>
                    {this.state.items.length > 0 ? (
                        <div className="card-deck">
                            {this.state.items.map((result) => (
                                <div className="card text-center" key={result._id}>
                                    <img className="card-img-top image-card third" src={result.imgsource} alt="mtg card" />
                                    <div className="card-body">
                                        <h5 className="card-title">{result.cardName}</h5>
                                        <p className="card-text">{result.type_line}</p>
                                        <p className="card-text">${result.price}</p>
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