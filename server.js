const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const fruitsController = require('./controllers/fruits');
require('dotenv').config()
const mongoUrl = process.env.MONGOURI
const PORT = process.env.PORT

// DATABASE CONNECTION
mongoose.connect(mongoUrl + '/fruits')
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

// MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use('/fruits', fruitsController);

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})
