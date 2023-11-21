const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruits')


const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}
// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get('/', isAuthenticated, (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.ejs', {
            fruits: allFruits,
            currentUser: req.session.currentUser
        })
    })
})

// NEW
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    })
})

// DELETE
router.delete('/:id', isAuthenticated, (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits')
    })
})

// UPDATE
router.put('/:id', isAuthenticated, (req, res) => {
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
router.post('/', isAuthenticated, (req, res) => {
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
router.get('/:id/edit', isAuthenticated, (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('edit.ejs', {
            fruit: foundFruit,
            currentUser: req.session.currentUser
        })
    })
})

// SHOW
router.get('/:id', isAuthenticated, (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.ejs', {
            fruit: foundFruit,
            currentUser: req.session.currentUser
        })
    })
})

module.exports = router;