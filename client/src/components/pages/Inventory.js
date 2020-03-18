import React, { useState } from 'react';
import ClientNavbar from '../ClientNavbar';
import VendorNavbar from '../VendorNavbar';
import Jumbotron from '../Jumbotron';
import ShowCards from '../ShowCards';
import Footer from '../Footer';
import Container from '../Container';

const Inventory = () => {
    const [storeData, setStoreData] = useState(JSON.parse(localStorage.getItem("store")))

    return (
        <div className="text-center">
            {storeData.userType === "customer" ? (
                <ClientNavbar />
            ) : (
                    <VendorNavbar />
                )}
            <Jumbotron>
                <h1>GAME CATALOG</h1>
            </Jumbotron>
            <Container>
                <ShowCards
                    storeData={storeData}
                />
            </Container>
            <Footer />
        </div >
    )
}

export default Inventory;