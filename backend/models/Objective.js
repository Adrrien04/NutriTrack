const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        default: 'user1'
    },
    calories: {
        type: Number,
        required: true
    },
    proteines: {
        type: Number,
        required: true
    },
    glucides: {
        type: Number,
        required: true
    },
    lipides: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Objective', objectiveSchema);
