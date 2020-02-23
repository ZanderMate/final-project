const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClientSessionSchema = new Schema({
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

const ClientSession = mongoose.model('items', ClientSessionSchema);

module.exports = ClientSession;