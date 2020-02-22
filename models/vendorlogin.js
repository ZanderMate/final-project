const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VendorLoginSchema = new Schema({
    businessName: {
        type: String,
        required: [true, 'The field is required']
    },
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

const VendorLogin = mongoose.model('vendorlogin', VendorLoginSchema);

module.exports = VendorLogin;