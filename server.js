// required dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const session = require('express-session')
// controller variables
const fruitsController = require('./controllers/fruits.js');
const userController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessions.js')
// env variables
const mongoUrl = process.env.MONGOURI
const PORT = process.env.PORT || 3000

// DATABASE CONNECTION
mongoose.connect(mongoUrl + 'fruits')
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

// MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// controller middleware
app.use('/fruits', fruitsController);
app.use('/users', userController)
app.use('/sessions', sessionsController)

// routes
app.get('/', (req, res) => {
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
})

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})
