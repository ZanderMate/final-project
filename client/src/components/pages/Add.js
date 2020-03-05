import React, { useState } from 'react';
import VendorNavbar from '../VendorNavbar';
import Container from '../Jumbotron';
import CardInfo from '../CardInfo'
const ScryfallClient = require('scryfall-client')
const scryfall = new ScryfallClient()


const AddItems = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [results, setResults] = useState('');
    const [vendor, setVendor] = useState('');

    const storeData = JSON.parse(localStorage.getItem("store"));

    const searchCards = () => {
        let query = '';
        if (name) {
            query = query + name;
        }
        if (type) {
            query = query + " t:" + type;
        }
        if (color) {
            query = query + " c:" + color;
        }

        scryfall.get('cards/search', {
            q: query.trim()
        }).then(_results => {
            console.log(query)
            setResults(_results)
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        searchCards();
        setColor('');
        setName('');
        setType('');
    }

    return (
        <div>
            <VendorNavbar />
            <Container>
                <h1 className="text-center">{storeData.businessName.toUpperCase()} Add Item to Inventory</h1>
                <br />
                <br />
                <div className="text-center">
                    <p>Card Name:</p>
                    <input
                        type="text"
                        name="card-name"
                        value={name}
                        placeholder="Card Name"
                        onChange={e => setName(e.target.value)}
                    />
                    <br />
                    <br />
                    <p>Card Type:</p>
                    <input
                        type="text"
                        name="card-type"
                        value={type}
                        placeholder="Card Type"
                        onChange={e => setType(e.target.value)}
                    />
                    <br />
                    <br />
                    <p>Card Color:</p>
                    <input
                        type="text"
                        name="card-color"
                        value={color}
                        placeholder="Card Color"
                        onChange={e => setColor(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary"
                        onClick={handleFormSubmit}
                    />
                </div>
            </Container>
            <CardInfo
                results={results}
                vendor={vendor}
            />
        </div>
    )
}

export default AddItems;