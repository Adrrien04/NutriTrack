const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    proteines: {
        type: Number,
        required: true,
    },
    glucides: {
        type: Number,
        required: true,
    },
    lipides: {
        type: Number,
        required: true,
    },

});

module.exports = mongoose.model('Meal', MealSchema);
