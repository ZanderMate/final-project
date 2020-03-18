import React from "react";
const axios = require('axios');

const BoardGameInfo = (props) => {
    console.log(props);
    const storeData = JSON.parse(localStorage.getItem("store"))

    const handleSubmit = event => {
        let name;
        let price;
        let imgsource;
        let vendor = storeData.businessName;
        for (var i = 0; i < props.results.length; i++) {
            if (props.results[i].name === event.target.name) {
                price = props.results[i].price;
                imgsource = props.results[i].images.medium;
                name = props.results[i].name;
            }
        }
        axios.post('/api/items', {
            name: name,
            price: price,
            imgsource: imgsource,
            vendor: vendor,
            category: "boardgames",
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
                            <th scope="col"></th>
                            <th scope="col">Board Game</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.results.map((result) => (

                            <tr key={result.id}>
                                <td><img
                                    src={result.images.small}
                                    alt="board cover"
                                    className="zoom"
                                    style={{maxHeight:40}}
                                /></td>
                                <td><b>{result.name}</b></td>
                                <td>{result.price}</td>
                                <td>
                                    <input
                                        type="submit"
                                        name={result.name}
                                        className="btn btn-primary"
                                        value="Add Item to Storefront"
                                        onClick={handleSubmit}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                    <h2 className="subtitle" style={{ fontSize: 28 }}>No Results</h2>
                )}
        </div>
    )
}

export default BoardGameInfo;