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
    const { name, calories, protein, carbs, fat } = req.body;
    const meal = new Meal({
        name,
        calories,
        protein,
        carbs,
        fat,
    });

    try {
        const newMeal = await meal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getMeals, addMeal };
