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
    sold: {
        type: Boolean,
        require: [true, 'Field is required'],
        default: false
    }
})

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;