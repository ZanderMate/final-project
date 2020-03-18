const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SaleItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The field is required']
    },
    price: {
        type: String,
        required: [true, 'The field is required']
    },
    imgsource: {
        type: String
    },
    category: {
        type: String,
        required: [true, 'The field is required']
    },
    vendor: {
        type: String,
        required: [true, 'The field is required']
    }
})

const SaleItem = mongoose.model('items', SaleItemSchema);

module.exports = SaleItem;