import React, { useState } from 'react';
import Container from '../Container';
import Row from '../Row';
import CategoryCol from '../Categorycol';
import AddMtg from '../AddMtg';
import AddBoardGames from '../AddBoardGames';
import AddMisc from '../AddMisc';
import VendorNavbar from '../VendorNavbar';
import NormalJumbotron from '../Jumbotron';
import Footer from '../Footer';


const AddItems = () => {
    const [category, setCategory] = useState('');

    const storeData = JSON.parse(localStorage.getItem("store"));

    const renderAdd = (category) => {
        switch (category) {
            case 'mtg':
                return <AddMtg />
            case 'boardgames':
                return <AddBoardGames />;
            case 'misc':
                return <AddMisc />
            default:
                return <h2 className="subtitle text-center" style={{ fontSize: 28 }}>Choose a Category</h2>
        }
    }

    return (
        <div>
            <VendorNavbar />
            <NormalJumbotron>
                <h1 className="text-center">{storeData.businessName.toUpperCase()}</h1>
                <h2 className="text-center subtitle" style={{ fontSize: 28 }}>Add Item to Inventory</h2>
                <Row>
                    <CategoryCol>
                        <button
                            className="btn category-btn mx-2"
                            type="submit"
                            value="mtg"
                            onClick={e => setCategory(e.target.value)}
                        >
                            Magic Cards
                            </button>
                    </CategoryCol>
                    <CategoryCol>
                        <button
                            className="btn category-btn mx-2"
                            type="submit"
                            value="boardgames"
                            onClick={e => setCategory(e.target.value)}
                        >
                            Board Games
                            </button>
                    </CategoryCol>
                    <CategoryCol>
                        <button
                            className="btn category-btn mx-2"
                            type="submit"
                            value="misc"
                            onClick={e => setCategory(e.target.value)}
                        >
                            Misc
                            </button>
                    </CategoryCol>
                </Row>
            </NormalJumbotron>
            <Container>
                <br />
                {renderAdd(category)}
            </Container>
            <Footer />
        </div>
    )
}

export default AddItems;