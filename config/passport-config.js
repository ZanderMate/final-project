const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const VendorLogin = require('../models/vendorlogin');
const ClientLogin = require('../models/clientlogin');


passport.use(new LocalStrategy(
    { usernameField: "email" }, function (email, password, done) {
        VendorLogin.find({
            email: email
        }).then(function (vendor) {
            ClientLogin.find({
                email: email
            }).then(function (client) {
                if (!(vendor || client)) {
                    return done(null, false, { message: "Incorrect email" });
                } else if (!(vendor || client).validPassword(password)) {
                    return done(null, false, { message: "Incorrect password" });
                }
                return done(null, vendor);
            });
        })
    }
))

passport.serializeUser(function (user, callback) { callback(null, user) });
passport.deserializeUser(function (obj, callback) { callback(null, obj) });


module.exports = passport