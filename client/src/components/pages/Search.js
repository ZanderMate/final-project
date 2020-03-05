import React from 'react';
import ClientNavbar from '../ClientNavbar'
import Jumbotron from '../Jumbotron';
import ShowCards from '../ShowCards';

const Search = () => {
    return (
        <div className="text-center">
            <ClientNavbar />
            <Jumbotron>
                <h1>CARD SEARCH</h1>
            </Jumbotron>
            <ShowCards />
        </div >
    )
}

export default Search;