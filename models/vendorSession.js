const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VendorSessionSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const VendorSession = mongoose.model('items', VendorSessionSchema);

module.exports = VendorSession;