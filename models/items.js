const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SaleItemSchema = new Schema({
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
        default: false
    },
    imgsource: {
        type: String
    },
    vendor: {
        type: String,
        required: [true, 'The text field is required']
    }
})

const SaleItem = mongoose.model('items', SaleItemSchema);

module.exports = SaleItem;