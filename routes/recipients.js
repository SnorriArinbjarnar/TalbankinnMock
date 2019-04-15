const express = require('express');

const router = express.Router();
const Recipient = require('../schemas/Recipient');
const Customer = require('../schemas/Customer');

router.get('/', (req, res, next) => {
    Recipient
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

  router.get('/:recipientId', (req, res, next) => {
    CreditCard
        .findById(req.params.recipientId)
        .exec()
        .then(doc => {
            console.log(doc);
            if(!doc){
                return res.status(404).json({
                    message: `Recipient with id ${req.params.recipientId} not found`
                })
            }
            res.status(200).json(doc);
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });  //If i dont pass anything it will find all elements
  
  });

  //get all recipeints per customer
  router.get('/Customers/:customerId', (req, res, next) => {
    const id = req.params.customerId;
    Recipient
        .find({'CustomerID' : id})
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: 'No valid entry found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

  });

  //get recipient per customer and name
  router.get('/Customers/:customerId/:First', (req, res, next) => {
    const id = req.params.customerId;
    const First = req.params.First;
    Recipient
        .find({'CustomerID' : id, 'FirstName' : First})
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: 'No valid entry found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

  });

  router.post('/', (req, res, next)=>{
    Customer.findById(req.body.CustomerID)
            .then(customer =>{
                if(customer == null){
                    console.log('Inside Recipient with CUstomerID = null');
                    return res.status(404).json({
                        message: `Customer with id ${req.body.CustomerID} not found`
                    });
                };
                const recipient = new Recipient({
                    CustomerID: req.body.CustomerID,
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    AccountNumber: req.body.AccountNumber
                });
                return recipient.save();
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Recipient added',
                    createdRecipient: {
                        _id: result._id,
                        Customer: result.CustomerID,
                        FirstName: result.FirstName,
                        LastName: result.LastName,
                        Account: result.AccountNumber
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Customer not found',
                    error: err
                })
            });
  });

  module.exports = router;