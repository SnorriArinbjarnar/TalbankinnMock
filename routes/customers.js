const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Cusomer router"
    })
  });

  module.exports = router;