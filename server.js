// required dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override');
// controller variables
const fruitsController = require('./controllers/fruits');
// env variables
const mongoUrl = process.env.MONGOURI
const PORT = process.env.PORT

// DATABASE CONNECTION
mongoose.connect(mongoUrl + '/fruits')
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

// MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

// controller middleware
app.use('/fruits', fruitsController);

// routes
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})
