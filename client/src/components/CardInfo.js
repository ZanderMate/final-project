import React from "react";
// const axios = require('axios');

function CardInfo({ results }) {

    const handleSubmit = (event) => {
        // for (var i = 0; i < results.length; i++) {
        //     if (results[i].name === this.event.target.getAttribute("id")) {
        //         console.log(i)
        //     }
        // }
    }
    //     axios.post('/api/items', {
    //         cardName: results[i].name,
    //         price: results[i].prices.usd,
    //         imgsource: results[i].images_uris.normal,
    //         type_line: results[i].type_line,
    //         vendor: results[i].vendor
    //     }).then(res => {
    //         console.log("Added item successfully!")
    //     })
    // }

    return (
        <div className="text-center">
            {results.length > 0 ? (
                <ul className="list-group">
                    {results.map((result) => (
                        <li className='list-group-item' value={result.name} key={result.id}>
                            <b>{result.name}</b>
                            {result.type_line}
                            {result.prices.usd}
                            <input
                                type="submit"
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
