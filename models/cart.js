const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    image: {
        type: String,
        require: [true, 'Image field is required'],
    },
    id: {
        type: String,
        require: [true, 'ID Field is required'],
    },
    email: {
        type: String,
        require: [true, 'Email field is required']
    }
})

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;