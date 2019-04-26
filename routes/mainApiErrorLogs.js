const express = require('express');
const router = express.Router();
const MainApiErrorLog = require('../schemas/MainApiErrorLog')

router.get('/', (req, res, next) => {
    MainApiErrorLog
        .find()
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'No valid entry found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {

    const mainApiErrorLog = new MainApiErrorLog({
        UserId: req.body.UserId,
        Date: req.body.Date,
        Error: req.body.Error,
        ErrorMsg: req.body.ErrorMsg
    });
    return mainApiErrorLog.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Error log added',
                createdMainApiErrorLog: {
                    _id: result._id,
                    UserId: result.UserId,
                    Date: result.Date,
                    Error: result.Error,
                    ErrorMsg: result.ErrorMsg
                }
            })
        })
        .catch(err => {
            console.log("ERROR: ", err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;