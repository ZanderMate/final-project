const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    urlEmail: {
        type: String,
        required: [true, 'The field is required']
    }
});

const ClientLogin = mongoose.model('clientlogin', ClientLoginSchema);

ClientLogin.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = ClientLogin;