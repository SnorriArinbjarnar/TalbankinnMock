const mongoose = require("mongoose");
const express = require('express');

require('dotenv').config();
const connString = process.env.DB_CONN || APPSETTING_DB_CONN;
const connection = mongoose.connect(connString, {

  useNewUrlParser: true
});

module.exports = connection;