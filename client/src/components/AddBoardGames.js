import React, { useState } from 'react';
import Container from './Container';
import BoardGameInfo from './BoardGameInfo';
import Form from './Form';
const axios = require('axios');

const AddBoardGames = () => {
    const [name, setName] = useState('')
    const [results, setResults] = useState('')

    const searchGames = () => {
        let query = name;
        axios.get(`https://www.boardgameatlas.com/api/search?name=${query}&client_id=DUquorfjgf`
        )
            .then(_results => {
                setResults(_results.data.games)
                console.log(results)
            })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        searchGames();
        setName('');
    }

    return (
        <div className="text-center">
            <Form>
                <p style={{ fontSize: 20 }}>Board Game Name:</p>
                <input
                    type="text"
                    name="board-game-name"
                    value={name}
                    style={{ minHeight: 36 }}
                    placeholder="Board Game"
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
                    <BoardGameInfo
                        results={results}
                    />
                </Container>
        </div>
    )
}

export default AddBoardGames;