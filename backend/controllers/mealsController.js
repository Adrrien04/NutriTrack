const Meal = require('../models/Meal');

const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addMeal = async (req, res) => {
    const { nom, calories, proteines, glucides, lipides } = req.body;
    const meal = new Meal({
        nom,
        calories,
        proteines,
        glucides,
        lipides,
    });

    try {
        const newMeal = await meal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getMeals, addMeal };
