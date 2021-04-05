const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initializePassport(passport, getUser, getUserById) {
    const authenticateUser = async (username, password, done) => {
        console.log("authenticating user")
        const user = getUser(username)
        if (user == null) {
            return done(null, false, {message: 'Invalid Username or Password'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Invalid Username or Password'})
            }
        } catch (e) {
            return done(e)
        }

    }
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticateUser ))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
    })
}

module.exports = initializePassport