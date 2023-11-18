const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruits')

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get('/', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits
        })
    })
})

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// DELETE
router.delete('/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits')
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFruit) => {
        res.redirect('/fruits')
    })
})

// CREATE
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('edit.ejs', {fruit: foundFruit})
    })
})

// SHOW
router.get('/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruit: foundFruit
        })
    })
})

module.exports = router;