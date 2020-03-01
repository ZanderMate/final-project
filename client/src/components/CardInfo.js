import React from "react";
const axios = require('axios');

function CardInfo(props) {
    console.log(props);
    const handleSubmit = (event) => {
        let name;
        let price;
        let imgsource;
        let typeLine;
        for (var i = 0; i < props.results.length; i++) {
            if (props.results[i].name === event.target.name) {
                name = props.results[i].name;
                price = props.results[i].prices.usd;
                imgsource = props.results[i].image_uris.normal;
                typeLine = props.results[i].type_line
            }
        }
        axios.post('/api/items', {
            cardName: name,
            price: price,
            imgsource: imgsource,
            type_line: typeLine,
            vendor: props.vendor
        }).then(res => {
            console.log("Added item successfully!")
            console.log("vendor: " + props.vendor)
        })
    }

    return (
        <div className="text-center">
            {props.results.length > 0 ? (
                <ul className="list-group">
                    {props.results.map((result) => (
                        <li className='list-group-item' value={result.name} key={result.id}>
                            <b>{result.name}</b>
                            {result.type_line}
                            {result.prices.usd}
                            <input
                                type="submit"
                                name={result.name}
                                className="btn btn-primary"
                                value="Add Item to Storefront"
                                onClick={handleSubmit}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                    <h2>No Results</h2>
                )}
        </div>

    );
}

export default CardInfo;
