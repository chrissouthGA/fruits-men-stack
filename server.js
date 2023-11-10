const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')

mongoose.connect('mongodb://127.0.0.1:27017/basiccrud')
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

app.use(express.urlencoded({extended:true}))

app.get('/fruits/new', (req, res) => {
    res.render('new.ejs')
})

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
            res.send(createdFruit)
        }
    })
})

app.listen(3000, ()=> {
    console.log(`listening on port 3000`)
})