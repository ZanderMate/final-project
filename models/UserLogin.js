const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    businessName: { type: String },
    email: { type: String, required: [true, 'The field is required'] },
    password: { type: String, required: [true, 'The field is required'] },
    userType: { type: String, required: [true, 'The field is required'] },
    urlName: { type: String }
})


UserSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

const User = mongoose.model('userlogin', UserSchema);

module.exports = User;