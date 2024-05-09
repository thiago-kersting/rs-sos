const mongoose = require('mongoose');
const itemSchema = require('./item');

const locationSchema = new mongoose.Schema({
    localName: {
        required: true,
        type: String
    },
    items: [itemSchema]
});

module.exports = locationSchema;