'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const food = new Schema({
    category: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    },
    restaurant: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    },
    size: Array,
    name: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    },
    price: {
        type: Number,
        required: [true, "can't be blank"],
    },
    release_date: {
        type: Date,
        $dateToString: { format: "%Y-%m-%d", date: "$date" },
        default: new Date()
    },
    img: {
        type: String,
        required: [true, "can't be blank"],
    },
    describe: {
        type: String,
        default: "",
    },
    chef: {
        type: String,
        default: "",
    },
    id_category: {
        type: String,
        required: [true, "can't be blank"],
    },
    id_restaurant: {
        type: String,
        required: [true, "can't be blank"],
    },
    view_counts: {
        type:Number,
        default: 0, 
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },
    amount:{
        type:Number,
        default: 0, 
    },
    sales: {
        type: Number,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }
});
module.exports = mongoose.model('food', food);