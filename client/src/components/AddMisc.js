import React, { useState } from 'react';
import Container from './Container';
import Form from './Form';

const AddMisc = () => {
    const storeData = JSON.parse(localStorage.getItem("store"));

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imgsource, setImgsource] = useState('');
    const [vendor, setVendor] = useState(storeData.businessName);
    const [category, setCategory] = useState('misc');

    return (
        <div className="text-center">
            <Form>
                <p style={{ fontSize: 20 }}>Miscellaneous Item</p>
                <br />
                <p><b>Item Name:</b></p>
                <input
                    type="text"
                    value={name}
                    id="item-name"
                    name="item-name"
                    style={{ minHeight: 36 }}
                    placeholder="Item Name (be specific)"
                    onChange={e => setName(e.target.value)}
                />
                <br />
                <br />
                <p><b>Item Price:</b></p>
                <input
                    type="text"
                    value={price}
                    name="item-price"
                    style={{ minHeight: 36 }}
                    placeholder="Item Price"
                    onChange={e => setPrice(e.target.value)}
                />
                <br />
                <br />
                <p><b>Item Image:</b></p>
                <h4>This is where the drag and drop will go!</h4>
                <p>Work in Progress</p>
            </Form>
        </div>
    )
}

export default AddMisc;