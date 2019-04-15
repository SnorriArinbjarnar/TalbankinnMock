const express = require('express');
const router = express.Router();
//require('dotenv').config();
const Customer = require('../schemas/Customer');



/*router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Cusomer router"
    })
  });*/

  router.get('/', (req, res, next) => {
    Customer
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

  module.exports = router;