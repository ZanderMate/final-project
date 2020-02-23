const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (users == null) {
            return done(null, false, { message: 'No user with that email found.' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                done(null, user)
            } else {
                done(null, false, { message: 'Password incorrect.' })
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((_id, done) => {
        return done(null, getUserById(_id))

    })
}

module.exports = initialize