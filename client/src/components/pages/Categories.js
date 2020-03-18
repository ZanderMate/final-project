import React, { useState } from 'react';
import ClientNavbar from '../ClientNavbar';
import VendorNavbar from '../VendorNavbar';
import Container from '../Container';
import Jumbotron from '../Jumbotron';
import Footer from '../Footer';
import Row from '../Row';
import CategoryCol from '../Categorycol';
import ShowAll from '../ShowAll';
import ShowMTG from '../ShowMTG';
import ShowBoardGames from '../ShowBoardGames';
const axios = require('axios');

const Categories = () => {
    const [storeData, setStoreData] = useState(JSON.parse(localStorage.getItem("store")));
    const [category, setCategory] = useState('all');
    const [data, setData] = useState([]);

    const categorize = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
        console.log(category);
        switch (category) {
            case 'all':
                axios.get(`/api/items`)
                    .then((result) => {
                        setData(result.data)
                    })
                break;
            default:
                axios.get(`/api/category/${category}`)
                    .then(result => {
                        console.log("Success!")
                    })
        }
    }

    const handleChange = () => {
        switch (category) {
            case 'mtg':
                return <ShowMTG category={category} storeData={storeData} />;
            case 'boardgames':
                return <ShowBoardGames category={category} storeData={storeData} />;
            default:
                return <ShowAll category={category} storeData={storeData} />
        }
    }

    return (
        <div>
            {storeData.userType === "customer" ? (<ClientNavbar />) : (<VendorNavbar />)}
            <Jumbotron>
                <Container>
                    <h1 className="text-center">GAME CATALOG</h1>
                    <br />
                    <br />
                    <Row>
                        <CategoryCol>
                            <button
                                className="btn btn-primary mx-2"
                                type="submit"
                                value="all"
                                onClick={e => categorize(e)}
                            >
                                Show All
                            </button>
                        </CategoryCol>
                        <CategoryCol>
                            <button
                                className="btn mx-2"
                                type="submit"
                                value="mtg"
                                onClick={e => categorize(e)}
                            >
                                Magic Cards
                            </button>
                        </CategoryCol>
                        <CategoryCol>
                            <button
                                className="btn mx-2"
                                value="boardgames"
                                onClick={e => categorize(e)}
                            >
                                Board Games
                            </button>
                        </CategoryCol>
                    </Row>
                </Container>
            </Jumbotron >
            <Container>
                {handleChange()}
            </Container>
            <Footer />
        </div >
    )
}

export default Categories;