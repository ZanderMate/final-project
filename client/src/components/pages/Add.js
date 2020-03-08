import React, { useState } from 'react';
import VendorNavbar from '../VendorNavbar';
import CardInfo from '../CardInfo'
import Jumbotron from '../Jumbotron';
import Footer from '../Footer';
import Container from '../Container';
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
            <Jumbotron>
                <h1 className="text-center">{storeData.businessName.toUpperCase()}</h1>
                <h2 className="text-center" style={{ lineHeight: 1.5 }}>Add Item to Inventory</h2>
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
                        className="btn"
                        onClick={handleFormSubmit}
                    />
                </div>
            </Jumbotron>
            <Container>
                <CardInfo
                    results={results}
                    vendor={vendor}
                />
            </Container>
            <Footer />
        </div>
    )
}

export default AddItems;