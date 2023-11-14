const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')

// DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/basiccrud')
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

// MIDDLEWARE
app.use(express.urlencoded({extended:true}))

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        })
    })
})

// NEW
app.get('/fruits/new', (req, res) => {
    res.render('new.ejs')
})

// DELETE


// UPDATE


// CREATE
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    Fruit.create(req.body, (error, createdFruit) => {
        if(error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/fruits')
        }
    })
})

// EDIT


// SHOW
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruit: foundFruit
        })
    })
})

app.listen(3000, ()=> {
    console.log(`listening on port 3000`)
})
