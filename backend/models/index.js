"use strict"
const dbConfig = require('../config/db.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {
  mongoose : mongoose,
  url : dbConfig.url,
  Favorite :require("./favorite")(mongoose),
  Rating :require("./rating")(mongoose),
}

module.exports = db