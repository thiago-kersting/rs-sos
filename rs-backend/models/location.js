const mongoose = require('mongoose');
const itemSchema = require('./item');

const locationSchema = new mongoose.Schema({
    localName: {
        required: true,
        type: String
    },
    localAdress: {
        required: true,
        type: String,
    },
    needVolunteers: Boolean,
    type: {
        type: String,
        enum: ['human', 'pet', 'petfriendly'],
        required: true
    },
    items: [itemSchema]
}, { timestamps: true });

module.exports = locationSchema;