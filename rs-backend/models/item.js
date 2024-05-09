const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    need: Boolean
});

module.exports = itemSchema;