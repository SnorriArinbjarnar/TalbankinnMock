const express = require('express');
const router = express.Router();
const Customer = require('../schemas/Customer');

router.get('/', (req, res, next) => {
    Customer
        .find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });  //If i dont pass anything it will find all elements

});

router.get('/:_id', (req, res, next) => {
    const id = req.params._id;
    Customer
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: 'No valid entry found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });  //If i dont pass anything it will find all elements

});

module.exports = router;