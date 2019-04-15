const express = require('express');
const router = express.Router();

const Account = require('../schemas/Account');
const Customer = require('../schemas/Customer');

router.get('/', (req, res, next) => {
    Account
        .find()
        .exec()
        .then(doc => {
            console.log(doc);
            //if(doc.length >= 0){
                res.status(200).json(doc);
            //}
            //else {
              //  res.status(404).json();
            //}
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
    Account
        //.find({'_id' : id})
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });  //If i dont pass anything it will find all elements
  
  });

// Find all Accounts per customer
  router.get('/Customer/:customerId', (req, res, next) => {
    const id = req.params.customerId;
    Account
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

  //Find all Accounts per Customer and Type
  router.get('/Customer/:customerId/:type', (req, res, next) => {
    const id = req.params.customerId;
    const type = req.params.type;
    Account
        .find({'CustomerID' : id, 'AccountType' : type})
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
                    return res.status(404).json({
                        message: `Customer with id ${req.body.CustomerID} not found`
                    });
                };
                const account = new Account({
                    CustomerID: req.body.CustomerID,
                    CurrentBalance: req.body.CurrentBalance,
                    AccountType: req.body.AccountType,
                    AccountNumber: req.body.AccountNumber
                });
                return account.save();
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Account created',
                    createdRecipient: {
                        _id: result._id,
                        Customer: result.CustomerID,
                        CurrentBalance: result.CurrentBalance,
                        Account: result.AccountNumber,
                        Type: result.AccountType
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

  router.put('/:accountId', (req, res, next)=>{
    if(!req.body.CurrentBalance){
        return res.status(400).send({
            message: 'CurrentBalance cannot be empty'
        });
    }
    const id = req.params.accountId;
    //const updateOps = {};

    console.log(req.body);

    let fields = {
        CurrentBalance: req.body.CurrentBalance
    };
    
    Account.update({_id: id}, fields, {new: true})
              .exec()
              .then(result=>{
                  if(!result){
                      return res.status(404).send({
                          message: `Account not found with id ${id}`
                      })
                  }
                console.log(result);
                res.status(200).json(result);
              })
              .catch(err => {
                  console.log(err);
                  return res.status(500).json({
                      error: err
                  })

              })
  });

  module.exports = router;