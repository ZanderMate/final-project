const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    businessName: { type: String},
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

// UserSchema.pre('save', function (next) {  //this is stopping me from posting vendor sign up info into database
//     if (!this.password) {
//         console.log('models/vendorlogin.js ========NO PASSWORD PROVIDED=======')
//         next()
//     } else {
//         console.log('models/vendorlogin.js hashPassword in pre save');

//         this.password = this.hashPassword(this.password);
//     }
// })

const User = mongoose.model('userlogin', UserSchema);

module.exports = User;