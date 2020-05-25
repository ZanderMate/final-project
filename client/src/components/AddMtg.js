import React, { useState } from 'react';
import Container from './Container';
import Form from './Form';
import CardInfo from './CardInfo';
const ScryfallClient = require('scryfall-client')
const scryfall = new ScryfallClient()

const AddMtg = () => {
    const [name, setName] = useState('')
    const [results, setResults] = useState('')

    const searchCards = () => {
        let query = '';
        if (name) {
            query = query + name;
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
        setName('');
    }

    return (
        <div className="text-center">
            <Form>
                <p style={{ fontSize: 20 }}>Magic Card Name:</p>
                <input
                    type="text"
                    name="card-name"
                    value={name}
                    style={{ minHeight: 36 }}
                    placeholder="Card Name"
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn"
                    onClick={handleFormSubmit}
                />
            </Form>
            <Container>
                <CardInfo
                    results={results}
                />
            </Container>
        </div>
    )
}

export default AddMtg;