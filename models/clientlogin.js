const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ClientLoginSchema = new Schema({
    email: {
        type: String,
        required: [true, 'The field is required']
    },
    password: {
        type: String,
        required: [true, 'The field is required']
    },
    userType: {
        type: String,
        required: [true, 'The field is required']
    }
})

const ClientLogin = mongoose.model('clientlogin', ClientLoginSchema);

module.exports = ClientLogin;