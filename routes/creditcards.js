const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const CreditCard = require('../schemas/CreditCard');
const Customer = require('../schemas/Customer');

router.get('/', (req, res, next) => {
    CreditCard
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

  router.get('/:cardId', (req, res, next) => {
    CreditCard
        .findById(req.params.cardId)
        .exec()
        .then(doc => {
            console.log(doc);
            if(!doc){
                return res.status(404).json({
                    message: 'Creditcard not found'
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

  //get all cards by customer
  router.get('/Customers/:customerId', (req, res, next) => {
    const id = req.params.customerId;
    CreditCard
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

  //get all cards by customer and type
  router.get('/Customers/:customerId/:type', (req, res, next) => {
    const id = req.params.customerId;
    const cardType = req.params.type;
    CreditCard
        .find({'CustomerID' : id, 'CardType' : cardType})
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

  router.put('/:cardId', (req, res, next)=>{
    if(!req.body.CurrentBalance){
        return res.status(400).send({
            message: 'CurrentBalance cannot be empty'
        });
    }
    const id = req.params.cardId;
    //const updateOps = {};

    console.log(req.body);

    let fields = {
        CurrentBalance: req.body.CurrentBalance
    };
    

    CreditCard.update({_id: id}, fields, {new: true})
              .exec()
              .then(result=>{
                  if(!result){
                      return res.status(404).send({
                          message: `Order not found with id ${id}`
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