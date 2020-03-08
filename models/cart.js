const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The text field is required']
    },
    price: {
        type: Number,
        required: [true, 'The text field is required']
    },
    image: {
        type: String,
        require: [true, 'Field is required'],
    },
    id: {
        type: String,
        require: [true, 'Field is required'],
    },
    email: {
        type: String,
        require: [true, 'Field is required']
    }
})

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;