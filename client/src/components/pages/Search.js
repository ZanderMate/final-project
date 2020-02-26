import React from 'react';
import ClientNavbar from '../ClientNavbar'
import Container from '../Jumbotron';
import ShowCards from '../ShowCards';

const Search = () => {
    return (
        <div className="text-center">
            <ClientNavbar />
            <Container>
                <h1>CARD SEARCH</h1>
            </Container>
            <ShowCards />
        </div >
    )
}

export default Search;