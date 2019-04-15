const express = require('express');

const router = express.Router();
const Bill = require('../schemas/Bill');
const Account = require('../schemas/Account');


router.get('/', (req, res, next) => {
    Bill
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
        });  
  
  });

  router.get('/:billId', (req, res, next) => {
    Bill
        .findById(req.params.billId)
        .exec()
        .then(doc => {
            console.log(doc);
            if(!doc){
                return res.status(404).json({
                    message: 'Bill not found'
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

  //get all bills by customer
  router.get('/Customers/:customerId', (req, res, next) => {
    const id = req.params.customerId;
    Bill
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

  //get all bills by customer and creditor
  router.get('/Customers/:customerId/:creditor', (req, res, next) => {
    const id = req.params.customerId;
    const creditor = req.params.creditor;

    Bill
        .find({'CustomerID' : id, 'Creditor' : creditor})
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

  router.delete('/:billId/:accountId', (req, res, next) =>{
    const billId = req.params.billId;
    const accountId = req.params.accountId;

    var info;

    Account.findById(accountId)
           .exec()
           .then(doc => {
               if(!doc){
                return res.status(404).json({
                    message: `Account with id ${req.params.accountId} not found`
                });
               }

               Bill.findById(billId)
                   .exec()
                   .then(bill => {
                       if(!bill){
                        return res.status(404).json({
                            message: `Bill with id ${billId} not found`
                        });
                       }
                       if(doc.CurrentBalance < bill.Amount){
                            res.status(200).json({
                                message: 'Not sufficient funds'
                            });
                       }
                       else {
                           const balance = doc.CurrentBalance - bill.Amount;

                           let fields = {
                            CurrentBalance: balance
                        };
                        Account.update({_id: doc._id}, fields, {new: true})
                               .exec()
                               .then(result =>{

                               })
                               .catch(err => {
                                   error: err;
                                   console.log(err);
                               })

                        Bill.remove({
                            _id: bill._id
                        })
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                message: 'Bill payed'
                            })
                        })
                        .catch(err => {
                            error: err,
                            console.log(err);
                        })


                       }
                   })
                   .catch(err => {
                       console.log(err);
                       res.status(500).json({error: err});

                   })
 
                   
                })
               
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({error: err});
                })
           })
          

  module.exports = router;