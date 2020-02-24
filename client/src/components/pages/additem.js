import React, { useState } from 'react';
import VendorNavbar from '../VendorNavbar';
import Container from '../Jumbotron';
const ScryfallClient = require('scryfall-client')
const scryfall = new ScryfallClient()

const AddItems = () => {
    const [imgSrc, setImgSrc] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');

    const searchCards = () => {
        scryfall.get('cards/search', {
            q: `${name} t:${type} c:${color}` //need to make t: and c: optional if no type or color 
        }).then(list => {
            const names = list.map(function(card) {
                return card
            })
            console.log(names);
            //I need to grab name of card, normal-size image, type_line
        })
    }

    return (
        <div>
            <VendorNavbar />
            <Container>
                <h1 className="text-center">Add Item to Inventory</h1>
                <br />
                <br />
                <div className="text-center">
                    <p>Card Name:</p>
                    <input
                        type="text"
                        name="card-name"
                        placeholder="Card Name"
                        onChange={e => setName(e.target.value)}
                    />
                    <br />
                    <br />
                    <p>Card Type:</p>
                    <input
                        type="text"
                        name="card-type"
                        placeholder="Card Type"
                        onChange={e => setType(e.target.value)}
                    />
                    <br />
                    <br />
                    <p>Card Color:</p>
                    <input
                        type="text"
                        name="card-color"
                        placeholder="Card Color"
                        onChange={e => setColor(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary"
                        onClick={searchCards}
                    />
                </div>
            </Container>
        </div>
    )
}

export default AddItems;