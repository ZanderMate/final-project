import React, { useState } from 'react';
import ClientNavbar from '../ClientNavbar';
import VendorNavbar from '../VendorNavbar';
import Jumbotron from '../Jumbotron';
import ShowCards from '../ShowCards';

const Search = () => {
    const [storeData, setStoreData] = useState(JSON.parse(localStorage.getItem("store")))

    return (
        <div className="text-center">
            {storeData.userType === "customer" ? (
                <ClientNavbar />
            ) : (
                    <VendorNavbar />
                )}
            <Jumbotron>
                <h1>CARD SEARCH</h1>
            </Jumbotron>
            <ShowCards />
        </div >
    )
}

export default Search;