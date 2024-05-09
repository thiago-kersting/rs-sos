const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    urgent: {
        required: true,
        type: Boolean
    },
    need: Boolean
});

module.exports = itemSchema;