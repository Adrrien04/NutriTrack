const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
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
    },
    user: {
        type: String,
        required: true,
        default: 'user1'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meal', mealSchema);
