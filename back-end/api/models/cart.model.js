"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart = new Schema({
  id_user: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("cart", cart);
