import React from "react";
import { MtgCardViewer } from 'mtg-card-viewer';
const axios = require('axios');

function CardInfo(props) {

    console.log(props);
    const storeData = JSON.parse(localStorage.getItem("store"));

    const handleSubmit = (event) => {
        let name;
        let price;
        let imgsource;
        let typeLine;
        let vendor;
        for (var i = 0; i < props.results.length; i++) {
            if (props.results[i].name === event.target.name) {
                price = props.results[i].prices.usd;
                typeLine = props.results[i].type_line
                vendor = storeData.businessName
                if (props.results[i].card_faces) {
                    imgsource = props.results[i].card_faces[0].image_uris.normal;
                    name = props.results[i].card_faces[0].name
                } else {
                    imgsource = props.results[i].image_uris.normal;
                    name = props.results[i].name;
                }
            }
            console.log(name)
        }
        axios.post('/api/items', {
            cardName: name,
            price: price,
            imgsource: imgsource,
            type_line: typeLine,
            vendor: vendor
        }).then(res => {
            console.log("Added item successfully!")
            console.log("vendor: " + vendor)
        })
    }

    return (
        <div className="text-center">
            {props.results.length > 0 ? (
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Card Name</th>
                            <th scope="col">Card Type</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.results.map((result) => (

                            <tr>
                                {result._isDoublesided ? (
                                    <td><b>{result.name}</b></td>
                                ) : (
                                        <td><b><MtgCardViewer searchTerm={result.name} /></b></td>
                                    )}
                                <td>{result.type_line}</td>
                                <td>{result.prices.usd}</td>
                                {(result.prices.usd) ? (
                                    <td>
                                        <input
                                            type="submit"
                                            name={result.name}
                                            className="btn btn-primary"
                                            value="Add Item to Storefront"
                                            onClick={handleSubmit}
                                        />
                                    </td>
                                ) : (
                                        <td></td>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                    <h2>No Results</h2>
                )}
        </div>

    );
}

export default CardInfo;
