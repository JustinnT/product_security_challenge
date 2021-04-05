if (process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('connect-flash')
const eflash = require('express-flash')
const passport = require('passport')
const methodOverride = require('method-override')
const https = require('https')
const path = require('path')
const fs = require('fs')


const initializePassport = require('./passport-config.js')
initializePassport(
    passport, 
    username => users.find(user => user.name === username),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge : 60000},
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(eflash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkNotAuth, (req, res) => {
    res.redirect('/login')
})

app.get('/login', checkNotAuth, (req, res) => {
    res.render('login.ejs', { message : req.flash('message')})
})

app.get('/register', checkNotAuth, (req, res) => {
    res.render('register.ejs', { message : req.flash('message')})
})

app.post('/register', checkNotAuth, async (req, res) => {
    console.log(req.body)
    username = req.body.username
    email = req.body.email
    
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        // Checks for existing username and email
        for (var i = 0; i < users.length; i++) {
            if (users[i].name === username) {
                throw new Error("username")
            } 

            if (users[i].email === email) {
                throw new Error("email")
            } 
        }

        if (commonPasswords.indexOf(req.body.password) >= 0) {
            throw new Error("password")
        }

        users.push(
            {
               id: Date.now().toString(),
               name: req.body.username,
               password: hashedPassword,
               email: req.body.email
            }
        )

        // For ip logging
        const remoteAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

        req.flash('message', 'Account created successfully!')
        res.redirect('/login')
    } catch(error) {
        if (error.message === "password") {
            req.flash('message', `Please use a different ${error.message}.`)
            res.redirect('/register')
        } else {
            req.flash('message', `The ${error.message} is already in use.`)
            res.redirect('/register')
        }
    } 
})

app.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/success', checkAuth, (req, res) => {
    res.render('success.ejs')
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next ()
    }

    res.redirect('/login')
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/success')
    }
    next()
}

console.log("Loading common password into memory..")
var commonPasswords = fs.readFileSync(path.join(__dirname, 'rockyou.txt')).toString('utf-8').split('\n')

console.log("Setting up secure server..")
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'server.crt'))
}, app)
sslServer.listen(3443, () => console.log('Secure server running on port 3443'))
app.listen(3000)