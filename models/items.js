const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SaleItemSchema = new Schema({
    cardName: {
        type: String,
        required: [true, 'The field is required']
    },
    price: {
        type: String,
        required: [true, 'The field is required']
    },
    type_line: {
        type: String,
        required: [true, 'The field is required']
    },
    imgsource: {
        type: String
    },
    vendor: {
        type: String,
        required: [true, 'The field is required']
    }
})

const SaleItem = mongoose.model('items', SaleItemSchema);

module.exports = SaleItem;