const express = require('express');
const router = express.Router();
const LuisLowConfidencyLog = require('../schemas/LuisLowConfidencyLog');

router.get('/', (req, res, next) => {
    LuisLowConfidencyLog
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

    const luisLowConfidencyLog = new LuisLowConfidencyLog({
        UserId: req.body.UserId,
        UserState: req.body.UserState,
        Date: req.body.Date,
        LuisData: req.body.LuisData,
    });
    return luisLowConfidencyLog.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Luis low confidency Log added',
                createdLuisLowConfidencyLog: {
                    _id: result._id,
                    UserId: result.UserId,
                    UserState: result.UserState,
                    Date: result.Date,
                    LuisData: result.LuisData,
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;