const mongoose = require("mongoose");
const express = require('express');

require('dotenv').config();

// const connection = mongoose.connect(process.env.DB_CONN || APPSETTING_DB_CONN, {

//   useNewUrlParser: true
// });

const connection = mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true
});

module.exports = connection;